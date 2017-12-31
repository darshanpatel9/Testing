import { Component, OnInit, AfterViewInit, NgModule, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { New1Service } from '../services/new1.service';
import { ChartsModule } from 'ng2-charts';
import Chart from 'chart.js';

@NgModule({
  imports: [ChartsModule]
})

@Component({
  selector: 'app-doughnut-chart-demo',
  templateUrl: './doughnut-chart-demo.component.html',
  styleUrls: ['./doughnut-chart-demo.component.css']
})
export class DoughnutChartDemoComponent {

  amount_array: Array<number>;
  category_array: Array<string>;
  total_amount: number;
  percent_array: Array<any> = [];
  category_array_new: Array<string> = [];
  amount_array_new: Array<number> = [];
  background_color = ['#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE']
  border_color = ['#09ABF5', '#F50994', '#09F546', '#F59F09', '#F5EA09', '#09F5E0', '#0954F5', '#9109F5', '#F50909', '#46990A', '#0BA773', '#D981AE']
  background_color_new: Array<any> = [];
  border_color_new: Array<any> = [];

  @ViewChild('abc') abc: ElementRef;

  constructor(
    private elRef:ElementRef,
    private authService: AuthService,
    private new1Service:New1Service
  ) {
    this.amount_array = new1Service.amount_array;
    this.category_array = new1Service.category_array;
    this.total_amount = new1Service.total_amount;

    for(let i=0; i<this.amount_array.length; i++){
        if(this.amount_array[i]!=0){
            this.amount_array_new.push(this.amount_array[i]);
            this.category_array_new.push(this.category_array[i]);
            this.background_color_new.push(this.background_color[i]);
            this.border_color_new.push(this.border_color[i]);
        }
    }
    for(let i=0; i<this.amount_array_new.length; i++){
        this.percent_array.push(((this.amount_array_new[i]/this.total_amount)*100).toFixed(1));
        this.category_array_new[i] = this.category_array_new[i] + " " + this.percent_array[i] + " %";
    }


    // for(let i=0; i<this.category_array.length; i++){
    //     if(!parseInt(this.percent_array[i]))
    //         continue;
    //     this.category_array_new.push(this.category_array[i] + " " + this.percent_array[i] + " %");
    // }
    // for(let i=0; i<this.category_array_new.length; i++){
    //     this.background_color_new.push(this.background_color[i]);
    //     this.border_color_new.push(this.border_color[i]);
    // }
    // console.log(this.amount_array);
  }

  ngOnInit(){
    let ctx = this.abc.nativeElement;
    let myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: this.category_array_new,
        datasets: [{
          label: '# of Votes',
          data: this.amount_array_new,
          backgroundColor: this.background_color_new,
          borderColor: this.border_color_new,
          borderWidth: 0
        }]
      },
      options: {
        segmentShowStroke: false,
        legend: {
              display: true,
              labels: {
                    fontColor: 'white',
                    boxWidth: 10,
                    padding: 2,
              },
              position: 'right'
        },
        elements: {
          center: {
            text: 'Category',
            color: '#36A2EB', //Default black
            fontStyle: 'Helvetica', //Default Arial
            sidePadding: 15 //Default 20 (as a percentage)
          }
        }
      }
    });

  }
}
