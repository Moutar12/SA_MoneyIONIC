export interface Compte {
  id?: number;
  code: string;
  montant: number;
  createdAt: Date;
  isDeleted: boolean;
}
