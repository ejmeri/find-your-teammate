import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUsersEditorComponent } from './access-users-editor.component';

describe('AccessUsersEditorComponent', () => {
  let component: AccessUsersEditorComponent;
  let fixture: ComponentFixture<AccessUsersEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessUsersEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessUsersEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
