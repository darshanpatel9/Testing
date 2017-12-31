import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  name_err: boolean = false;
  username_err: boolean = false;
  password_err: boolean = false;
  confirmpassword_err: boolean = false;
  passwordmatch_err: boolean = false;
  email_err: boolean = false;

  constructor(
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      'name': new FormControl(null, Validators.required),
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required),
      'confirmpassword': new FormControl(null, Validators.required),
      'email': new FormControl(null, [Validators.required, Validators.email])
    });
  }
  onsubmit(){

    if(!this.registerForm.valid || (this.registerForm.get('confirmpassword').value!=this.registerForm.get('password').value)){
      if(!this.registerForm.get('name').valid){
        this.name_err = true;
      }
      else if(!this.registerForm.get('username').valid){
        this.username_err = true;
      }
      else if(!this.registerForm.get('password').valid){
        this.password_err = true;
      }
      else if(!this.registerForm.get('confirmpassword').valid){
        this.confirmpassword_err = true;
      }
      else if(this.registerForm.get('confirmpassword').valid && this.registerForm.get('confirmpassword').value!=this.registerForm.get('password').value){
        this.passwordmatch_err = true;
      }
      else if(!this.registerForm.get('email').valid){
        this.email_err = true;
      }
      return false;
    }

    const user = {
      name: this.registerForm.get('name').value,
      username: this.registerForm.get('username').value,
      password: this.registerForm.get('password').value,
      email: this.registerForm.get('email').value
    }

    console.log(user);

    // Register User
    this.authService.registerUser(user).subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are successfully Registered', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }
}
