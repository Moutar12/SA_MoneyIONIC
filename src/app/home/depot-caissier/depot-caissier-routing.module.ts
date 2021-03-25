import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepotCaissierPage } from './depot-caissier.page';

const routes: Routes = [
  {
    path: '',
    component: DepotCaissierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotCaissierPageRoutingModule {}
