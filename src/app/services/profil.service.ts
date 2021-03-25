import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
  getAllprofil(){
    return this.http.get(`${this.baseUrl}/admin/profils`);
  }
}
