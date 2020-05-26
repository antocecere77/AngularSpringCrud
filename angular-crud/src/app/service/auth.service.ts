import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  getToken() {
    return window.localStorage.getItem('token');
  }

  isLogged() {
    return this.getToken() != null ? true : false;
  }

  clearAll() {
    window.localStorage.removeItem('token');
  }

  getUserName() {
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(this.getToken());
    return decodedToken.sub;
  }
}
