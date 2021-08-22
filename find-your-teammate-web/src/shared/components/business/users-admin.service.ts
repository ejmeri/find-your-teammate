import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable()
export class UsersAdminService {

  constructor(private api: ApiService) { }


  findUsersAdminProfiles(): Observable<any[]> {
    return this.api.get(`/api/users/profiles/admin`, { active: true });
  }
}
