import { EventEmitter, Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Profile } from './profile';

const STG_KEY = 'USR-DT';
const TKN_KEY = 'USR-TK';

@Injectable()
export class AuthStore {

    private _loggedUser: Profile;

    private userAuthenticated = false;
    private authenticationEmitter = new EventEmitter<boolean>();

    constructor() {
        this.tryLoadProfileFromStorage();
    }

    get loggedUser(): Profile {
        if (this._loggedUser == null) {
            this.tryLoadProfileFromStorage();
        }
        return this._loggedUser;
    }

    public isExpired(jwt: any) {
        return false; // new Date().getTime() > jwt.exp * 1000;
    }

    createSession(token: string): boolean {
        let jwt = null;
        try {
            jwt = jwt_decode(token);
            if (jwt == null || this.isExpired(jwt)) {
                this.logoff();
                return false;
            }
        } catch (error) {
            console.log(error);
            this.logoff();
            return false;
        }
        this._loggedUser = new Profile(token, jwt);
        this.storeProfile();
        this.userAuthenticated = true;
        return this.userAuthenticated;
    }

    private storeProfile() {
        this.authenticationEmitter.emit(this.userAuthenticated);
        sessionStorage.setItem(STG_KEY, JSON.stringify(this._loggedUser));
        sessionStorage.setItem(TKN_KEY, this._loggedUser.token);
    }

    private tryLoadProfileFromStorage() {
        const token = sessionStorage.getItem(TKN_KEY);
        const user = sessionStorage.getItem(STG_KEY);
        if (token) {
            this.createSession(token);
        }
        if (user && this._loggedUser) {
            // let rawUser = JSON.parse(user);
            // this._loggedUser.acl = rawUser._acl;
            this.updateSession();
        }
    }

    public updateSession() {
        this.storeProfile();
    }

    public isUserAuthenticated() {
        return this.userAuthenticated;
    }

    public getToken(): string {
        return this._loggedUser.token;
    }

    set acl(acl: any) {
        this._loggedUser.acl = acl;
    }

    public logoff() {
        this.userAuthenticated = false;
        this.authenticationEmitter.emit(false);
        sessionStorage.clear();
    }

}