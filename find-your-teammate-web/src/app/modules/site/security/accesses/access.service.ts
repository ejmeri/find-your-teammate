import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable()
export class AccessService {

    constructor(private api: ApiService) { }

    saveUserAdmin(userAdmin: any): Observable<string> {
        if (userAdmin.id) {
            return this.api.put(`/api/users/admin/${userAdmin.id}`, userAdmin);
        }
        return this.api.post(`/api/users/admin`, userAdmin);
    }

    inactiveUserAdmin(userAdminId: string): Observable<boolean> {
        return this.api.put(`/api/users/admin/${userAdminId}/inactive`);
    }

    findResumedUsersAdmin(param: any): Observable<any[]> {
        const params: any = {};

        if (param.name) {
            params.name = param.name;
        }

        if (param.profileId) {
            params.userProfileId = param.profileId;
        }

        if (param.active) {
            params.active = param.active;
        }
        return this.api.get(`/api/users/admin`, params);
    }

    findUserAdmin(userAdminId: string): Observable<any> {
        return this.api.get(`/api/users/admin/${userAdminId}`);
    }

    saveUserAdminProfile(userProfile: any): Observable<string> {
        if (userProfile.id) {
            return this.api.put(`/api/users/profiles/${userProfile.id}/admin`, userProfile);
        }
        return this.api.post(`/api/users/profiles/admin`, userProfile);
    }

    saveUserAdminProfilePermissions(profileId: string, allowProfilePermissions: any): Observable<boolean> {
        return this.api.put(`/api/users/profiles/${profileId}/permissions`, allowProfilePermissions);
    }

    inactiveUserAdminProfile(userProfileId: string): Observable<string> {
        return this.api.put(`/api/users/profiles/${userProfileId}/inactive/admin`);
    }

    findResumedUsersAdminProfiles(param: any): Observable<any[]> {
        const params: any = {};

        if (param.name) {
            params.name = param.name;
        }
        
        if (param.active) {
            params.active = param.active;
        }

        return this.api.get(`/api/users/profiles/admin`, params);
    }

    findUserAdminProfile(profileId: string): Observable<any> {
        return this.api.get(`/api/users/profiles/${profileId}/admin`);
    }

    recoveryPassword(userAdminId: string): Observable<boolean> {
        return this.api.put(`/api/authenticate/${userAdminId}/password/recovery`);
    }

    updatePassword(updatePassword: any): Observable<boolean> {
        return this.api.put(`/api/authenticate/password`, updatePassword);
    }
}
