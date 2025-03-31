import { Routes } from '@angular/router';
import {IndexMechanicComponent} from "./page/mecanics/index-mechanic/index-mechanic.component";
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import {AuthGuard} from "./core/guards/auth.guard";
import {IndexManagerComponent} from "./page/manager/index-manager/index-manager.component";
import {ListProductComponent} from "./page/manager/product/list-product/list-product.component";
import {UpdateProductComponent} from "./page/manager/product/update-product/update-product.component";
import {CreateProductComponent} from "./page/manager/product/create-product/create-product.component";

export const routes: Routes = [
  { path: 'mechanic', component: IndexMechanicComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'manager' , component : IndexManagerComponent},
  { path: 'manager/products', component: ListProductComponent },
  { path: 'manager/products/:id', component: UpdateProductComponent },
  { path: 'manager/create/product', component: CreateProductComponent }
];
