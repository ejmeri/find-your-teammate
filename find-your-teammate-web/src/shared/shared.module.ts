import {
  NgxMatDatetimePickerModule,
  NgxMatNativeDateModule,
  NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DateAdapter, MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatVideoModule } from 'mat-video';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { ChartsModule as chartjsModule } from 'ng2-charts';
import { FileUploadModule } from 'ng2-file-upload';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxMaskModule } from 'ngx-mask';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DynamicScriptLoaderService } from '../app/services/dynamic-script-loader.service';
import { CiaSelectMonthsComponent } from './components/business/cia-select-months/cia-select-months.component';
import { CiaCompaniesSelectorComponent } from './components/business/companies/companies-selector/cia-companies-selector.component';
import { CiaDepartmentsSectorSelectorComponent } from './components/business/companies/departments/cia-departments-sector-selector/cia-departments-sector-selector.component';
import { CiaPlanningsSelectorComponent } from './components/business/companies/plannings/cia-plannings-selector/cia-plannings-selector.component';
import { CiaCompanySectorsSelectorComponent } from './components/business/companies/sectors/cia-company-sectors-selector/cia-company-sectors-selector.component';
import { CiaSectorsSelectorComponent } from './components/business/companies/sectors/cia-sectors-selector/cia-sectors-selector.component';
import { CiaTeachersSelectorComponent } from './components/business/companies/teachers/cia-teachers-selector/cia-teachers-selector.component';
import { CompanyService } from './components/business/company.service';
import { EmployeeService } from './components/business/employee.service';
import { CiaEmployeesRolesSelectorComponent } from './components/business/employees-roles/cia-employees-roles-selector/cia-employees-roles-selector.component';
import { CiaSegmentsSelectorComponent } from './components/business/segments/cia-segments-selector/cia-segments-selector.component';
import { TeachersService } from './components/business/teachers.service';
import { CiaUsersAdminProfilesSelectorComponent } from './components/business/users-admin-profiles/users-admin-profiles-selector/cia-users-admin-profiles-selector.component';
import { UsersAdminService } from './components/business/users-admin.service';
import { CiaCardComponent } from './components/cia-card/cia-card.component';
import { CiaDialogComponent } from './components/cia-dialog/cia-dialog.component';
import { CiaEditorComponent } from './components/cia-editor/cia-editor.component';
import { CiaExpansionPanelComponent } from './components/cia-expansion-panel/cia-expansion-panel.component';
import { CiaFileUploadComponent } from './components/cia-file-upload/cia-file-upload.component';
import { CiaFormColComponent } from './components/cia-form-col/cia-form-col.component';
import { CiaFormRowComponent } from './components/cia-form-row/cia-form-row.component';
import { CiaGridComponent } from './components/cia-grid/cia-grid.component';
import { CiaMenublockItemComponent } from './components/cia-menublock-item/cia-menublock-item.component';
import { CiaModalComponent } from './components/cia-modal/cia-modal.component';
import { CiaSelectComponent } from './components/cia-select/cia-select.component';
import { CiaSpinnerButtonComponent } from './components/cia-spinner-button/cia-spinner-button.component';
import { CiaSpinnerComponent } from './components/cia-spinner/cia-spinner.component';
import { CiaSwitchComponent } from './components/cia-switch/cia-switch.component';
import { CiaUploaderImageComponent } from './components/cia-uploader-image/cia-uploader-image.component';
import { MomentUtcDateAdapter } from './helpers/moment-utc-date-adapter';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { NgxTinymceModule } from 'ngx-tinymce';


const COMPONENTS = [
  CiaCardComponent,
  CiaDialogComponent,
  CiaFormRowComponent,
  CiaFormColComponent,
  CiaMenublockItemComponent,
  CiaGridComponent,
  CiaSwitchComponent,
  CiaSpinnerButtonComponent,
  CiaSelectComponent,
  CiaSpinnerComponent,
  CiaModalComponent,
  CiaSectorsSelectorComponent,
  CiaSegmentsSelectorComponent,
  CiaDepartmentsSectorSelectorComponent,
  CiaCompanySectorsSelectorComponent,
  CiaEmployeesRolesSelectorComponent,
  CiaExpansionPanelComponent,
  CiaUsersAdminProfilesSelectorComponent,
  CiaFileUploadComponent,
  CiaSelectMonthsComponent,
  CiaTeachersSelectorComponent,
  CiaPlanningsSelectorComponent,
  CiaCompaniesSelectorComponent,
  CiaEditorComponent,
  CiaUploaderImageComponent,
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    AngularEditorModule,
    CommonModule,
    NgbModule,
    NgSelectModule,
    chartjsModule,
    NgxEchartsModule,
    FullCalendarModule,
    NgApexchartsModule,
    FormsModule,
    NgxMaskModule.forRoot(),
    NgxTinymceModule.forRoot({
      baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/',
    }),
    ReactiveFormsModule,
    MatExpansionModule,
    MatCardModule,
    MatTabsModule,
    MatTableModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatListModule,
    MatSlideToggleModule,
    PerfectScrollbarModule,
    MatSidenavModule,
    MatMenuModule,
    MatSelectModule,
    MatInputModule,
    MatDialogModule,
    // MatRadioButton,
    DragDropModule,
    FileUploadModule,
    LazyLoadImageModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule.setLocale('pt-br'),
    CKEditorModule,
    // BrowserAnimationsModule,
    MatVideoModule,
  ],
  exports: [
    ...COMPONENTS,
    AngularEditorModule,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatExpansionModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    NgbModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSlideToggleModule,
    PerfectScrollbarModule,
    MatInputModule,
    MatListModule,
    chartjsModule,
    NgxEchartsModule,
    FullCalendarModule,
    NgApexchartsModule,
    MatTabsModule,
    MatTableModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    NgxMaskModule,
    NgxTinymceModule,
    DragDropModule,
    LazyLoadImageModule,
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
    NgxMaterialTimepickerModule,
    MatRadioModule,
    CKEditorModule,
    MatProgressBarModule,
    // BrowserAnimationsModule,
    MatVideoModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    CompanyService,
    EmployeeService,
    TeachersService,
    UsersAdminService,
    DynamicScriptLoaderService,
    { provide: MAT_DATE_LOCALE, useValue: 'pt-br' },
    { provide: MAT_DATE_FORMATS, useValue: MAT_MOMENT_DATE_FORMATS },
    { provide: DateAdapter, useClass: MomentUtcDateAdapter },
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
    };
  }
}
