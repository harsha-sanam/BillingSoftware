import { Component, OnInit } from '@angular/core';
import { Set } from '../../models/Set';
import { ProductService } from '../../services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerService } from 'ngx-spinner';
import { AddSetComponent } from '../add-set/add-set.component';

@Component({
  selector: 'app-set',
  templateUrl: './set.component.html',
  styleUrls: ['./set.component.css']
})
export class SetComponent implements OnInit {

  sets :Set[]=[];
  allSets :Set[]=[];

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
    this.procuctService.getSets().subscribe(res=>{
      this.allSets = res;
      this.getPageProducts();
      this.spinner.hide();
    });
  }

  getPageProducts(){
    this.sets = this.allSets.slice(
      (this.page - 1) * this.pageSize,
      (this.page - 1) * this.pageSize + this.pageSize,
    );
  }

  addSet(){
    const modalRef = this.modalService.open(AddSetComponent, { size: 'lg' });
    modalRef.componentInstance.title = "Add Set";
        modalRef.result.then(res => {
         if(res){
          this.initAPICalls();
         }
        });
  }
  editSet(id:number){
    const modalRef = this.modalService.open(AddSetComponent, { size: 'lg' });
    modalRef.componentInstance.title = "Edit Set";
    modalRef.componentInstance.id = id;

    modalRef.result.then(res => {
     if(res){
      this.initAPICalls();
     }
    });
  }



}
