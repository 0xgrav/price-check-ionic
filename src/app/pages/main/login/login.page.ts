import { Component, ElementRef, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { DataService } from "../../../services/data/data.service";
import { LoadingController, AlertController, IonInput } from "@ionic/angular";
import { Employee } from 'src/app/models/Employee';
import { rejects } from 'assert';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { setEmployee } from 'src/app/store/employee/actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  content_loaded: boolean = false;
  userid: string = '';
  xmlResponse: string;
  message: string;
  headers: any;
  employee: any;
  @ViewChild('IDInput', { read: IonInput}) IDInput: IonInput;

  constructor(
    private router: Router,
    private dataService: DataService,
    private store: Store<{ employee: Employee }>,
    private loadingController: LoadingController,
    private alertController: AlertController,) {
  }

  async handleButtonClick(event: any) {
    const text = event.target.innerText;
    if (/^[.,0-9]+$/.test(text)) {
      this.userid += text;
    } else {
      switch (text) {
        case 'CLEAR': {
          this.userid = '';
          break;
        }
        case 'ENTER': {
          if (this.userid === '') {
            const alert = await this.alertController.create({
              header: "Erorr",
              message: "Please enter your user ID",
              buttons: ['OK'],
            });
            await alert.present();
          } else {
            this.dataService.clientState().subscribe(async (ready) => {
              if (ready) {
                await this.getEmployee(this.userid);
                if (this.employee.Name === '') {
                  const alert = await this.alertController.create({
                    header: "Erorr",
                    message: "This is not valid ID, please check and Enter your User ID",
                    buttons: ['OK'],
                  });
                  await alert.present();
                } else {
                  this.store.dispatch(setEmployee({ UserID: this.employee.UserID, Name: this.employee.Name }));
                  this.router.navigate(['/dashboard']);
                  // this.router.navigate(['/dashboard'], {
                  //   queryParams: {
                  //     userId: this.userid,
                  //   },
                  // });
                }

              }
            }, error => {
              return error;
            });
          }

          break;
        }
        default:
          this.userid = this.userid.slice(0, -1);
      }
    }
  }

  async getEmployee(userID: string) {
    const loading = await this.loadingController.create({
      message: 'Loading employee information...'
    });
    loading.present();
    return new Promise((resolve, reject) => {
      this.dataService.getEmployee(userID).subscribe(data => {
        this.employee = data;
        loading.dismiss();
        resolve(true);
      }, (error) => {
        loading.dismiss();
        reject(error);
      });

    });
  }

  ngOnInit() {

    // Fake timeout
    setTimeout(() => {
      this.content_loaded = true;
      this.router.events.subscribe(event => {
        if (event instanceof NavigationStart) {
          this.userid = '';
          this.IDInput.setFocus();
        }
      })

    }, 2000);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.employee) {
    }
  }

}
