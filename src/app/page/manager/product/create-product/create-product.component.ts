import {Component, inject} from '@angular/core';
import {MenubarManagerComponent} from "../../../../components/menubar-manager/menubar-manager.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Product} from "../../../../models/product";
import {ApiProductServiceService} from "../../../../services/productApi/api-product-service.service";
import {Router} from "@angular/router";

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
    this.apiProduct.createProduct(this.product);
    this.router.navigate(['/manager/products']);
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
