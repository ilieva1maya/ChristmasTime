import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservePresentComponent } from './reserve-present.component';

describe('ReservePresentComponent', () => {
  let component: ReservePresentComponent;
  let fixture: ComponentFixture<ReservePresentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservePresentComponent]
    });
    fixture = TestBed.createComponent(ReservePresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
