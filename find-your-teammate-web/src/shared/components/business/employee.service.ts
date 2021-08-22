import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private api: ApiService) { }

  findRoles(active: string): Observable<any[]> {
    
    // TODO - Adicionar filtros no back e no server
    const params: any = {};

    if (active) {
      params.active = active;
    }

    return this.api.get(`/api/employeeroles`, params);
  }

}