import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { New1Service } from '../services/new1.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import {SelectModule} from 'ng2-select';
import {OrderByPipe} from '../orderby';
import {GroupByPipe} from '../group-by';
import { NgModule } from '@angular/core';
import * as _ from "lodash";

@NgModule({
  declarations: [OrderByPipe, GroupByPipe]
})

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    expenseForm: FormGroup;
    details_err: boolean = false;
    amount_err: boolean = false;
    category_err: boolean = false;
    expenses : Array<Object> = [];
    username : string;
    name: string;
    dt: Date = new Date();
    mytime: Date = new Date();

    display_add: boolean = true;
    display_view: boolean = false;

    public items:Array<string> = ['Bills', 'EMI', 'Entertainment', 'Food & Drinks', 'Fuel', 'Groceries',
                                  'Health', 'Investment', 'Shopping', 'Transfer', 'Travel', 'Other'];
    private value:any = {};
    temp1: Array<any> = [];
    total_amount: number = 0;

    array_date_amount: Array<{date: any, amount: number}> = [];

    display_doughnutchart: boolean = false;
    display_barchart: boolean = false;

    constructor(
        private elRef:ElementRef,
        private authService: AuthService,
        private new1Service: New1Service,
        private flashMessage:FlashMessagesService,
        private router:Router) {

        let m = JSON.parse(localStorage.getItem("user"));
        this.username = m.username;
        this.name = m.name;

        this.authService.getExpense().subscribe(abc => {
            this.expenses = abc["expenses"];

            let amount_array: Array<number> = [];                         // ARRAY OF AMOUNT, CATEGORY WISE
            for(let i=0; i<this.items.length; i++){
              let temp: number = 0;
              for(let j=0; j<this.expenses.length; j++){
                if(this.items[i] == this.expenses[j]["category"]){
                  temp = temp + parseInt(this.expenses[j]["amount"]);
                }
              }
              amount_array.push(temp);
            }
            this.new1Service.amount_array = amount_array;
            this.new1Service.category_array = this.items;

            let total_amount: number = 0;                                 // TOTAL AMOUNT
            for (let i = 0; i < this.expenses.length; i++) {
              total_amount = total_amount + parseInt(this.expenses[i]["amount"]);
            }
            this.total_amount = total_amount;
            this.new1Service.total_amount = this.total_amount;

            let abcd = this.expenses;
            abcd = _.sortBy(abcd, ['date']);

            let temp: Array<any> = [];                                    // ARRAY OF DATE
            for (let i = 0; i < abcd.length; i++) {
                temp.push(abcd[i]["date"]);
            }
            this.temp1 = temp;
            this.temp1 = this.temp1.reverse();
            // for (let i = 0; i < temp.length; i++) {
            //     let milis = Date.parse(temp[i]);
            //     let d = new Date(milis);
            //     this.temp1[i] = d.getMonth();
            // }
            // this.temp1 = this.temp1.sort();
            // this.temp1 = this.temp1.reverse();

            for(let i=0; i<abcd.length; i++){
                if(i==0 && abcd.length>0){
                    this.array_date_amount.push({date:abcd[i]["date"], amount:abcd[i]["amount"]});
                }else if(i!=0){
                    if(new Date(Date.parse(abcd[i]["date"])).getMonth()==new Date(Date.parse(abcd[i-1]["date"])).getMonth() && new Date(Date.parse(abcd[i]["date"])).getFullYear()==new Date(Date.parse(abcd[i-1]["date"])).getFullYear()){
                      this.array_date_amount[this.array_date_amount.length-1]["amount"] = +this.array_date_amount[this.array_date_amount.length-1]["amount"] + +parseInt(abcd[i]["amount"]);
                    }else{
                        this.array_date_amount.push({date:abcd[i]["date"], amount:abcd[i]["amount"]});
                    }
                }
            }
            this.new1Service.array_date_amount = this.array_date_amount;
            this.display_doughnutchart = true;
            this.display_barchart = true;
            },
            err => {
                console.log(err);
                return false;
            }
        );
    }

    ngOnInit() {
        this.expenseForm = new FormGroup({
          'category': new FormControl(null, Validators.required),
          'amount': new FormControl(null, Validators.required),
          'details': new FormControl(null, Validators.required)
        });
      //let now = new Date();
      // this.expenseForm.controls['date'].setValue(now.toDateString());
      //this.expenseForm.controls['date'].setValue(this.dt);
    }


    onsubmit2(){
        let now = new Date();
        this.dt.setHours(this.mytime.getHours());
        this.dt.setMinutes(this.mytime.getMinutes());
        this.dt.setSeconds(this.mytime.getSeconds());

        if(!this.expenseForm.valid){
            if(!this.expenseForm.get('details').valid){
                this.details_err = true;
            }
            else if(!this.expenseForm.get('amount').valid){
                this.amount_err = true;
            }
            else if(!this.expenseForm.get('category').valid){
                this.category_err = true;
            }
            return false;
        }

        const expense = {
            category: this.value.text,
            amount: this.expenseForm.get('amount').value,
            details: this.expenseForm.get('details').value,
            username: this.username,
            date: this.getDate()
        }

        // Add Expense
        this.authService.enterExpense(expense).subscribe(data => {
            if(data.success){
                this.flashMessage.show('Data is added successfully', {cssClass: 'alert-success', timeout: 3000});
                this.router.navigate(['/dashboard']);
                window.location.reload();
            }
            else{
                this.flashMessage.show('Something went wrong', {cssClass: 'alert-danger', timeout: 3000});
                this.router.navigate(['/dashboard']);
            }
          }
        );
    }

    disp_cashexpense = function(){
        this.display_view = false;
        this.display_add = true;
        this.elRef.nativeElement.querySelector('.arrow_cashexpense').style.visibility = "visible";
        // console.log(this.elRef.nativeElement.querySelector('.arrow_cashexpense'));
    };
    disp_allspends = function(){
        this.display_add = false;
        this.display_view = true;
    };

    public getDate = function(): number {
        return this.dt && this.dt.getTime() || new Date().getTime();
    };
    public getTime = function(): number {
        return this.mytime && this.mytime.getTime() || new Date().getTime();
    };

    datepick_show:boolean = false;
    timepick_show:boolean = false;
    cal_click = function(){
        if(this.datepick_show)
            this.datepick_show = false;
        else
            this.datepick_show = true;
    }
    time_click = function(){
        if(this.timepick_show)
            this.timepick_show = false;
        else
            this.timepick_show = true;
    }

    public refreshValue(value:any):void {
        this.value = value;
    }

    /*dateconvert = function (date: string): string {
          var months= ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
          var milis = Date.parse(date);
          var d = new Date(milis)
          return months[d.getMonth()] + " " + d.getFullYear();
    }*/

    remove_duplicates = function(arr) {
        let obj = {};
        for (let i = 0; i < arr.length; i++) {
            obj[arr[i]] = true;
        }
        arr = [];
        for (let key in obj) {
            arr.push(key);
        }
        return arr;
    }

    checkarr = function (i: number): boolean {
        if(i==0)
            return true;
        // else if(this.temp1[i]!=this.temp1[i-1])
        else if (new Date(Date.parse(this.temp1[i])).getMonth() != new Date(Date.parse(this.temp1[i-1])).getMonth())
            return true;
        else if (new Date(Date.parse(this.temp1[i])).getMonth() == new Date(Date.parse(this.temp1[i-1])).getMonth() && new Date(Date.parse(this.temp1[i])).getFullYear() != new Date(Date.parse(this.temp1[i-1])).getFullYear())
            return true;
        else
            return false;
    }

    onLogoutClick(){
      this.authService.logout();
      this.flashMessage.show('You are logged out', {cssClass: 'flash-message-alert', timeout: 3000});
      this.router.navigate(['']);
      return false;
    }
}
