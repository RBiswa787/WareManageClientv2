import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCompVendorComponent } from './chart-comp-vendor.component';

describe('ChartCompVendorComponent', () => {
  let component: ChartCompVendorComponent;
  let fixture: ComponentFixture<ChartCompVendorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCompVendorComponent]
    });
    fixture = TestBed.createComponent(ChartCompVendorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
