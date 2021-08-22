import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AccessService } from '../../access.service';
import { ProfilePermissions } from '../profile-permissions';
import { AllowPermissions } from '../allow-permissions';

@Component({
  selector: 'access-profile-editor',
  templateUrl: './access-profile-editor.component.html',
  styleUrls: ['../access-profile-new.component.css']
})
export class AccessProfileEditorComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;

  loading: boolean = false;
  loadingPermissions: boolean = false;

  userAdminProfileId: any;
  userAdminProfile: any = {};
  allowPermissions = new AllowPermissions();
  profilePermissions = new ProfilePermissions();

  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
  }

  findUserAdminProfile() {
    this.loading = true;
    this.accessService.findUserAdminProfile(this.userAdminProfileId).subscribe(
      userAdminProfile => {
        if (userAdminProfile) {
          this.userAdminProfile = userAdminProfile;
          if (this.userAdminProfile.permissions) {
            this.allowPermissions = AllowPermissions.createFromAcl(this.userAdminProfile.permissions);
          }
          this.profilePermissions.removes(this.allowPermissions);
        }
        this.loading = false;
      }, err => {
        this.loading = false;
        this.dialog.showError(err);
      }
    )
  }

  onRegister() {
    this.loading = true;
    this.accessService.saveUserAdminProfile(this.userAdminProfile).subscribe(
      updated => {
        this.loading = false;
        if (updated) {
          this.dialog.showSuccess('Perfil salvo com sucesso');
        }
      }, err => {
        this.loading = false;
        this.dialog.showError(err);
      }
    )
  }

  clear() {
    this.userAdminProfile = {};
    this.userAdminProfileId = '';
    this.allowPermissions = new AllowPermissions();
    this.profilePermissions = new ProfilePermissions();
  }
}
