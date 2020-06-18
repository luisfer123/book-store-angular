import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  user: User;
  editUserForm: FormGroup;
  changePasswordForm: FormGroup;

  username: string;

  constructor(private userService: UserService,
    private activatedRoute: ActivatedRoute) {
      this.editUserForm = new FormGroup({
        'username': new FormControl(null),
        'email': new FormControl(null)
      });
      this.changePasswordForm = new FormGroup({
        'password': new FormControl(null)
      });
    }

  ngOnInit() {
    this.updateComponent();
    if(this.user) {
      console.log('formControl updated!');
     
    }
  }

  updateComponent() {
    this.activatedRoute.queryParams.subscribe(params => {
      if(params['userId']) {
        this.userService.getUser(params['userId']).subscribe(data => {
          this.user = data;
          // After user data is retrive from the server we use it to set default values
          // to the form input fields.
          this.editUserForm.controls['username'].patchValue(this.user.username);
          this.editUserForm.controls['email'].patchValue(this.user.email);
        });
        
      }
    });
  }

  onSubmitForm() {

    let userUpdated = new User(this.editUserForm.value);
    userUpdated.id = this.user.id;

    this.userService.updateUser(userUpdated).subscribe(
      (data) => {
        console.log('user updated!');
      }
    );
  }

  onUpdatePassword() {

    console.log(this.changePasswordForm);

    

  }

}
