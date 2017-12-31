import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoTimepickerBasicComponent } from './demo-timepicker-basic.component';

describe('DemoTimepickerBasicComponent', () => {
  let component: DemoTimepickerBasicComponent;
  let fixture: ComponentFixture<DemoTimepickerBasicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemoTimepickerBasicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemoTimepickerBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
