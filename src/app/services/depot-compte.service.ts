import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepotCompteService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  addDepotCaissier(depot: any = {}){
    return this.http.post(`${this.baseUrl}/caissier/depot`, depot);
  }
}
