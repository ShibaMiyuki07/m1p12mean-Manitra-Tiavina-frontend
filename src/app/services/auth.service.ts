import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';
import {jwtDecode} from "jwt-decode";
import {UserRole} from "../models/enum/UserRole";
import {CartService} from "./cartApi/api-cart-service.service";

interface JwtPayload {
  userId: string;
  role: string;
  iat: number;
  exp: number;
}

interface LoginResponse {
  user : {
    _id: string;
    email: string;
    role: string;
    username: string;
    profile: {
      firstName: string;
      lastName: string;
      address: string;
      phone: string;
      photo: string;
    };
  }
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, private cartService: CartService) {
    this.checkAuthentication();
  }

  // Vérifie si l'utilisateur est authentifié
  get isAuthenticated$() {
    return this.isAuthenticatedSubject.asObservable();
  }

  // Connexion de l'utilisateur
  login(email: string, password: string) {
    return this.http
      .post<LoginResponse>(`${this.apiUrl}/users/auth/login`, { email, password }, { withCredentials: true })
      .pipe(
        tap(response => {
          localStorage.setItem(this.tokenKey, response.token);
          localStorage.setItem("username", response.user.username);
          this.cartService.getItemNumber().then((count: number) => {
            localStorage.setItem("numberItem", count.toString());
          }).catch(error => {
            console.error('Erreur:', error);
          });
          console.log("Connexion réussi : " + response.user.username);
          this.redirectBasedOnRole(response.user.role);
        }),
        catchError(error => {
          throw this.handleAuthError(error);
        })
      );
  }

  private redirectBasedOnRole(role: string): void {
    const routes: Record<string, string> = {
      manager: 'manager',
      mecanicien: 'mechanic',
      client: 'home'
    };
    this.router.navigate([routes[role] || '/']);
  }

  private handleAuthError(error: any): Error {
    return error.status === 401
      ? new Error('Email ou mot de passe incorrect')
      : new Error('Erreur de connexion au serveur');
  }

  // Inscription de l'utilisateur
  register(username: string, email: string, password: string) {
    return this.http
      .post(`${this.apiUrl}/auth/register`, { username, email, password })
      .subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
  }

  // Déconnexion de l'utilisateur
  logout() {
    console.log('Logout');
    localStorage.clear();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  // Récupère le token JWT
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  // Vérifie si l'utilisateur est authentifié au démarrage
  private checkAuthentication() {
    const token = this.getToken();
    this.isAuthenticatedSubject.next(!!token);
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


  isExpired(): boolean {
    const decoded = this.decodeToken();
    if (!decoded?.exp) return true;
    return Date.now() >= decoded.exp * 1000;
  }

  getUserId(): string | null {
    const decoded = this.decodeToken();
    return decoded?.userId || null;
  }

  getRole(): string | null {
    const decoded = this.decodeToken();
    return decoded?.role || null;
  }

  isClient(): boolean {
    return this.getRole()?.toLowerCase() === UserRole.CLIENT;
  }

  isMecanicien(): boolean {
    return this.getRole()?.toLowerCase() === UserRole.MECANICIEN;
  }

  isManager(): boolean {
    return this.getRole()?.toLowerCase() === UserRole.MANAGER;
  }
}
