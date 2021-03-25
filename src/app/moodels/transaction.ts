import {Compte} from './compte';
import {User} from './user';
import {Client} from './client';

export interface Transaction {
  // tslint:disable-next-line:max-line-length
  // constructor(montant: number, compte: number, nomEnvoi: string, prenomEnoi: string, phoneEnvoi: string, cni: string, nomRec: string, prenomRec: string, phoneRec: number) {
  //   this.montant = montant;
  //   this.compte = compte;
  //   this.nomEnvoi = nomEnvoi;
  //   this.prenomEnoi = prenomEnoi;
  //   this.phoneEnvoi = phoneEnvoi;
  //   this.cni = cni;
  //   this.nomRec = nomRec;
  //   this.prenomRec = prenomRec;
  //   this.phoneRec = phoneRec;
  // }
  montant: number;
  compte: number;
  phoneEnvoi: string;
  cni: string;
  clientRetrait: Client;
  clientDepot: Client;
  phoneRec: number;
}
