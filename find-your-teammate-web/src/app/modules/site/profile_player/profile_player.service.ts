import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilePlayerService {

  constructor(private api: ApiService) { }


  findProfilePlayer(): Observable<any> {
    return this.api.get('/players/info');
  }

  updateProfilePlayer(profile: any): Observable<any> {
    return this.api.put('/players', profile);
  }
}