import {Component, inject, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";
import {ProductStock} from "../../../../models/apiResult/product-stock";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";
import {ApiStockServiceService} from "../../../../services/stockApi/api-stock-service.service";
import {Stock} from "../../../../models/stock";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    NgForOf,
    NgIf,
    FormsModule
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  products: ProductStock[] = [];
  private router = inject(Router);
  private apiProduct = inject(ApiProductServiceService);
  private apiStock: ApiStockServiceService = inject(ApiStockServiceService);
  isOpen : boolean = false;

  stock:Stock = new class implements Stock {
    _id: any;
    createdAt: any;
    productId: any;
    stockQuantity: number = 0;
    threshold: number = 0;
    updatedAt: any;
  };

  constructor() {}

  ngOnInit(): void {
    this.apiProduct.getAllProductsWithStocks().subscribe(products => {
      this.products = products;
    });
  }

  delete(productId : any,stockId : any)
  {
    this.apiProduct.deleteProduct(productId);
    if(stockId)
    {
      this.apiStock.deleteStock(stockId);
    }
    location.reload();
    //To Add delete stock when it is finished
  }

  linkUpdate(productId : any)
  {
    this.router.navigate(['/manager/products/'+productId]);
  }

  openModal(productId : any) {
    this.stock.productId = productId;
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }

  submitStock() {
    this.apiStock.createStock(this.stock);
    location.reload();
  }
}
