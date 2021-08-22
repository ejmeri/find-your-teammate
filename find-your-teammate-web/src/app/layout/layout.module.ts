import { NgModule } from "@angular/core";
import { LayoutComponent } from './layout.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { PageLoaderComponent } from './page-loader/page-loader.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    RightSidebarComponent,
    PageLoaderComponent
  ],
  exports: [
    LayoutComponent,
    SidebarComponent,
    HeaderComponent,
    RightSidebarComponent,
    PageLoaderComponent
  ],
  providers: [
    // MenuController
    // RightSidebarService
  ]
})
export class LayoutModule { 
  // constructor(menuCtrl: MenuController) {
  //   menuCtrl.reloadMenu();
  // }
}
