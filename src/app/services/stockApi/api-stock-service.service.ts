import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Stock} from "../../models/stock";

@Injectable({
  providedIn: 'root'
})
export class ApiStockServiceService {
  readonly url = environment.apiUrl;
  private readonly http: HttpClient = inject(HttpClient);
  constructor() { }


  getAllStocks() {
    return this.http.get<Array<Stock>>(`${this.url}/stocks`);
  }

  getStockById(stockId: any) {
    return this.http.get<Stock>(`${this.url}/stocks/${stockId}`);
  }

  createStock(stock: Stock) {
    this.http.post(`${this.url}/stocks`, stock).subscribe();
  }


  updateStock(stock: Stock) {
    this.http.put(`${this.url}/products/${stock._id}`,
      {
        productId: stock.productId,
        stockQuantity: stock.stockQuantity,
        threshold: stock.threshold,
        updatedAt: new Date(),

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

  deleteStock(stockId: any) {
    this.http.delete(`${this.url}/stocks/${stockId}`).subscribe(val => {});
  }
}
