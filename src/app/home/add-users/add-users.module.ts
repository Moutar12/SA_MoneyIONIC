import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddUsersPageRoutingModule } from './add-users-routing.module';

import { AddUsersPage } from './add-users.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        AddUsersPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [AddUsersPage]
})
export class AddUsersPageModule {}
