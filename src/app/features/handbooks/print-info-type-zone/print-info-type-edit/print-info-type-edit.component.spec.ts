import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NomenclatureEditComponent } from '../../nomenclature-zone/nomenclature-edit/nomenclature-edit.component';


describe('NomenclatureEditComponent', () => {
  let component: NomenclatureEditComponent;
  let fixture: ComponentFixture<NomenclatureEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomenclatureEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatureEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
