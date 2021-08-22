import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/shared/shared.module';
import { CoreModule } from '../core/core.module';
import { SiteRoutingModule } from './site-rounting.module';

@NgModule({
  imports: [CoreModule, SharedModule, SiteRoutingModule],
  declarations: [],
  exports: [RouterModule],
})
export class SiteModule {}
