import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: 'connexion', pathMatch: 'full'},
  {
    path: 'acceuil',
    loadChildren: () => import('./acceuil/acceuil.module').then(m => m.AcceuilPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./acceuil/connexion/connexion.module').then(m => m.ConnexionPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
