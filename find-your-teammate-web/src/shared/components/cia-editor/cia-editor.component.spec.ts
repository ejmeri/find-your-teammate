import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CiaEditorComponent } from './cia-editor.component';

describe('CiaEditorComponent', () => {
  let component: CiaEditorComponent;
  let fixture: ComponentFixture<CiaEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CiaEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CiaEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
