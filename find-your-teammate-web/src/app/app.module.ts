import { AgmCoreModule } from '@agm/core';
import { NgxMatDatetimePickerModule, NgxMatNativeDateModule } from '@angular-material-components/datetime-picker';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { SharedModule } from 'src/shared/shared.module';
import { AppComponent } from './app.component';
import { CalendarService } from './apps/calendar/calendar.service';
import { Interceptor } from './core/auth/token.interceptor';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SiteModule } from './modules/site.module';
import { RightSidebarService } from './services/rightsidebar.service';
import { environment } from '../environments/environment';
import { NgxTinymceModule } from 'ngx-tinymce';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    LayoutModule,
    SharedModule.forRoot(),
    SiteModule,
    NgbModule,
    MatSnackBarModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR API KEY',
    }),
  ],
  providers: [
    Location,
    { provide: 'deploy-config', useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: Interceptor, multi: true },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG },
    RightSidebarService,
    CalendarService,
  ],
  entryComponents: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
