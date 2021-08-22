import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AccessService } from '../../access.service';
import { ProfilePermissions } from '../profile-permissions';
import { AllowPermissions } from '../allow-permissions';

@Component({
  selector: 'access-profile-new',
  templateUrl: './access-profile-new.component.html',
  styleUrls: ['../access-profile-new.component.css']
})
export class AccessProfileNewComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;

  loading: boolean = false;
  loadingPermissions: boolean = false;

  allowPermissions = new AllowPermissions();
  profilePermissions = new ProfilePermissions();

  userAdminProfileId: string;
  userAdminProfile: any = {
    active: true
  };

  constructor(private router: Router, private accessService: AccessService) { }

  ngOnInit(): void {
  }

  get hasUserAdminProfile() {
    return this.userAdminProfileId;
  }

  onRegister() {
    this.loading = true;
    this.accessService.saveUserAdminProfile(this.userAdminProfile).subscribe(
      userAdminProfileId => {
        this.loading = false;
        if (userAdminProfileId) {
          this.userAdminProfileId = userAdminProfileId;
        }
      }, err => {
        this.loading = false;
        this.dialog.showError(err);
      }
    )
  }

  onRegisterPermissions() {
    this.loadingPermissions = true;
    this.accessService.saveUserAdminProfilePermissions(this.userAdminProfileId, this.allowPermissions).subscribe(
      usersAdminProfileId => {
        this.loadingPermissions = false;
        if (usersAdminProfileId) {
          this.dialog.showSuccess('Perfil salvo com sucesso');
          this.router.navigate(['admin/perfis'])
        }
      }, err => {
        this.loadingPermissions = false;
        this.dialog.showError(err);
      }
    )
  }

  back() {
    this.router.navigate(['admin/perfis']);
  }

}
