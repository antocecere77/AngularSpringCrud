import { Component } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Employee Management';

  constructor(private auth: AuthService, private router: Router) {}

  logout() {
    this.auth.clearAll();
    this.router.navigate(['']);
  }
}
