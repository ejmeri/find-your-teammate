import { CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule } from '@angular/router';
import { CustomFormsModule } from 'ngx-custom-validators';
import { SharedModule } from 'src/shared/shared.module';
import { SiteRoutingModule } from './site-routing.module';

import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { AccessService } from './security/accesses/access.service';
import { ProfileComponent } from './profile_player/profile_player.component';
import { ProfilePlayerService } from './profile_player/profile_player.service';
import { VisitPlayerComponent } from './visit-player/visit-player.component';

@NgModule({
  declarations: [
    HomeComponent,
    ChangePasswordComponent,
    ProfileComponent,
    VisitPlayerComponent,
  ],
  imports: [
    SharedModule,
    FormsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    SiteRoutingModule,
  ],
  exports: [RouterModule],
  providers: [
    AccessService,
    ProfilePlayerService,
    [{ provide: LOCALE_ID, useValue: 'pt-BR' }],
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SiteModule {}
