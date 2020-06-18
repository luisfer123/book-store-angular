import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

  singupForm: FormGroup;

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
    this.singupForm = new FormGroup({
      'username': new FormControl(null),
      'password': new FormControl(null),
      'confirmPassword': new FormControl(null),
      'email': new FormControl(null)
    });
  }

  onSubmitSignupForm() {
    console.log(this.singupForm.value);
    this.authService.singup(this.singupForm.value)
      .subscribe(any => {
        console.log('User Created!');
    });
  }

}
