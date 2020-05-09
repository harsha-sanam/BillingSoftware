import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingModule } from './billing/billing.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { AppLayoutComponent } from './app-layout.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: 'Home',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then(
            m => m.DashboardModule
          )
      },
      {
        path: 'Bill',
        loadChildren: () =>
          import(
            './billing/billing.module'
          ).then(m => m.BillingModule)
      },
      {
        path: 'Products',
        loadChildren: () =>
          import(
            './product/product.module'
          ).then(m => m.ProductModule)
      },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
