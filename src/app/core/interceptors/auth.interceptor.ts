import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Token } from '../services/Token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(Token); // Injecte le service Token
  const token = tokenService.getToken();

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
