import { Injectable, Signal, signal } from '@angular/core';
import { Product } from './product.model';
import { RestDataSource } from './rest.datasource';

@Injectable()
export class Model {
  private products = signal<Product[]>([]);

  constructor(private dataSource: RestDataSource) {
    this.dataSource.getData().subscribe((data) => this.products.set(data));
  }

  get Products(): Signal<Product[]> {
    return this.products.asReadonly();
  }

  getProduct(id: number): Product | undefined {
    return this.products().find(p => p.id == id);
  }

  saveProduct(product: Product) {
    if (product.id == 0 || product.id == undefined) {
      this.dataSource
        .saveProduct(product)
        .subscribe((p) => this.products.mutate((prods) => prods.push(p)));
    } else {
      this.dataSource.updateProduct(product).subscribe(() => {
        this.products.mutate((prods) => {
          let idx = prods.findIndex((p) => p.id == product.id);
          prods.splice(idx, 1, product);
        });
      });
    }
  }

  deleteProduct(id: number) {
    this.dataSource.deleteProduct(id).subscribe(() => {
      this.products.mutate((prods) => {
        let idx = prods.findIndex(p => p.id == id);
        if (idx > -1) {
          prods.splice(idx, 1);
        }
      });
    });
  }

  getNextProductId(id?: number): number {
    let nextId = 0;
    let index = this.products().findIndex(p => p.id == id);
    if (index > -1) {
      nextId = this.products()[this.products().length > index + 1 ? index + 1 : 0].id ?? 0;
    } else {
      nextId = id || 0;
    }
    return nextId;
  }

  getPreviousProductId(id?: number): number {
    let nextId = 0;
    let index = this.products().findIndex(p => p.id == id);
    if (index > -1) {
      nextId = this.products()[index > 0 ? index - 1 : this.products().length - 1].id ?? 0;
    } else {
      nextId = id || 0;
    }
    return nextId;
  }
}
