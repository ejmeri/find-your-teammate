import { Component, OnInit, ViewChild, ViewRef } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { AccessUsersListComponent } from './access-users-list/access-users-list.component';
import { AccessUsersEditorComponent } from './access-users-editor/access-users-editor.component';

@Component({
    selector: 'access-users',
    templateUrl: './access-users.component.html'
})
export class AccessUsersComponent implements OnInit {
    @ViewChild('matTab') tabs: MatTabGroup;
    @ViewChild('list') list: AccessUsersListComponent;
    @ViewChild('editor') editor: AccessUsersEditorComponent;
    isEditing: boolean;

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    selectedTab(event: any) {
        switch (event.index) {
            case 0:
                this.refresh();
                break;
            default:
                break;
        }
    }

    refresh() {
        this.isEditing = false;
        this.list.findUsersAdmin();
        this.editor.clear();
    }

    detailsUserAdmin(event: any) {
        this.isEditing = true;
        this.editor.userAdminId = event.id;
        this.editor.findUserAdmin();
        this.tabs.selectedIndex = 1;
    }

    newUserAdmin() {
        this.router.navigate(['/admin/novousuario']);
    }

}
