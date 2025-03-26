import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Token {
  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiIxIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTc0MjQ3OTY1MiwiZXhwIjo1NjM4MTA2MDAyMDUyfQ.l5i3UolT-XP5fp_Ox1fCrI4rIVFSiaCh6lH8eptLBgg';

  getToken() {
    return this.token;
  }
}
