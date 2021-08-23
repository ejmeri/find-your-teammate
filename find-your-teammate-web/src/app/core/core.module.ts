import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from '../core/api/api.service';
import { throwIfAlreadyLoaded } from './module-import-guard';
import { AuthGuard } from './auth/auth.guard';
import { AuthStore } from './auth/auth.store';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [CommonModule, HttpClientModule],
  providers: [AuthGuard, AuthStore, AuthService, ApiService],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
