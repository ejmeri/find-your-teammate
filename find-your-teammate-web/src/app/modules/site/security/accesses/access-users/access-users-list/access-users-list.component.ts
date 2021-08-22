import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { FormatHelper } from 'src/shared/formatters/format-helper';
import { AccessService } from '../../access.service';

@Component({
  selector: 'access-users-list',
  templateUrl: './access-users-list.component.html',
})
export class AccessUsersListComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;
  @Output('onEdit') onEdit: EventEmitter<any> = new EventEmitter<any>();

  loading: boolean = false;
  searching: boolean = false;

  params: any = {
    active: 'true',
  };
  usersAdmin: any = [];

  constructor(private accessService: AccessService) {}

  ngOnInit(): void {
    this.findUsersAdmin();
  }

  findUsersAdmin() {
    this.searching = true;
    this.accessService.findResumedUsersAdmin(this.params).subscribe(
      (usersAdmin) => {
        if (usersAdmin) {
          usersAdmin.forEach((usersAdmin) => {
            usersAdmin.formattedCreateDate = FormatHelper.formatDateWithTimezone(usersAdmin.createDate);
          });
          this.usersAdmin = usersAdmin;
        }
        this.searching = false;
      },
      (err) => {
        this.searching = false;
        this.dialog.showError(err);
      }
    );
  }

  inactiveUserAdmin(event: any) {
    this.loading = true;
    this.accessService.inactiveUserAdmin(event.id).subscribe(
      (usersAdminProfiles) => {
        if (usersAdminProfiles) {
          this.dialog.showSuccess('Usuário inativado com sucesso');
          this.findUsersAdmin();
        }
        this.loading = false;
      },
      (err) => {
        this.loading = false;
        this.dialog.showError(err);
      }
    );
  }

  detailsUserAdmin(event: any) {
    this.onEdit.emit(event);
  }

  refresh() {
    this.params = {
      active: 'true',
    };

    this.findUsersAdmin();
  }
}
