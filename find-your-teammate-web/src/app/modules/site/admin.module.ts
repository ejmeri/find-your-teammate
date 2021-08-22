import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from 'src/shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { HomeComponent } from './home/home.component';
import { AccessProfileEditorComponent } from './security/accesses/access-profile/access-profile-editor/access-profile-editor.component';
import { AccessProfileListComponent } from './security/accesses/access-profile/access-profile-list/access-profile-list.component';
import { AccessProfileNewComponent } from './security/accesses/access-profile/access-profile-new/access-profile-new.component';
import { AccessProfileComponent } from './security/accesses/access-profile/access-profile.component';
import { AccessUsersEditorComponent } from './security/accesses/access-users/access-users-editor/access-users-editor.component';
import { AccessUsersListComponent } from './security/accesses/access-users/access-users-list/access-users-list.component';
import { AccessUsersNewComponent } from './security/accesses/access-users/access-users-new/access-users-new.component';
import { AccessUsersComponent } from './security/accesses/access-users/access-users.component';
import { AccessService } from './security/accesses/access.service';
import { AccessesComponent } from './security/accesses/accesses.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';

@NgModule({
  declarations: [
    HomeComponent,
    AccessesComponent,
    AccessProfileComponent,
    AccessProfileListComponent,
    AccessProfileEditorComponent,
    AccessProfileNewComponent,
    AccessUsersComponent,
    AccessUsersNewComponent,
    AccessUsersListComponent,
    AccessUsersEditorComponent,
    ChangePasswordComponent,
  ],
  imports: [
    SharedModule.forRoot(),
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    AdminRoutingModule,
  ],
  exports: [RouterModule],
  providers: [
    AccessService,
    [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {}
