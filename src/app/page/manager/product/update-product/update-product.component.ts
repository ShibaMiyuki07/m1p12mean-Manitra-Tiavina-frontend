import {Component, inject, OnInit} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../../../models/product";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";
import {FormsModule} from "@angular/forms";
import {ProductStock} from "../../../../models/apiResult/product-stock";
import {Stock} from "../../../../models/stock";

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    FormsModule
  ],
  templateUrl: './update-product.component.html',
  styleUrl: './update-product.component.css'
})

export class UpdateProductComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly apiProduct = inject(ApiProductServiceService);
  id : any;
  productStock : ProductStock = new class implements ProductStock {
    _id: any;
    category: string = "";
    createdDate: Date = new Date();
    description: string = "";
    image: string = "";
    name: string = "";
    price: number = 0;
    result: Stock | null = null;
    updatedDate: Date = new Date();
  };

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.apiProduct.getProductByIdWithStock(this.id).subscribe(product => {
        for(let i=0; i<product.length; i++) {
          this.productStock = product[i];
        }
        console.log(this.productStock);
      });
    })
  }

  updateProduct() {
      this.apiProduct.updateProduct(this.productStock);
      location.reload();
  }
}
