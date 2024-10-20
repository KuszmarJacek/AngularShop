import { Injectable } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, Observable } from "rxjs";

export const REST_URL = `http://${location.hostname}:3500/products`;

@Injectable()
export class RestDataSource {
  
  constructor(private http: HttpClient) {
  }

  getData(): Observable<Product[]> {
    return this.http.get<Product[]>(REST_URL);
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(REST_URL, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put(`${REST_URL}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<Product> {
    return this.http.delete<Product>(`${REST_URL}/${id}`);
  }

  private sendRequest<T>(verb: string, url: string, body?: Product): Observable<T> {
    return this.http.request<T>(verb, url, {
      body: body
    }).pipe(catchError((error: Response) => {
      throw(`Network Error: ${error.statusText} (${error.status})`)
    }));
  }
}