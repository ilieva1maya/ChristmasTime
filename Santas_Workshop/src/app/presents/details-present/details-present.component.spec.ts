import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsPresentComponent } from './details-present.component';

describe('DetailsPresentComponent', () => {
  let component: DetailsPresentComponent;
  let fixture: ComponentFixture<DetailsPresentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPresentComponent]
    });
    fixture = TestBed.createComponent(DetailsPresentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
