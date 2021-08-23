import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/api/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProfilePlayerService {


  constructor(private api: ApiService) { }


  findProfilePlayer(): Observable<any> {
    return this.api.get('/players/info');
  }

  findPersonalStats(_id: any, steamUserId: any): Observable<any> {
    return this.api.get(`/players/${_id}/stats/${steamUserId}/personal`)
  }

  findGunsStats(_id: any, steamUserId: any): Observable<any> {
    return this.api.get(`/players/${_id}/stats/${steamUserId}/weapons`)
  }

  findMapsStats(_id: any, steamUserId: any): Observable<any> {
    return this.api.get(`/players/${_id}/stats/${steamUserId}/maps`)
  }

  findPlayers(params: any): Observable<any> {
    return this.api.get('/players/search', params);
  }

  updateProfilePlayer(profile: any): Observable<any> {
    return this.api.put('/players', profile);
  }
}