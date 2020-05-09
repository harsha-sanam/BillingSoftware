import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product,Set } from '../../models';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.initForm();
    this.getDDLValues();
    if (this.id != 0) {
      this.productService.getProduct(this.id).subscribe(res => {
        this.patchForm(res);
      });
    }
  }

  @Input()
  id: number = 0;

  @Input()
  title: string;

  productForm: FormGroup = null;
  submitted: boolean = false;
  sets:Set[]=[];

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      itemCode: ['', Validators.required],
      hsn: ['', Validators.required],
      tax: ['', [Validators.required, , Validators.pattern('^[0-9]*$'), Validators.max(100)]]
    });
  }

  patchForm(obj: Product) {
    this.productForm.patchValue({
      name: obj.name,
      itemCode: obj.itemCode,
      hsn: obj.hsn,
      tax: obj.tax
    });
  }

  getDDLValues(){
    this.productService.getSets().subscribe((res)=>{
      this.sets=res;
    });
    
  }

  get(formControlName: string) {
    return this.productForm.get(formControlName).value;
  }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.spinner.show();

    var obj = this.productForm.value;
    obj.tax = Number(obj.tax);
    if (this.id > 0)
      obj.id = Number(this.id);

    this.productService.addProduct(obj).subscribe(res => {
      this.spinner.hide();
      this.closeModal(true);
    }, () => {
      this.spinner.hide();
      this.closeModal();
    });
  }

  closeModal(res?: boolean) {
    this.activeModal.close(res);
  }


}
