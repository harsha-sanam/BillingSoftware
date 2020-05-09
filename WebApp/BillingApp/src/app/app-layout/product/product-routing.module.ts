import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { SetComponent } from './components/set/set.component';

const routes: Routes = [
  {
    path: 'View',
    component: ViewProductsComponent
  },
  {
    path: 'Set',
    component: SetComponent
  },
  { path: '**', redirectTo: 'View' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
