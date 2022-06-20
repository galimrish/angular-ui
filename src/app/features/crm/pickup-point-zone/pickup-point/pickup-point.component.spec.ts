import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupPointComponent } from './pickup-point.component';

describe('PickupPointComponent', () => {
  let component: PickupPointComponent;
  let fixture: ComponentFixture<PickupPointComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupPointComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupPointComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
