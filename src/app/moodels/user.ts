import {Agence} from './agence';
import {Profil} from './profil';

export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  telephone: number;
  email: string;
  profil: Profil;
  agences?: Agence;
  isDeleted: boolean;
}

