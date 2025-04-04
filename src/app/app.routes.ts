import { Routes } from '@angular/router';
import {IndexMechanicComponent} from "./page/mecanics/index-mechanic/index-mechanic.component";
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import {AuthGuard} from "./core/guards/auth.guard";
import {ClientGuard} from "./core/guards/client.guard";
import {MecanicienGuard} from "./core/guards/mecanicien.guard";
import {ManagerGuard} from "./core/guards/manager.guard";
import {IndexManagerComponent} from "./page/manager/index-manager/index-manager.component";
import {ListProductComponent} from "./page/manager/product/list-product/list-product.component";
import {UpdateProductComponent} from "./page/manager/product/update-product/update-product.component";
import {CreateProductComponent} from "./page/manager/product/create-product/create-product.component";
import {ListServiceComponent} from "./page/manager/services/list-service/list-service.component";
import {CreateServiceComponent} from "./page/manager/services/create-service/create-service.component";
import {UpdateServiceComponent} from "./page/manager/services/update-service/update-service.component";
import {ProductDetailsComponent} from "./page/product-details/product-details.component";
import {CartComponent} from "./page/client/cart/cart.component";
import {ClientProductListComponent} from "./page/client/client-product-list/client-product-list.component";
import {RdvClientComponent} from "./page/client/rdv-client/rdv-client.component";
import {ChatComponent} from "./page/client/chat/chat.component";
import {CheckoutComponent} from "./page/client/checkout/checkout.component";

export const routes: Routes = [
  { path: 'mechanic', component: IndexMechanicComponent, canActivate: [MecanicienGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'product-detail/:id', component: ProductDetailsComponent },
  { path: 'cart', component: CartComponent, canActivate: [ClientGuard] },
  { path: 'checkout', component: CheckoutComponent, canActivate: [ClientGuard] },
  { path: 'manager' , component : IndexManagerComponent, canActivate: [ManagerGuard] },
  { path: 'manager/products', component: ListProductComponent, canActivate: [ManagerGuard] },
  { path: 'manager/products/:id', component: UpdateProductComponent, canActivate: [ManagerGuard] },
  { path: 'manager/create/product', component: CreateProductComponent, canActivate: [ManagerGuard] },
  { path: 'manager/services', component: ListServiceComponent, canActivate: [ManagerGuard] },
  { path: 'manager/create/service', component: CreateServiceComponent, canActivate: [ManagerGuard] },
  { path: 'manager/service/:id', component: UpdateServiceComponent, canActivate: [ManagerGuard] },
  {path : 'client/products', component: ClientProductListComponent },
  {path : 'client/rdv',component : RdvClientComponent , canActivate: [ClientGuard] },
  {path : "client/chat", component: ChatComponent, canActivate: [ClientGuard] },
];
