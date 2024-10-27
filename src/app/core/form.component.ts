import {Component, Input, signal} from '@angular/core';
import { Product } from '../model/product.model';
import { Model } from '../model/repository.model';
import { MODES, SharedState } from './sharedState.service';
import { MessageService } from '../messages/message.service';
import { toObservable } from '@angular/core/rxjs-interop';
import { Message } from '../messages/message.model';
import {
  FormArray,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { FilteredFormArray } from './filteredFormArray';
import { LimitValidator } from '../validation/limit';
import { UniqueValidator } from '../validation/unique';
import { ProhibitedValidator } from '../validation/prohibited';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'paForm',
  templateUrl: 'form.component.html',
  styleUrls: ['form.component.css'],
})
export class FormComponent {
  // Relies on setting the bindToComponentInputs property in the app.routing.ts file
  @Input() mode?: string;
  @Input() id?: string;
  nextId = signal(0);
  previousId = signal(0);
  // optional url parameters
  // @Input() optionalName?: string;
  // @Input() optionalCategory?: string;
  // @Input() optionalPrice?: string;

  product: Product = new Product();
  editing: boolean = false;
  keywordGroup = new FilteredFormArray([this.createKeywordFormControl()], {
    validators: UniqueValidator.unique(),
  });
  productForm: FormGroup = new FormGroup({
    name: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('^[A-Za-z ]+$'),
      ],
      updateOn: 'change',
    }),
    category: new FormControl('', {
      validators: [Validators.required],
      asyncValidators: [ProhibitedValidator.prohibited()],
    }),
    price: new FormControl('', {
      validators: [
        Validators.required,
        Validators.pattern('^[0-9.]+$'),
        LimitValidator.Limit(500),
      ],
    }),
    keywords: this.keywordGroup,
  });

  constructor(
    private model: Model,
    private router: Router
  ) {}

  ngOnChanges() {
    this.editing = this.mode == "edit";
    if (this.id != null) {
      let idVal = parseInt(this.id);
      Object.assign(this.product,
        this.model.getProduct(idVal) || new Product());
      // this.product.name = this.optionalName ?? this.product.name;
      // this.product.category = this.optionalCategory
      //     ?? this.product.category;
      // if (this.optionalPrice != undefined) {
      //     this.product.price = Number.parseFloat(this.optionalPrice);
      // }
      this.productForm.patchValue(this.product);
      this.nextId.set(this.model.getNextProductId(idVal));
      this.previousId.set(this.model.getPreviousProductId(idVal));
    }
  }

  addKeywordControl() {
    this.keywordGroup.push(this.createKeywordFormControl());
  }

  removeKeywordControl(index: number) {
    this.keywordGroup.removeAt(index);
  }

  submitForm() {
    this.router.navigateByUrl("/");
    // if (this.productForm.valid) {
    //   Object.assign(this.product, this.productForm.value);
    //   this.model.saveProduct(this.product);
    //   this.product = new Product();
    //   this.productForm.reset();
    // }
  }

  resetForm() {
    this.editing = true;
    this.product = new Product();
    this.productForm.reset();
  }

  createKeywordFormControls(count: number = 0) {
    this.keywordGroup.clear();
    for (let i = 0; i < count + 1; i++) {
      this.keywordGroup.push(this.createKeywordFormControl());
    }
  }

  createKeywordFormControl() {
    return new FormControl('', {
      validators: [Validators.pattern('^[A-Za-z ]+$')],
    });
  }
}
