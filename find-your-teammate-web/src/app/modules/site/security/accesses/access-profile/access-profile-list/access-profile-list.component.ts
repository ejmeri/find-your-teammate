import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { FormatHelper } from 'src/shared/formatters/format-helper';
import { AccessService } from '../../access.service';

@Component({
  selector: 'access-profile-list',
  templateUrl: './access-profile-list.component.html',
})
export class AccessProfileListComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  @Output('onEdit') onEdit: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean = false;
  searching: boolean = false;

  params: any = {
    active: 'true',
  };
  usersAdminProfiles: any = [];

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {
    this.findUsersAdminProfile();
  }

  findUsersAdminProfile() {
    this.searching = true;
    this.accessService.findResumedUsersAdminProfiles(this.params).subscribe(
      (usersAdminProfiles) => {
        if (usersAdminProfiles) {
          usersAdminProfiles.forEach((usersAdminProfile) => {
            usersAdminProfile.formattedCreateDate = FormatHelper.formatDateWithTimezone(usersAdminProfile.createDate);
          });
          this.usersAdminProfiles = usersAdminProfiles;
        }
        this.searching = false;
      },
      (err) => {
        this.searching = false;
        this.dialog.showError(err);
      }
    );
  }

  inactiveUserAdminProfile(event: any) {
    this.loading = true;
    this.accessService.inactiveUserAdminProfile(event.id).subscribe(
      (usersAdminProfiles) => {
        if (usersAdminProfiles) {
          this.dialog.showSuccess('Perfil inativado com sucesso');
          this.findUsersAdminProfile();
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.dialog.showError(err);
      }
    );
  }

  detailsUserAdminProfile(event: any) {
    this.onEdit.emit(event);
  }

  refresh() {
    this.params = {
      active: 'true',
    };

    this.findUsersAdminProfile();
  }
}
