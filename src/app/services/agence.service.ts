import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AgenceService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }

  getAllAgence(){
    return this.http.get(`${this.baseUrl}/admin/agence`);
  }
}
