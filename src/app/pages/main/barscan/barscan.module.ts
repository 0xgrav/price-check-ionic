import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarscanPageRoutingModule } from './barscan-routing.module';

import { BarscanPage } from './barscan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarscanPageRoutingModule
  ],
  declarations: [BarscanPage]
})
export class BarscanPageModule {}
