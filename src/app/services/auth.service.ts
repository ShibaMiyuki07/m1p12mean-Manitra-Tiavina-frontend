import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import {BehaviorSubject, catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private tokenKey = 'authToken';
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
      .post<{ token: string }>(this.apiUrl, { email, password })
      .pipe(
        catchError((error) => {
          if (error.status === 401) {
            return throwError(() => ({
              type: 'auth',
              message: 'Email ou mot de passe incorrect'
            }));
          }
          return throwError(() => ({
            type: 'server',
            message: 'Erreur de connexion au serveur'
          }));
        })
      );
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
