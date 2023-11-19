import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinSkuComponent } from './checkin-sku.component';

describe('CheckinSkuComponent', () => {
  let component: CheckinSkuComponent;
  let fixture: ComponentFixture<CheckinSkuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckinSkuComponent]
    });
    fixture = TestBed.createComponent(CheckinSkuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
