import {Component, inject} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../../models/product";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";

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
  apiProduct = inject(ApiProductServiceService);
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

  createProduct() {
    console.log(this.product);
    this.apiProduct.createProduct(this.product);
  }

  getFileInformation(event:any)
  {
    const file:File = event.target.files[0];
    if(file)
    {
      this.product.image = file.name;
    }
  }

}
