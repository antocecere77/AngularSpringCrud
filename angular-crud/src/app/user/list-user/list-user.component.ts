import { Component, OnInit , Inject} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../model/user.model';
import {ApiService} from '../../service/api.service';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router, private apiService: ApiService, private auth: AuthService) { }

  ngOnInit() {

    this.apiService.getUsers()
      .subscribe( data => {
        this.users = data.result;
      }, error => {
        this.auth.clearAll();
        this.router.navigate(['']);
      });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
      });
  }

  editUser(user: User): void {
    this.router.navigate(['edit-user', user.id]);
  }

  addUser(): void {
    this.router.navigate(['add-user']);
  }
}
