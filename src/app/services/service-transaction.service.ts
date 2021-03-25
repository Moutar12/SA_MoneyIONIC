import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Transaction} from '../moodels/transaction';

@Injectable({
  providedIn: 'root'
})
export class ServiceTransactionService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient) { }
    depotUser(transaction: Transaction) {
      return this.http.post(`${this.baseUrl}/transactions`, transaction);
    }

    retrait(code: number){
      return this.http.get(`${this.baseUrl}/recupTransaction/` + code);
    }

  getInfoRetrait(code: number){
    return this.http.get(`${this.baseUrl}/transaction/` + code);
  }
  }
