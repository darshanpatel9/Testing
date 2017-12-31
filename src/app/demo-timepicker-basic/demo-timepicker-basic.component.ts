import { Component } from '@angular/core';

@Component({
  selector: 'demo-timepicker-basic',
  templateUrl: './demo-timepicker-basic.component.html'
})
export class DemoTimepickerBasicComponent {
  public mytime: Date = new Date();
}
