import { Component, OnInit } from '@angular/core';
import {New1Service} from '../services/new1.service';
import {AuthService} from '../services/auth.service';
import {FlashMessagesService} from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {FormGroup, FormControl,Validators} from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  password: any;
  username: any;
  change_form: FormGroup;
  newpassword_err: boolean = false;
  confirmpassword_err: boolean = false;
  currentpassword_err: boolean = false;
  passwordmatch_err: boolean = false;

  constructor(
    private new1Service: New1Service,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
  ) { }

  ngOnInit() {
    this.change_form = new FormGroup({
      'current_password': new FormControl(null, Validators.required),
      'new_password': new FormControl(null, Validators.required),
      'confirm_password': new FormControl(null, Validators.required)
    });
  }

  ChangePassword() {
    if(!this.change_form.valid || this.change_form.get('new_password').value!=this.change_form.get('confirm_password').value){
      if(!this.change_form.get('current_password').valid){
        this.currentpassword_err = true;
      }
      else if(!this.change_form.get('new_password').valid){
        this.newpassword_err = true;
      }
      else if(!this.change_form.get('confirm_password').valid){
        this.confirmpassword_err = true;
      }
      else if(this.change_form.get('new_password').value!=this.change_form.get('confirm_password').value){
        this.passwordmatch_err = true;
      }
      return false;
    }

    this.username = JSON.parse(localStorage.getItem('user')).username;
    const user = {
      username: this.username,
      password : this.change_form.get('current_password').value
    }
    const user1 = {
      username: this.username,
      password : this.change_form.get('new_password').value
    }


      this.authService.validateCurrentPassword(user).subscribe(data => {
        if(data.success) {
          this.new1Service.Changepass(user1).subscribe(data => {
            if (data.success) {
              // this.authService.storeUserData(data.token, data.user);
              this.flashMessage.show(data.msg, {cssClass: 'alert-success', timeout: 3000});
              // this.authService.logout();
              this.router.navigate(['profile']);
            } else {
              this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
              // this.router.navigate(['login']);
            }
          });
        }else{
          this.flashMessage.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        }
      });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['']);
    return false;
  }
}
