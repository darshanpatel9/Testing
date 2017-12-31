import { Component } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'datepicker-demo',
  templateUrl: './datepicker-demo.component.html'
})
export class DatepickerDemoComponent {
  public dt: Date = new Date();
  public formats: string[] = ['DD-MM-YYYY', 'YYYY/MM/DD', 'DD.MM.YYYY',
    'shortDate'];
  public format: string = this.formats[0];
  public dateOptions: any = {
    formatYear: 'YY',
    startingDay: 1
  };

  public constructor() { }

  public getDate(): number {
    return this.dt && this.dt.getTime() || new Date().getTime();
  }
}
