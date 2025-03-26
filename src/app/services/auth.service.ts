import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {BehaviorSubject, catchError, tap, throwError} from 'rxjs';

interface LoginResponse {
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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly apiUrl = environment.apiUrl;
  private readonly tokenKey = 'authToken';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router) {
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
          localStorage.setItem(this.tokenKey, response._id);
          this.redirectBasedOnRole(response.role);
        }),
        catchError(error => {
          throw this.handleAuthError(error);
        })
      );
  }

  private redirectBasedOnRole(role: string): void {
    const routes: Record<string, string> = {
      manager: '/manager/dashboard',
      mecanicien: '/mecanicien/planning',
      client: '/client/profil'
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
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.error('Registration failed:', err);
        },
      });
  }

  // Déconnexion de l'utilisateur
  logout() {
    localStorage.removeItem(this.tokenKey);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/auth/login']);
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
}
