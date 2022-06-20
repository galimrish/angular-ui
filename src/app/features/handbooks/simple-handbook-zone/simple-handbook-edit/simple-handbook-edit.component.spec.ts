import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHandbookEditComponent } from './simple-handbook-edit.component';

describe('SimpleHandbookEditComponent', () => {
  let component: SimpleHandbookEditComponent;
  let fixture: ComponentFixture<SimpleHandbookEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleHandbookEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleHandbookEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
