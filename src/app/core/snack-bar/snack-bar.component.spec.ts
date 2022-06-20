import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { AppSnackBarComponent } from './snack-bar.component';

describe('SnackBarComponent', () => {
  let component: AppSnackBarComponent;
  let fixture: ComponentFixture<AppSnackBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MatSnackBarModule ],
      declarations: [ AppSnackBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSnackBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
