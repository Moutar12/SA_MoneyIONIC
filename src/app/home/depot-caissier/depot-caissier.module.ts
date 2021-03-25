import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotCaissierPageRoutingModule } from './depot-caissier-routing.module';

import { DepotCaissierPage } from './depot-caissier.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        DepotCaissierPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [DepotCaissierPage]
})
export class DepotCaissierPageModule {}
