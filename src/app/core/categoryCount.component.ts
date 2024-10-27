import {Component, computed, Signal} from "@angular/core";
import {Model} from "../model/repository.model";

@Component({
  selector: "paCount",
  template: `<div class="bg-info text-white p-2">
    There are {{ count() }} categories
  </div>`
})
export class CategoryCountComponent {
  count: Signal<number>;

  constructor(private model: Model) {
    this.count = computed(() => {
      return this.model.Products()
        .map(p => p.category)
        // only unique categories
        .filter((category, index, array) => {
          return array.indexOf(category) == index;
        })
        .length;
    });
  }
}
