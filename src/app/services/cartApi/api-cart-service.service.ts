import {inject, Injectable, Injector, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {BehaviorSubject, lastValueFrom, Observable, tap} from 'rxjs';
import {Product} from "../../models/product";
import { PdfService } from '../pdf.service';
import {environment} from "../../../environments/environment";
import {User} from "../../models/User";
import {jwtDecode} from "jwt-decode";
import {ApiReservationServiceService} from "../reservationApi/api-reservation-service.service";
import {AuthService} from "../auth.service";
import {ApiServiceService} from "../serviceApi/api-service.service";
import {addHours} from "date-fns";
import {Service} from "../../models/Service";
import {Router} from "@angular/router";

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

interface CartItem {
  _id?: string;
  productId?: string;
  serviceId?: Service;
  quantity?: number;
  date?: Date;
}

interface Cart {
  _id: string;
  userId: string;
  products: CartItem[];
  services: CartItem[];
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private itemCount = new BehaviorSubject<number>(0);
  public itemCount$ = this.itemCount.asObservable();
  private cartSubject = new BehaviorSubject<Cart | null>(null);
  public cart$ = this.cartSubject.asObservable();
  private readonly apiReservation = inject(ApiReservationServiceService);
  private injector: Injector = inject(Injector);
  private readonly apiService : ApiServiceService = inject(ApiServiceService);
  private readonly router : Router = inject(Router);

  constructor(private http: HttpClient, private pdfService: PdfService) {}

  readonly url = environment.apiUrl;
  private apiUrl = this.url+'/cart';

  // Charge le panier depuis le backend
  loadCart() {
    return this.http.get<Cart>(this.apiUrl);
  }

  async updateCount(): Promise<void> {
    try {
      const count = await this.getItemNumber();
      this.itemCount.next(count);
      localStorage.setItem('cartItemCount', count.toString()); // Persistence optionnelle
    } catch (error) {
      console.error('Failed to update cart count:', error);
      const savedCount = localStorage.getItem('cartItemCount');
      this.itemCount.next(savedCount ? parseInt(savedCount, 10) : 0);
    }
  }

  // Ajoute un produit au panier
  addProduct(productId: string, quantity: number = 1): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/products`, { productId, quantity }).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  // Ajoute un service au panier
  addService(serviceId: string, date: Date): Observable<Cart> {
    return this.http.post<Cart>(`${this.apiUrl}/services`, { serviceId, date }).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  // Met à jour la quantité
  updateQuantity(itemId: string, quantity: number): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/products`, { productId: itemId, quantity }).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  // Met à jour la date
  updateDate(itemId: string, date: Date): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/services`, { serviceId: itemId, date }).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  updateStatus(cartId: string, cart: Cart): Observable<Cart> {
    return this.http.put<Cart>(`${this.apiUrl}/update/${cartId}`, cart).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  // Supprime un élément
  removeItem(itemId: string, isProduct: boolean): Observable<Cart> {
    return this.http.delete<Cart>(`${this.apiUrl}/items/${itemId}`, {
      params: { type: isProduct ? 'product' : 'service' }
    }).pipe(
      tap(cart => this.cartSubject.next(cart)))
  }

  // Vide le panier
  clearCart(): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/clear`).pipe(
      tap(() => this.cartSubject.next(null)))
  }

  getUserById() {
    return this.http.get<User>(`${this.url}/users/${this.getUserId()}`);
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.userId || null;
  }

  decodeToken(): JwtPayload | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      return jwtDecode<JwtPayload>(token);
    } catch (error) {
      console.error('Token invalide', error);
      return null;
    }
  }

  getToken(): string | null {
    return localStorage.getItem("authToken");
  }

  // Passe la commande
  async checkout(): Promise<void> {
    try {
      const order = await lastValueFrom(this.loadCart());
      const customer = await lastValueFrom(this.getUserById());
      const auth = this.injector.get(AuthService);
      order.status = "fulfilled";
      await lastValueFrom(this.updateStatus(order._id,order));

      for(let service of order.services) {
        let serviceDetails = await this.apiService.getServiceById(service.serviceId!._id).toPromise();
        this.apiReservation.createReservation({
          _id : undefined,
          createdAt: new Date(),
          endReservation: addHours(service.date!,serviceDetails?.duration!),
          mechanicId: undefined,
          reservationDate: service.date!,
          serviceId: service.serviceId,
          status: "unassigned",
          updatedAt: new Date(),
          userId: auth.getUserId()
        });
      }
      // Génération du PDF
      this.pdfService.generateInvoice(order, customer);
      await this.updateCount();
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Checkout failed:', error);
      throw error;
    }
  }

  async getItemNumber(): Promise<number> {
    try {
      const cart = await lastValueFrom(this.loadCart());
      return (cart?.products?.length || 0) + (cart?.services?.length || 0);
    } catch (error) {
      console.error('Error loading cart:', error);
      throw error;
    }
  }
}
