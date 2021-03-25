import { Injectable } from '@angular/core';

import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Storage} from '@ionic/storage';
import {BehaviorSubject} from 'rxjs';
import {JwtHelperService} from '@auth0/angular-jwt';
import {map} from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  helper = new JwtHelperService();
  baseUrl = environment.baseUrl;
  authSubject = new  BehaviorSubject(false);

  constructor(private  httpClient: HttpClient, private  storage: Storage, private route: Router) { }

  login(username: string, password: string){
    return this.httpClient.post(`${this.baseUrl + '/connexion'}`, {
      username, password
    });
  }

  saveToken(token){
    const decodeToken = jwtDecode(token);
    localStorage.setItem('token', token);
    localStorage.setItem('ROLE', decodeToken['roles']);
  }

  // permet de tester si l'user a droit a se connecter
  existStatus(token){
    const tokenUser = jwtDecode(token);
    // tslint:disable-next-line:triple-equals
    return tokenUser['status'] == 1;
  }

  logout(){
    localStorage.clear();
    this.route.navigate(['../connexion']);
  }

  logedIn(){
    return !!localStorage.getItem('token');
  }

  getToken() {
    const token = localStorage.getItem('token') ;
    if (token !== 'undefined') {
      return token ;
    }
    return null ;
  }

  getIdUserConnecter(response){
    const tokenUser = jwtDecode(response.token);
    const userId = tokenUser['id']
    return userId;
  }
}
