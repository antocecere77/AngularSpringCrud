import { Component, OnInit , Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {User} from '../../model/user.model';
import {ApiService} from '../../service/api.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private apiService: ApiService) { }

  ngOnInit() {
    const userId = +this.route.snapshot.params.id;
    if (!userId) {
      alert('Invalid action.');
      this.router.navigate(['list-user']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [''],
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', Validators.required],
      salary: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(data.result);
      });
  }

  onSubmit() {
    this.apiService.updateUser(this.editForm.value)
      .pipe(first())
      .subscribe(
        data => {
          alert('User updated successfully.');
          this.router.navigate(['list-user']);
        },
        error => {
          alert(error);
        });
  }

}
