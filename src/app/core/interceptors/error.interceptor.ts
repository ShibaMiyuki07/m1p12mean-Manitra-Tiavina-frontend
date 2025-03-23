import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import {HttpErrorResponse, HttpInterceptorFn} from '@angular/common/http';
import { inject } from '@angular/core';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router); // Injecte le Router
  const authService = inject(AuthService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Gestion des erreurs
      if (error.status === 401) {
        // Erreur 401 : Non autorisé
        authService.logout(); // Déconnecter l'utilisateur
        router.navigate(['/auth/login']); // Rediriger vers la page de connexion
      } else if (error.status === 403) {
        // Erreur 403 : Accès refusé
        router.navigate(['/forbidden']); // Rediriger vers une page d'erreur
      } else if (error.status === 404) {
        // Erreur 404 : Ressource non trouvée
        router.navigate(['/not-found']); // Rediriger vers une page d'erreur
      } else if (error.status === 500) {
        // Erreur 500 : Erreur serveur
        router.navigate(['/server-error']); // Rediriger vers une page d'erreur
      }

      // Afficher l'erreur dans la console (pour le débogage)
      console.error('HTTP Error:', error);

      // Propager l'erreur
      return throwError(() => error);
    })
  );
};
