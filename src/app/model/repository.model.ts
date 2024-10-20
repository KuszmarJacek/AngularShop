import { Injectable, Signal, signal } from '@angular/core';
import { Product } from './product.model';
import { StaticDataSource } from './static.datasource';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class Model {
  private products = signal<Product[]>([]);

  constructor(private dataSource: StaticDataSource) {
    this.products.set(this.dataSource.getData());
  }

  get Products(): Signal<Product[]> {
    return this.products.asReadonly();
  }

  getProduct(id: number): Product | undefined {
    return this.products().find((p) => p.id == id);
  }

  saveProduct(product: Product) {
    // check if there is a product in array
    if (product.id == 0 || product.id == undefined) {
      product.id = this.generateId();
      this.products.mutate(prods => prods.push(product));
    // else replace the existing product with a new one
    } else {
      this.products.mutate(prods => {
        let idx = prods.findIndex(p => p.id == product.id);
        prods.splice(idx, 1, product);
      });
    }
  }

  deleteProduct(id: number) {
    this.products.mutate(prods => {
      let idx = prods.findIndex(p => p.id == id);
      if (idx > -1) {
        prods.splice(idx, 1);
      }
    })
  }

  private generateId(): number {
    let candidate = 100;
    while (this.getProduct(candidate) != null) {
      candidate++;
    }
    return candidate;
  }
}
