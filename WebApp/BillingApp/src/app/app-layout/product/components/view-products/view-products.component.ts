import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../add-product/add-product.component';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  products :Product[]=[];
  allProducts :Product[]=[];

  constructor(private procuctService: ProductService,
    private modalService: NgbModal,
    private spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.initAPICalls();
  }


  page = 1;
  pageSize = 5;
  pageSizes = [5, 10,15];

  initAPICalls(){
    this.spinner.show();
    this.procuctService.getProducts().subscribe(res=>{
      this.allProducts = res;
      this.getPageProducts();
      this.spinner.hide();
    });
  }

  getPageProducts(){
    this.products = this.allProducts.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  addProduct(){
    const modalRef = this.modalService.open(AddProductComponent, { size: 'lg' });
    modalRef.componentInstance.title = "Add New Product";
        modalRef.result.then(res => {
         if(res){
          this.initAPICalls();
         }
        });
  }
  editProduct(id:number){
    const modalRef = this.modalService.open(AddProductComponent, { size: 'lg' });
    modalRef.componentInstance.title = "Edit Product";
    modalRef.componentInstance.id = id;

    modalRef.result.then(res => {
     if(res){
      this.initAPICalls();
     }
    });
  }



}
