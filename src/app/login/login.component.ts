import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  username_err: boolean = false;
  password_err: boolean = false;
  constructor(
    private authService: AuthService,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    });
  }

  onsubmit1(){

    if(!this.loginForm.valid){
      if(!this.loginForm.get('username').valid){
        this.username_err = true;
      }
      else if(!this.loginForm.get('password').valid){
        this.password_err = true;
      }
      return false;
    }

    const user = {
      username: this.loginForm.get('username').value,
      password: this.loginForm.get('password').value
    }

    this.authService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.authService.storeUserData(data.token, data.user);
        this.flashMessage.show('You are now logged in', {cssClass: 'flash-message-alert', timeout: 3000});
        this.authService.loadData();
        this.router.navigate(['dashboard']);
      } else{
        this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['login']);
      }
    });


  }
}
