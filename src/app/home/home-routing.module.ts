import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePage } from './home.page';

// @ts-ignore
const routes: Routes = [
  {
    path: '',
    component: HomePage
  },
  {
    path: 'depot',
    loadChildren: () => import('./depot/depot.module').then( m => m.DepotPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'calculator',
    loadChildren: () => import('./calculator/calculator.module').then( m => m.CalculatorPageModule)
  },
  {
    path: 'depot-caissier',
    loadChildren: () => import('./depot-caissier/depot-caissier.module').then( m => m.DepotCaissierPageModule)
  },
  {
    path: 'add-users',
    loadChildren: () => import('./add-users/add-users.module').then( m => m.AddUsersPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
