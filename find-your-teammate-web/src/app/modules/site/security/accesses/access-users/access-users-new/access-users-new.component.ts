import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AccessService } from '../../access.service';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { CiaUsersAdminProfilesSelectorComponent } from 'src/shared/components/business/users-admin-profiles/users-admin-profiles-selector/cia-users-admin-profiles-selector.component';

@Component({
    selector: 'access-users-new',
    templateUrl: './access-users-new.component.html'
})
export class AccessUsersNewComponent implements OnInit {
    @ViewChild('dialog') dialog: CiaDialogComponent;
    @ViewChild('profileSelector') profileSelector: CiaUsersAdminProfilesSelectorComponent;

    loading: boolean = false;

    userAdmin: any = {
        active: true
    }

    constructor(private router: Router, private accessService: AccessService) { }

    ngOnInit(): void {
    }

    onRegister() {
        if (!this.userAdmin.profileId) {
            return this.dialog.showError('Perfil inválido');
        }
        this.userAdmin.profileName = this.profileSelector.usersAdminProfiles.find(profile => profile.id == this.userAdmin.profileId).text;

        this.loading = true;
        this.accessService.saveUserAdmin(this.userAdmin).subscribe(
            usersAdminProfileId => {
                this.loading = false;
                if (usersAdminProfileId) {
                    this.dialog.showSuccess('Usuário salvo com sucesso');
                    this.router.navigate(['admin/usuarios'])
                }
            }, err => {
                this.loading = false;
                this.dialog.showError(err);
            }
        )
    }

    back() {
        this.router.navigate(['admin/usuarios']);
    }
}
