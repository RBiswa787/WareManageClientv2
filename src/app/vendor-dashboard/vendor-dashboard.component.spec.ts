import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorDashboardComponent } from './vendor-dashboard.component';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('VendorDashboardComponent', () => {
  let component: VendorDashboardComponent;
  let fixture: ComponentFixture<VendorDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VendorDashboardComponent],
      providers: [HttpClient, HttpHandler]
    });
    fixture = TestBed.createComponent(VendorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
