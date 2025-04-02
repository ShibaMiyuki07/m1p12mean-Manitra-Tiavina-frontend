import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  userId: string;
  iat: number;
  exp: number;
}

@Injectable({
  providedIn: 'root',
})
export class Token {
  private readonly TOKEN_KEY = 'authToken';

  getToken() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
