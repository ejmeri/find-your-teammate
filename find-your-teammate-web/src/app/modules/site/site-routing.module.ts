import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './security/change-password/change-password.component';
import { ProfileComponent } from './profile_player/profile_player.component';
import { VisitPlayerComponent } from './visit-player/visit-player.component';

export const ADMIN_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'profile/:id', component: VisitPlayerComponent },
  { path: 'alterar-senha', component: ChangePasswordComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(ADMIN_ROUTES)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
