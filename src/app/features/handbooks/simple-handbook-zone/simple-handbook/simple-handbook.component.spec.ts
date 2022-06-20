import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleHandbookComponent } from './simple-handbook.component';

describe('SimpleHandbookComponent', () => {
  let component: SimpleHandbookComponent;
  let fixture: ComponentFixture<SimpleHandbookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleHandbookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleHandbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
