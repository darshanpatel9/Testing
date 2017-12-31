import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoughnutChartDemoComponent } from './doughnut-chart-demo.component';

describe('DoughnutChartDemoComponent', () => {
  let component: DoughnutChartDemoComponent;
  let fixture: ComponentFixture<DoughnutChartDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoughnutChartDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoughnutChartDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
