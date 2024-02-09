import {
  Component,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';
import { HelperService } from 'src/app/services/helper/helper.service';
import { Store } from '@ngrx/store';
import { Employee } from 'src/app/models/Employee';
import { Router } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';

@Component({
  selector: 'app-barscan',
  templateUrl: './barscan.page.html',
  styleUrls: ['./barscan.page.scss'],
})
export class BarscanPage implements OnInit {
  isSupported = false;
  barcode: Barcode;

  constructor(
    private alertController: AlertController,
    private modalController: ModalController,
    private navController: NavController,
    private router: Router
  ) {}

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  public async startScan(): Promise<void> {
    const formats = [];
    const lensFacing = LensFacing.Back;
    const element = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    await element.present();
    element.onDidDismiss().then(async (result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        const barcodeValue = barcode.displayValue || '';

        this.router.navigate(['/dashboard'], {
          queryParams: { artcode: barcodeValue },
        });

      }
    });
  }
}
