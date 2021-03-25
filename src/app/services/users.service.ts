import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }
  getUserId(id: number){
    return this.httpClient.get(`${this.baseUrl}/admin/users/` + id);
  }
  addUsers(user: any = []){
    return this.httpClient.post(`${this.baseUrl}/add/users`, user);
  }
}
