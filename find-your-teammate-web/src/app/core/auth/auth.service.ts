import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../api/api.service';
import { AuthStore } from './auth.store';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private api: ApiService, private authStore: AuthStore) {}

  forgotPassword(recovery: any): Observable<any> {
    return this.api.post('/api/authenticate/password/forget', recovery);
  }

  authenticate(user: any): Observable<boolean> {
    this.authStore.logoff();

    return this.api.postWithoutToken('/authentication', user).pipe(
      switchMap((response) => {
        if (!response) {
          throw 'Erro ao autenticar usuário, contate o administrador do sistema.';
        }

        if (response.message) {
          throw response.message;
        }

        return this.createSession(response);
      })
    );
  }

  new(user: any): Observable<any> {
    return this.api.postWithoutToken('/users/new', user)
  }

  private createSession(response: any): Observable<boolean> {
    if (this.authStore.createSession(response.response)) {
      return of(this.authStore.isUserAuthenticated())
    }

    return of(false);
  }
}
