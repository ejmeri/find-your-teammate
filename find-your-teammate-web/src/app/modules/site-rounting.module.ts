import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/auth/auth.guard';
import { LayoutComponent } from '../layout/layout.component';

const routes: Routes = [
  {
    path: 'apps',
    loadChildren: () => import('../apps/apps-routing.module').then((m) => m.AppsRoutingModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./authentication/authentication.module').then((m) => m.AuthenticationModule),
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: './site/site.module#SiteModule',
    canActivate: [AuthGuard],
    canLoad: [AuthGuard],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class SiteRoutingModule {}
