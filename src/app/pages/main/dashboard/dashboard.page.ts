import {
  ChangeDetectorRef,
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { DataService } from '../../../services/data/data.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Observable, Subscription, max } from 'rxjs';
import { Employee } from 'src/app/models/Employee';
import { Product, initializeProduct } from 'src/app/models/Product';
import { Store } from '@ngrx/store';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { setProduct } from 'src/app/store/production/actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {
  content_loaded: boolean = false;
  employee$: Observable<Employee>;
  product: Product;
  products: Product[];
  subscription: Subscription;
  productSub: Subscription;
  artcode: string;
  label: string;
  description: string;
  price: string;
  newprice: string;
  quantity: string;
  rows: any[];
  informationEmployee: any;
  index: number;
  selectedIndexes: number[];

  constructor(
    private router: Router,
    private activatedRouter: ActivatedRoute,
    private dataService: DataService,
    private store: Store<{ employee: Employee; product: Product }>,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private changeDetector: ChangeDetectorRef,
    private navController: NavController
  ) {
    this.employee$ = store.select('employee');
    this.products = [];
    this.rows = [];
    this.index = 0;
    this.selectedIndexes = [];
    this.intializateProduct();
    // this.product$ = store.select('product');
  }

  intializateProduct() {
    this.artcode = '';
    this.activatedRouter.queryParams.subscribe((params) => {
      const receivedParams = params?.artcode;
      if (receivedParams === '' || !receivedParams) {
        this.artcode = '';
      } else {
        this.artcode = receivedParams;
      }
    });
    // this.activatedRouter.paramMap.subscribe(params => {
    //   const receivedParam = params.get('artcode');
    //   console.log('receive', receivedParam);
    //   if (receivedParam === "" || receivedParam === undefined) {
    //     this.artcode = "";
    //   } else {
    //     this.artcode = receivedParam;
    //   }
    // });
    this.label = '';
    this.description = '';
    this.price = '';
    this.newprice = '';
    this.quantity = '';
    this.product = initializeProduct();
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.intializateProduct();
      }
    });
    setTimeout(() => {
      this.content_loaded = true;
      this.subscription = this.employee$.subscribe((employee) => {});
    }, 2000);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.productSub.unsubscribe();
  }

  handleScanClick(event) {
    this.navController.navigateForward('/barscan');
  }

  async handleSearchClick(event) {
    if (this.artcode === '') {
      const alert = await this.alertController.create({
        header: 'Erorr',
        message: 'Please enter your code',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.dataService.clientState().subscribe(
        async (ready) => {
          if (ready) {
            await this.getProduct(this.artcode);
            if (!this.product.ART_CODE || this.product.ART_CODE === '') {
              const alert = await this.alertController.create({
                header: 'Erorr',
                message:
                  'This is not valid ID, please check and Enter your User ID',
                buttons: ['OK'],
              });
              await alert.present();
              return;
            } else {
              this.artcode = this.product.ART_CODE;
              this.price = this.product.prijs;
              this.newprice = this.product.NewPrijs;
              this.description = this.product.details;
              this.label = this.product.LABEL;
            }
            // this.productSub = this.product$.subscribe(async (product) => {

            // })
            // if (this.employee.Name === '') {

            // } else {

            // }
          }
        },
        (error) => {
          return error;
        }
      );
    }
  }

  async handleAddClick(event) {
    if (this.product.ART_CODE === '') {
      const alert = await this.alertController.create({
        header: 'Erorr',
        message: 'Please fill up product equipment information',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      this.products.push(this.product);
      console.log(this.product);
      const artcode = this.product.ART_CODE;
      let quantity;
      if (!parseFloat(this.quantity)) {
        quantity = 1;
      } else {
        quantity = parseFloat(this.quantity);
      }
      const price = parseFloat(this.product.prijs);
      const newprice = parseFloat(this.product.NewPrijs);
      const rate = !newprice || newprice == 0 ? price : newprice;
      const total = rate * quantity;
      this.rows.push({
        // id: this.index++,
        article: artcode.toString(),
        quantity: quantity.toString(),
        rate: rate.toString(),
        total: total.toString(),
        class: 'data-row',
      });
      this.intializateProduct();
    }
  }

  handleRowClick(id) {
    console.log(id);
    let pos = this.selectedIndexes.indexOf(id);
    if (pos !== -1) {
      this.selectedIndexes.splice(pos, 1);
      // console.log(pos);
      this.rows[id].class = 'data-row';
    } else {
      this.selectedIndexes.push(id);
      this.rows[id].class = 'data-row selected';
    }
    // console.log(this.selectedIndexes);
  }

  async getProduct(ART_CODE: string) {
    const loading = await this.loadingController.create({
      message: 'Loading product information...',
    });
    loading.present();
    return new Promise((resolve, reject) => {
      this.dataService.getProduct(ART_CODE).subscribe(
        (data) => {
          this.product = data;
          loading.dismiss();
          resolve(true);
        },
        (error) => {
          loading.dismiss();
          reject(error);
        }
      );
    });
  }

  handleDeleteClick(event) {
    const sortedIndexes = this.selectedIndexes.sort((a, b) => b - a);

    sortedIndexes.forEach((index) => {
      this.rows.splice(index, 1);
    });

    console.log(this.rows);

    this.selectedIndexes = [];
  }
}
