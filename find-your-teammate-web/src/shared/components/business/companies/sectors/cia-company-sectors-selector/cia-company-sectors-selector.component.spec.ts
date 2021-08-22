import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaCompanySectorsSelectorComponent } from './cia-company-sectors-selector.component';

describe('CiaCompanySectorsSelectorComponent', () => {
  let component: CiaCompanySectorsSelectorComponent;
  let fixture: ComponentFixture<CiaCompanySectorsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaCompanySectorsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaCompanySectorsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
