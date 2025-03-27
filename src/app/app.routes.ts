import { Routes } from '@angular/router';
import {IndexMechanicComponent} from "./page/index-mechanic/index-mechanic.component";
import { LoginComponent } from './page/login/login.component';
import { RegisterComponent } from './page/register/register.component';
import { HomeComponent } from './page/home/home.component';
import {AuthGuard} from "./core/guards/auth.guard";

export const routes: Routes = [
  { path: 'mechanic', component: IndexMechanicComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
];
