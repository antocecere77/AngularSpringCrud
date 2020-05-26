import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {

  token: string;

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)  {

    this.token = this.auth.getToken();

    if (!this.auth.isLogged()) {
       this.route.navigate(['']);
       return false;
    } else {
     return true;
    }
  }

  constructor(private auth: AuthService, private route: Router) { }
}

