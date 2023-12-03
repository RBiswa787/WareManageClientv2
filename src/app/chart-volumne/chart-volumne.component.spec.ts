import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVolumneComponent } from './chart-volumne.component';

describe('ChartVolumneComponent', () => {
  let component: ChartVolumneComponent;
  let fixture: ComponentFixture<ChartVolumneComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartVolumneComponent]
    });
    fixture = TestBed.createComponent(ChartVolumneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
