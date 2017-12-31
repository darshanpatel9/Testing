import { Component, OnInit, AfterViewInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { New1Service } from '../services/new1.service';
import { ChartsModule } from 'ng2-charts';
import Chart from 'chart.js';

@NgModule({
  imports: [ChartsModule]
})

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {

  array_date_amount: Array<{date: any, amount: number}> = [];
  date_array: Array<any>;
  month_array: Array<string> = [];
  amountofdate_array: Array<number>;
  month: Array<string> = [];
  amount: Array<number> = [];

  @ViewChild('abc') abc: ElementRef;

  constructor(
    private elRef:ElementRef,
    private authService: AuthService,
    private new1Service: New1Service
  ) {
    // setTimeout(function(){
    //   this.array_date_amount = new1Service.array_date_amount;
    // },1000);
    this.array_date_amount = new1Service.array_date_amount;


  }

  ngOnInit() {
    // console.log(this.array_date_amount);
    this.date_array = this.array_date_amount.map(obj => obj.date);
    this.amountofdate_array = this.array_date_amount.map(obj => obj.amount);
    let monthNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec' ];
    this.date_array.forEach(date_array => {
      this.month_array.push(monthNames[new Date(Date.parse(date_array)).getMonth()]);
    });
    let temp: number = this.month_array.length-1;

    for(let i=0; i<12; i++){
      if(i==0){
        if(temp>=0){
          this.amount.push(this.amountofdate_array[temp]);
          this.month.push(this.month_array[temp]);
          temp--;
        }else{
          let temp1 = (new Date().getMonth()+12)%12;
          while(i<12){
            this.amount[i] = 0;
            this.month[i] = monthNames[temp1];
            temp1 = (temp1-1+12)%12;
            i++;
          }
        }
      }else{
        if(temp>=0){
          if(new Date(Date.parse(this.date_array[temp+1])).getMonth() - new Date(Date.parse(this.date_array[temp])).getMonth() == 1 || new Date(Date.parse(this.date_array[temp+1])).getMonth() - new Date(Date.parse(this.date_array[temp])).getMonth() == -11){
            this.amount[i] = this.amountofdate_array[temp];
            this.month[i] = this.month_array[temp];
            temp--;
          }else{
            let temp1 = (new Date(Date.parse(this.date_array[temp+1])).getMonth()-1+12)%12;
            while(temp1 != (new Date(Date.parse(this.date_array[temp])).getMonth()+12)%12){
              if(i<12){
                this.amount[i] = 0;
                this.month[i] = monthNames[temp1];
              }
              temp1 = (temp1-1+12)%12;
              i++;
            }
            if(i<12){
              this.amount[i] = this.amountofdate_array[temp];
              this.month[i] = this.month_array[temp];
            }
            temp--;
          }
        }else{
          let temp1 = (new Date(Date.parse(this.date_array[temp+1])).getMonth()-1+12)%12;
          while(i<12){
            this.amount[i] = 0;
            this.month[i] = monthNames[temp1];
            temp1 = (temp1-1+12)%12;
            i++;
          }
        }
      }
    }




    let ctx = this.abc.nativeElement;
    let myBarChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.month,
        datasets: [{
          data: this.amount,
          // backgroundColor: [
          //   '#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE'
          // ],
          // borderColor: [
          //   '#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE'
          // ],
          backgroundColor: [
            '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC'
          ],
          borderColor: [
            '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC', '#FCFCFC'
          ],
          borderWidth: 0
        }]
      },
      options: {
        barThickness : 1,
        scales: {
          xAxes: [{
            gridLines: {
              display: false
            },
            stacked: true
          }],
          yAxes: [{
            gridLines: {
              display: false
            },
            stacked: true
          }]
        },
        legend: {
          display: false,
          labels: {
            fontColor: 'white',
            boxWidth: 10,
            padding: 0
          },
          position: 'right'
        }
      },
      plotOptions: {
        series: {
          borderRadius: 5
        }
      }
    });
  }

}
