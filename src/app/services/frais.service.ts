import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FraisService {

  baseUrl = environment.baseUrl;
  constructor(private httpClient: HttpClient) { }

  Frais(montant: any) {
    return this.httpClient.post(`${this.baseUrl}/decalculer`, montant);
  }
}
