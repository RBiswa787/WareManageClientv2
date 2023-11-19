import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckinLocComponent } from './checkin-loc.component';

describe('CheckinLocComponent', () => {
  let component: CheckinLocComponent;
  let fixture: ComponentFixture<CheckinLocComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckinLocComponent]
    });
    fixture = TestBed.createComponent(CheckinLocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
