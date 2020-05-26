import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {AddUserComponent} from "./user/add-user/add-user.component";
import {ListUserComponent} from "./user/list-user/list-user.component";
import {EditUserComponent} from "./user/edit-user/edit-user.component";
import { RouteGuardService } from './core/route-guards';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'add-user', component: AddUserComponent , canActivate: [RouteGuardService]},
  { path: 'list-user', component: ListUserComponent, canActivate: [RouteGuardService], },
  { path: 'edit-user/:id', component: EditUserComponent, canActivate: [RouteGuardService], },
  {path : '', component : LoginComponent}
];

export const routing = RouterModule.forRoot(routes);
