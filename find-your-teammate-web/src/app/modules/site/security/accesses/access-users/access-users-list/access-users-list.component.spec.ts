import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessUsersListComponent } from './access-users-list.component';

describe('AccessUsersListComponent', () => {
  let component: AccessUsersListComponent;
  let fixture: ComponentFixture<AccessUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessUsersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
