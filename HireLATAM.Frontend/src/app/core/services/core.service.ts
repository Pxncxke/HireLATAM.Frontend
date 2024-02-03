import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(private http: HttpClient) { }

  get(endpoint: string): Observable<any>{
    return this.http.get<any>(`${environment.apiBaseUrl}/${endpoint}`);
  }

  post(endpoint:string, dto:any): Observable<void>{
    return this.http.post<void>(`${environment.apiBaseUrl}/${endpoint}`, dto);
  }

}
