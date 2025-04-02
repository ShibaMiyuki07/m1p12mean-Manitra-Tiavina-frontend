import {Component, inject} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../../models/product";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";
import {Router} from "@angular/router";
import {UtilsService} from "../../../../services/utilsApi/utils.service";

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    MenubarManagerComponent,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css'
})
export class CreateProductComponent {
  private router: Router =inject(Router);
  apiProduct = inject(ApiProductServiceService);
  utilsService = inject(UtilsService);
  product : Product = new class implements Product {
    _id: any;
    category: string = "";
    createdDate: Date = new Date();
    description: string = "";
    image: string = "";
    name: string = "";
    price: number = 0;
    updatedDate: Date = new Date();
  };

  productPicture : File | null = null;

  createProduct() {

    this.apiProduct.createProduct(this.product);
    this.utilsService.uploadProductImage(this.productPicture);
    this.router.navigate(['/manager/products']);
  }

  getFileInformation(event:any)
  {
    this.productPicture = event.target.files[0];
    if(this.productPicture)
    {
      this.product.image = this.productPicture.name;
    }
  }

}
