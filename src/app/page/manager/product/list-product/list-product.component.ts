import {Component, inject, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";
import {ProductStock} from "../../../../models/apiResult/product-stock";
import {NgForOf, NgIf} from "@angular/common";
import {Router} from "@angular/router";

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
  private router = inject(Router);
  private apiProduct = inject(ApiProductServiceService);

  constructor() {}

  ngOnInit(): void {
    this.apiProduct.getAllProductsWithStocks().subscribe(products => {
      this.products = products;
    });
  }

  delete(productId : any)
  {
    this.apiProduct.deleteProduct(productId);
    location.reload();
    //To Add delete stock when it is finished
  }

  linkUpdate(productId : any)
  {
    this.router.navigate(['/manager/products/'+productId]);
  }


}
