import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/core/api/api.service';

@Injectable({
  providedIn: 'root',
})
export class TeachersService {
  constructor(private api: ApiService) {}

  findTeachers(): Observable<any[]> {
    return this.api.get(`/api/teachers`, { active: true });
  }
}
