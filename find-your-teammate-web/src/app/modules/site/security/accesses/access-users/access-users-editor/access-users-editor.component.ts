import { Component, OnInit, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AccessService } from '../../access.service';
import { CiaUsersAdminProfilesSelectorComponent } from 'src/shared/components/business/users-admin-profiles/users-admin-profiles-selector/cia-users-admin-profiles-selector.component';

@Component({
  selector: 'access-users-editor',
  templateUrl: './access-users-editor.component.html',
})
export class AccessUsersEditorComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  @ViewChild('profileSelector')
  profileSelector: CiaUsersAdminProfilesSelectorComponent;

  loadingResetPassword: boolean = false;
  loading: boolean = false;
  userAdminId: string = '';
  userAdmin: any = {};

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {}

  findUserAdmin() {
    this.loading = true;
    this.accessService.findUserAdmin(this.userAdminId).subscribe(
      (userAdmin) => {
        if (userAdmin) {
          this.userAdmin = userAdmin;
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.dialog.showError(err);
      }
    );
  }

  onRegister() {
    if (!this.userAdmin.profileId) {
      return this.dialog.showError('Perfil inválido');
    }
    this.userAdmin.profileName = this.profileSelector.usersAdminProfiles.find(
      (profile) => profile.id == this.userAdmin.profileId
    ).text;

    this.loading = true;
    this.accessService.saveUserAdmin(this.userAdmin).subscribe(
      (updated) => {
        this.loading = false;
        if (updated) {
          this.dialog.showSuccess('Usuário salvo com sucesso');
        }
      },
      (err) => {
        this.loading = false;
        this.dialog.showError(err);
      }
    );
  }

  recoveryPassword() {
    if (!this.userAdminId) {
      return this.dialog.showError('Usuário inválido');
    }
    this.dialog.confirm('Deseja recuperar a senha do usuário ?').then((result) => {
      if (result.value) {
        this.loading = true;
        this.accessService.recoveryPassword(this.userAdminId).subscribe(
          (response) => {
            this.loading = false;
            if (response) {
              this.dialog.showSuccess('Senha recuperada com sucesso.');
            }
          },
          (err) => {
            this.loading = false;
            this.dialog.showError(err);
          }
        );
      }
    });
  }

  clear() {
    this.userAdminId = '';
    this.userAdmin = {};
  }
}
