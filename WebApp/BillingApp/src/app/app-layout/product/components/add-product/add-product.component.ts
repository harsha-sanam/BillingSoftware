import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services';
import { NgxSpinnerService } from 'ngx-spinner';
import { Product, Set } from '../../models';
import { forkJoin } from 'rxjs';

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
    this.initApiCalls();
  }


  initApiCalls() {
    var requests: any[] = [];
    requests.push(this.productService.getSets());
    if (this.id > 0) {
      requests.push(this.productService.getProduct(this.id));
    }
    this.spinner.show();
    forkJoin(requests).subscribe(res => {
      this.sets = res[0];
      if (this.id > 0) {
        this.patchForm(res[1]);
      }
      this.spinner.hide();
    });
  }


  @Input()
  id: number = 0;

  @Input()
  title: string;

  productForm: FormGroup = null;
  submitted: boolean = false;
  sets: Set[] = [];

  initForm() {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      itemCode: ['', Validators.required],
      hsn: ['', Validators.required],
      tax: ['', [Validators.required, , Validators.pattern('^[0-9]*$'), Validators.max(100)]],
      packages: ['', Validators.required],

    });
  }

  patchForm(obj: Product) {
    this.productForm.patchValue({
      name: obj.name,
      itemCode: obj.itemCode,
      hsn: obj.hsn,
      tax: obj.tax,
      packages: obj.productSets.map(a => a.setId)
    });
  }


  getDDLValues() {
    this.spinner.show();
    this.productService.getSets().subscribe((res) => {
      this.sets = res;
      this.spinner.hide();
    });
  }

  get name() { return this.productForm.get('name'); }
  get itemCode() { return this.productForm.get('itemCode'); }
  get hsn() { return this.productForm.get('hsn'); }
  get tax() { return this.productForm.get('tax'); }
  get packages() { return this.productForm.get('packages'); }

  onSubmit() {
    this.submitted = true;
    if (this.productForm.invalid) {
      return;
    }
    this.spinner.show();

    var obj = this.productForm.value;
    obj.tax = Number(obj.tax);
    obj.productSets = obj.packages.map(a => { return { productId: this.id, setId: a } })
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
