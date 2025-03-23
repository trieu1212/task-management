import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.API_URL
  constructor(private http: HttpClient) { }

  getAll<T>(endpoint: string): Observable<T[]> {
    return this.http.get<{[key: string]: T}>(`${this.baseUrl}/${endpoint}.json`).pipe(
      map(response => {
        if(!response) return []
        return Object.keys(response).map(key => ({
          id: key,
          ...response[key]
        }))
      })
    )
  }

  getById<T>(endpoint: string, id:string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}/${endpoint}/${id}.json`);
  }

  add<T>(endpoint: string, data: Partial<T>): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}/${endpoint}.json`, data);
  }

  update<T>(endpoint: string, id: string, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}/${endpoint}/${id}.json`, data);
  }

  delete<T>(endpoint: string, id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${endpoint}/${id}.json`);
  }

  getByFieldName<T extends Record<string, any>>(endpoint: string, field: keyof T, value: any): Observable<T[]> {
    return this.http.get<{[key:string]: T}>(`${this.baseUrl}/${endpoint}.json`).pipe(
      map(response => {
        if(!response) return []
        return Object.keys(response).map(key => ({
          ...response[key],
          id:key
        })).filter(task => task[field] === value)
      })
    )
  }

  deleteManyFromFieldName<T extends Record<string, any>>(endpoint:string, field: keyof T, value: any): Observable<void> {
    return this.getByFieldName<T>(endpoint, field, value).pipe(
      mergeMap(items => {
        const deleteReq = items.map(item => this.delete<T>(endpoint, item['id']))
        return forkJoin(deleteReq)
      }),
      map(() => {
        console.log('success')
      })
    )
  }
}
