import {Component, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../components/menubar-manager/menubar-manager.component";
import {ApiProductServiceService} from "../../../services/productApi/api-product-service.service";
import {ProductStock} from "../../../models/apiResult/product-stock";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-list-product',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './list-product.component.html',
  styleUrl: './list-product.component.css'
})
export class ListProductComponent implements OnInit {
  products: ProductStock[] = [];

  constructor(private apiProduct : ApiProductServiceService) {}

  ngOnInit(): void {
    this.apiProduct.getAllProductsWithStocks().subscribe(products => {
      this.products = products;
    });
  }



}
