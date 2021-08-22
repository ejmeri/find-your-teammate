import { Injectable } from '@angular/core';
import { Route, CanLoad, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthStore } from './auth.store';


@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
    constructor(private _router: Router, private authStore: AuthStore) { }

    canLoad(route: Route): boolean | Observable<boolean> {
        return this.isAuthenticated();
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        return this.isAuthenticated();
    }

    private isAuthenticated(): boolean {
        if (this.authStore.isUserAuthenticated()) {
            return true;
        }
        this._router.navigate(['/login']);
        return false;
    }
}
