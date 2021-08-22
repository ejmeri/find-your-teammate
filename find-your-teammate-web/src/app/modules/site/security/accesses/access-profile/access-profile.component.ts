import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatTabGroup, MatTab } from '@angular/material/tabs';
import { AccessProfileListComponent } from './access-profile-list/access-profile-list.component';
import { AccessProfileEditorComponent } from './access-profile-editor/access-profile-editor.component';

@Component({
    selector: 'access-profile',
    templateUrl: './access-profile.component.html'
})
export class AccessProfileComponent implements OnInit {
    @ViewChild('matTab') tabs: MatTabGroup;
    @ViewChild('list') list: AccessProfileListComponent;
    @ViewChild('editor') editor: AccessProfileEditorComponent;
    isEditing: boolean;
    loading: boolean = false;

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
        this.editor.clear();
        this.list.findUsersAdminProfile();
    }

    detailsUserAdminProfile(event: any) {
        this.isEditing = true;
        this.editor.userAdminProfileId = event.id;
        this.editor.findUserAdminProfile();
        this.tabs.selectedIndex = 1;
    }

    newProfile() {
        this.router.navigate(['/admin/novoperfil']);
    }
}
