import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompteService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getCompteId(id: number){
    return this.http.get(`${this.baseUrl}/admin/compte/` + id);
  }
  getAllcompte(){
    return this.http.get(`${this.baseUrl}/admin/compte`);
  }
}
