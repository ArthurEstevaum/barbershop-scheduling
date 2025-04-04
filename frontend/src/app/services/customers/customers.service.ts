import { Injectable } from '@angular/core';
import { InfoCustomerResponse, ListCustomerResponse, SaveCustomerRequest, SaveCustomerResponse, UpdateCustomerRequest, UpdateCustomerResponse } from './customers.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly basePath = environment.apiUrl

  constructor(private http: HttpClient) { }

  save(request: SaveCustomerRequest) : Observable<SaveCustomerResponse> {
    return this.http.post<SaveCustomerResponse>(`${this.basePath}customers`, request)
  }

  update(id: number, request: UpdateCustomerRequest) : Observable<UpdateCustomerResponse> {
    return this.http.put<UpdateCustomerResponse>(`${this.basePath}customers/${id}`, request)
  }

  delete(id: number) : Observable<void> {
    return this.http.delete<void>(`${this.basePath}customers/${id}`)
  }

  list() : Observable<ListCustomerResponse> {
    return this.http.get<ListCustomerResponse>(`${this.basePath}customers`)
  }

  showById(id: number) : Observable<InfoCustomerResponse> {
    return this.http.get<InfoCustomerResponse>(`${this.basePath}customers/${id}`)
  }
}
