import { Component, OnInit, ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private elRef:ElementRef,
    private flashMessage:FlashMessagesService,
    private router:Router
  ) { }

  ngOnInit() {
    if(this.authService.loggedIn()){
        console.log("Hii");
        this.elRef.nativeElement.querySelector('.top').style.height = "auto";
    }
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashMessage.show('You are logged out', {cssClass: 'alert-success', timeout: 3000});
    this.router.navigate(['']);
    return false;
  }
}
