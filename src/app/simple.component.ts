import {Component} from "@angular/core";
import {Product} from "./model/product.model";
import {Model} from "./model/repository.model";

@Component({
  selector: "simple",
  template: `<div class="bg-primary text-white p-1">
    There are
    <span class="strong"> {{getProducts().length}} </span>
    products
  </div>`
})
export class SimpleComponent {
  category: string = "Soccer";

  constructor(private repository: Model) {}

  getProducts(): Product[] {
    return this.repository.Products()
      .filter(p => p.category == this.category);
  }
}
