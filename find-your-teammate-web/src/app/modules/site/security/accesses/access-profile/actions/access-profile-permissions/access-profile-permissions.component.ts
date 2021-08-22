import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CiaDialogComponent } from 'src/shared/components/cia-dialog/cia-dialog.component';
import { AccessService } from '../../../access.service';
import { AllowPermissions } from '../../allow-permissions';
import { ProfilePermissions } from '../../profile-permissions';

@Component({
  selector: 'access-profile-permissions',
  templateUrl: './access-profile-permissions.component.html',
  styleUrls: ['../../access-profile-new.component.css']
})
export class AccessProfilePermissionsComponent implements OnInit {
  @ViewChild('dialog') dialog: CiaDialogComponent;

  @Input()
  allowPermissions = new AllowPermissions();
  
  @Input()
  profilePermissions = new ProfilePermissions();

  loadingPermissions: boolean;

  @Input()
  userAdminProfileId: string;


  constructor(private accessService: AccessService) { }

  ngOnInit(): void {
  }

  onRegisterPermissions() {
    this.loadingPermissions = true;
    this.accessService.saveUserAdminProfilePermissions(this.userAdminProfileId, this.allowPermissions).subscribe(
      response => {
        this.loadingPermissions = false;
        if (response) {
          this.dialog.showSuccess('Permissões salvas com sucesso');
        }
      }, err => {
        this.loadingPermissions = false;
        this.dialog.showError(err);
      }
    )
  }


  drop(event: CdkDragDrop<string[]>) {
    if (!event.container.data) {
      event.container.data = [];
    }

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
