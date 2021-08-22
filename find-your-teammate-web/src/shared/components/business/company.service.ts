import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private api: ApiService) {}

  findAllCompanies(): Observable<any[]> {
    return this.api.get(`/api/companies/search/all`, { active: true });
  }

  findCompanyPlannings(companyId: string): Observable<any[]> {
    return this.api.get(`/api/companies/${companyId}/plannings`);
  }

  findSegments(active: string): Observable<any[]> {
    let params: any = {};

    if (active) {
      params.active = active;
    }

    return this.api.get(`/api/segments`, params);
  }

  findCompanySectors(companyId: string): Observable<any[]> {
    return this.api.get(`/api/companies/${companyId}/sectors`);
  }

  findSectors(active: Boolean): Observable<any[]> {
    return this.api.get(`/api/sectors`, { active });
  }

  findDepartments(parameters: any): Observable<any[]> {
    const params: any = {};

    if (parameters.sectorId) {
      params.sectorId = parameters.sectorId;
    }

    if (parameters.active) {
      params.active = parameters.active;
    }

    return this.api.get(`/api/departments`, params);
  }
}
