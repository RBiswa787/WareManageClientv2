import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImDashboardComponent } from './im-dashboard.component';

describe('ImDashboardComponent', () => {
  let component: ImDashboardComponent;
  let fixture: ComponentFixture<ImDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImDashboardComponent]
    });
    fixture = TestBed.createComponent(ImDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
