import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable()
export class AccessService {
  constructor(private api: ApiService) {}

  recoveryPassword(userAdminId: string): Observable<boolean> {
    return this.api.put(`/api/authenticate/${userAdminId}/password/recovery`);
  }

  updatePassword(updatePassword: any): Observable<boolean> {
    return this.api.put(`/api/authenticate/password`, updatePassword);
  }
}
