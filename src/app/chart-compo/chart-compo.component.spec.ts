import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartCompoComponent } from './chart-compo.component';

describe('ChartCompoComponent', () => {
  let component: ChartCompoComponent;
  let fixture: ComponentFixture<ChartCompoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChartCompoComponent]
    });
    fixture = TestBed.createComponent(ChartCompoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
