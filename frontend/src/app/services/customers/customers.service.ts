import { Injectable } from '@angular/core';
import { InfoCustomerResponse, ListCustomerResponse, SaveCustomerRequest, SaveCustomerResponse, UpdateCustomerRequest, UpdateCustomerResponse } from './customers.types';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CustomersService {

  private readonly basePath = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  save(request: SaveCustomerRequest) : Observable<SaveCustomerResponse> {
    return this.http.post<SaveCustomerResponse>()
  }

  update(request: UpdateCustomerRequest) : Observable<UpdateCustomerResponse> {}

  delete(id: number) : Observable<void> {}

  list() : Observable<ListCustomerResponse> {}

  showById(id: number) : Observable<InfoCustomerResponse> {}
}
