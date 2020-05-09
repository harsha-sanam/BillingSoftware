import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewProductsComponent } from './components/view-products/view-products.component';
import { ProductRoutingModule } from './product-routing.module';
import { NgbPaginationModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from './services';
import { AddProductComponent } from './components/add-product/add-product.component';
import { SetComponent } from './components/set/set.component';
import { AddSetComponent } from './components/add-set/add-set.component';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [ViewProductsComponent, AddProductComponent,SetComponent, AddSetComponent],
  imports: [
    CommonModule,ProductRoutingModule, NgbPaginationModule, FormsModule, NgbModalModule, ReactiveFormsModule, NgSelectModule
  ],
  providers:[ProductService],
  entryComponents:[AddProductComponent, AddSetComponent]
})

export class ProductModule { }
