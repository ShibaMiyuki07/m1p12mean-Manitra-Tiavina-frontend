import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Product} from "../../models/product";
import {ProductStock} from "../../models/apiResult/product-stock";

@Injectable({
  providedIn: 'root'
})
export class ApiProductServiceService {
  readonly url = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }

  getAllProducts() {
    return this.http.get<Array<Product>>(`${this.url}/products/`);
  }

  getAllProductsWithStocks() {
    return this.http.get<Array<ProductStock>>(`${this.url}/products/with/stocks`);
  }

  getProductById(productId: any) {
    return this.http.get<Product>(`${this.url}/products/${productId}`);
  }

  getProductByIdWithStock(productId: any) {
    return this.http.get<Array<ProductStock>>(`${this.url}/products/with/stocks/${productId}`);
  }

  createProduct(product: Product) {
    this.http.post(`${this.url}/products`, product).subscribe();
  }


  updateProduct(product: Product) {
    this.http.put(`${this.url}/products/${product._id}`,
      {
        name : product.name,
        description : product.description,
        price : product.price,
        category : product.category,
        image : product.image,
        createdAt : product.createdDate,
        updatedAt : new Date()

      }).subscribe(val => {
        console.log("PUT call successful value returned in body",
          val);
      },
      response => {
        console.log("PUT call in error", response);
      },
      () => {
        console.log("The PUT observable is now completed.");
      });
  }

  deleteProduct(productId: any) {
    this.http.delete(`${this.url}/products/${productId}`).subscribe(() => {});
  }
}
