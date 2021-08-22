import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AccessProfileNewComponent } from './security/accesses/access-profile/access-profile-new/access-profile-new.component';
import { AccessProfileComponent } from './security/accesses/access-profile/access-profile.component';
import { AccessUsersNewComponent } from './security/accesses/access-users/access-users-new/access-users-new.component';
import { AccessUsersComponent } from './security/accesses/access-users/access-users.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'perfis', component: AccessProfileComponent },
  { path: 'novoperfil', component: AccessProfileNewComponent },
  { path: 'novousuario', component: AccessUsersNewComponent },
  { path: 'usuarios', component: AccessUsersComponent },
  { path: 'alterar-senha', component: ChangePasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
