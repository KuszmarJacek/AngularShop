import {Component, computed, Input, Signal} from "@angular/core";
import { Model } from "../model/repository.model";
import { Product } from "../model/product.model";
import { environment} from "../../environments/environment";

@Component({
  selector: "paTable",
  templateUrl: "table.component.html"
})
export class TableComponent {
  public environment = environment;
  @Input() category?: string;

  constructor(private model: Model) {}


  getProduct(key: number): Product | undefined {
    return this.model.getProduct(key);
  }

  get Products(): Signal<Product[]> {
    // return this.model.Products;
    return computed(() => {
      return this.model.Products()
        .filter(p => {
          return this.category == null || p.category == this.category;
        });
    })
  }

  get Categories(): Signal<string[]> {
    return computed(() => {
      return this.model.Products()
        .map(p => p.category)
        .filter((c, index, arr) => c != undefined
          && arr.indexOf(c) == index) as string[];
    });
  }

  deleteProduct(key?: number) {
    if (key != undefined) {
      this.model.deleteProduct(key);
    }
  }
}
