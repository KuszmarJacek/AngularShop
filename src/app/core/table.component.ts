import { Component, Signal } from "@angular/core";
import { MODES, SharedState } from "./sharedState.service";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";

@Component({
  selector: "paTable",
  templateUrl: "table.component.html"
})
export class TableComponent {
  constructor(private model: Model, private state: SharedState) {}

  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  get Products(): Signal<Product[]> {
    return this.model.Products;
  }

  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }

  editProduct(key?: number) {
    this.state.update(MODES.EDIT, key);
  }

  createProduct() {
    this.state.update(MODES.CREATE);
  }
}