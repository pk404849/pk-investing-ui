// src/app/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string): boolean {
    if (email === 'pk404849@gmail.com' && password === 'password123') {
      localStorage.setItem('token', 'dummy-jwt-token');
      return true;
    }
    return false;
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') !== null;
  }

  constructor(private router: Router) {}
}
