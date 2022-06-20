import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonEditComponent } from './button-edit.component';

describe('ButtonEditComponent', () => {
  let component: ButtonEditComponent;
  let fixture: ComponentFixture<ButtonEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ButtonEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ButtonEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
