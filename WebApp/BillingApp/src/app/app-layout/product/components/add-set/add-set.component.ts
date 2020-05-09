import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from '../../services';
import { NgxSpinnerService } from 'ngx-spinner'
import { Set } from '../../models/Set';

@Component({
  selector: 'app-add-set',
  templateUrl: './add-set.component.html',
  styleUrls: ['./add-set.component.css']
})
export class AddSetComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private activeModal: NgbActiveModal,
    private productService: ProductService,
    private spinner: NgxSpinnerService) { }

    ngOnInit() {
      this.initForm();
      if (this.id != 0) {
        this.productService.getSet(this.id).subscribe(res => {
          this.patchForm(res);
        });
      }
    }

  @Input()
  id: number = 0;

  @Input()
  title: string;

  setForm: FormGroup=null;
  submitted: boolean = false;

  initForm() {
    this.setForm = this.fb.group({
      name: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    });
  }

  patchForm(obj: Set) {
    this.setForm.patchValue({
      name: obj.name,
      quantity: obj.quantity
    });
  }
  
  onSubmit() {
    this.submitted = true;
    if (this.setForm.invalid) {
      return;
    }
    this.spinner.show();

    var obj = this.setForm.value;
    obj.quantity = Number(obj.quantity);
    if (this.id > 0)
      obj.id = Number(this.id);

    this.productService.addSet(obj).subscribe(res => {
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
