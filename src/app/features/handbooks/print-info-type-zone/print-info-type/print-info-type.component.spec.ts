import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PrintInfoTypeComponent } from './print-info-type.component';


describe('PrintInfoTypeComponent', () => {
  let component: PrintInfoTypeComponent;
  let fixture: ComponentFixture<PrintInfoTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintInfoTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintInfoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
