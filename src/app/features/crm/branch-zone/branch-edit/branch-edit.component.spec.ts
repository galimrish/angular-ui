import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchEditComponent } from './branch-edit.component';

describe('BranchEditComponent', () => {
  let component: BranchEditComponent;
  let fixture: ComponentFixture<BranchEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
