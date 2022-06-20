import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NomenclatureComponent } from './nomenclature.component';

describe('NomenclatureComponent', () => {
  let component: NomenclatureComponent;
  let fixture: ComponentFixture<NomenclatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NomenclatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NomenclatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
