import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState } from './sharedState.service';
import { MessageService } from '../messages/message.service';
import { toObservable } from "@angular/core/rxjs-interop";
import { Message } from '../messages/message.model';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  product: Product = new Product();
  editing: boolean = false;
  productForm: FormGroup = new FormGroup({
    name: new FormControl("", { 
      validators: [Validators.required, Validators.minLength(3), Validators.pattern("^[A-Za-z ]+$")],
      updateOn: "change"
    }),
    category: new FormControl("", { validators: [Validators.required]}),
    price: new FormControl("", { validators: [Validators.required, Validators.pattern("^[0-9\.]+$")]})
  });

  constructor(
    private model: Model,
    private stateService: SharedState,
    messageService: MessageService
  ) {
    toObservable(stateService.state).subscribe(state => {
      this.editing = state.mode == MODES.EDIT;
      if (this.editing && state.id) {
        this.product = Product.fromProduct(this.model.getProduct(state.id) ?? new Product());
      } else {
        this.product = new Product;
      }
      this.productForm.reset(this.product);
      messageService.reportMessage(state.id ? new Message(`Editing ${this.product.name}`) : new Message("Creating New Product"));
    });

  }

  submitForm() {
    if (this.productForm.valid) {
      Object.assign(this.product, this.productForm.value);
      this.model.saveProduct(this.product);
      this.product = new Product();
      this.productForm.reset();
    }
  }

  resetForm() {
    this.editing = true;
    this.product = new Product();
    this.productForm.reset();
  }
}
