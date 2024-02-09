import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// import { AuthGuard } from './guards/auth.guard';
// import { PublicGuard } from './guards/public.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome', // TODO: Set this to ''
    pathMatch: 'full'
  },
  {
    path: '',
    loadChildren: () => import('./pages/main/dashboard/dashboard.module').then(m => m.DashboardPageModule),
    // canActivate: [AuthGuard] // Secure all child pages
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/main/dashboard/dashboard.module').then(m => m.DashboardPageModule),
  },

  {
    path: 'barscan',
    loadChildren: () => import('./pages/main/barscan/barscan.module').then( m => m.BarscanPageModule)
  },

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
