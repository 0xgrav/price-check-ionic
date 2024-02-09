import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'login',
        loadChildren: () => import('../pages/main/login/login.module').then(m => m.LoginPageModule)
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },

      {
        path: 'dashboard',
        loadChildren: () => import('../pages/main/dashboard/dashboard.module').then(m => m.DashboardPageModule)
      },
     
      {
        path: 'logout',
        redirectTo: 'login',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
