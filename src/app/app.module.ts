import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule, Routes} from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AuthService } from './services/auth.service';
import { New1Service } from './services/new1.service';
import {FlashMessagesModule} from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';

import { DatepickerModule, TimepickerModule  } from 'ngx-bootstrap';
import { DatepickerDemoComponent } from './datepicker-demo/datepicker-demo.component';
import { DemoTimepickerBasicComponent } from './demo-timepicker-basic/demo-timepicker-basic.component';
import {SelectModule} from 'ng2-select';
import {OrderByPipe} from './orderby';
import {GroupByPipe} from './group-by';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartDemoComponent } from './doughnut-chart-demo/doughnut-chart-demo.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

import {AngularFireDatabase} from "angularfire2/database";
import {FirebaseApp} from "angularfire2";

const appRoutes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'forget', component: ForgotPasswordComponent },
  { path: 'change', component: ChangePasswordComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    NavbarComponent,
    ProfileComponent,
    DashboardComponent,
    DatepickerDemoComponent,
    DemoTimepickerBasicComponent,
    OrderByPipe,
    GroupByPipe,
    DoughnutChartDemoComponent,
    BarChartComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    DatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    SelectModule,
    ChartsModule
  ],
  providers: [AuthService, AuthGuard, New1Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
