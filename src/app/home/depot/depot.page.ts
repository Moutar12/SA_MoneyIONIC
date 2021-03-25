import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import {Transaction} from '../../moodels/transaction';
import {ServiceTransactionService} from '../../services/service-transaction.service';
import {AuthService} from '../../services/auth.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {FraisService} from '../../services/frais.service';



@Component({
  selector: 'app-depot',
  templateUrl: './depot.page.html',
  styleUrls: ['./depot.page.scss'],
})
export class DepotPage implements OnInit {

  depotForm: FormGroup;
  segmentPage = 'emetteur';
  private nomEnvoi: AbstractControl;
  private prenomEnvoi: AbstractControl;
  private phoneEnvoi: AbstractControl;
  private nomRec: AbstractControl;
  private phoneRec: AbstractControl;
  private prenomRec: AbstractControl;
  private cni: AbstractControl;
  private activeBenefice: boolean;
  private activeEmetteur: boolean;
  private compte: AbstractControl;
  montantTotal: any;
  montantSend: any;
  frais: any = [];
  montant: number;
  Form: FormGroup;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    public alertController: AlertController,
    private transactionService: ServiceTransactionService,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private auth: AuthService,
    private fraisService: FraisService
  ) {
  }

  ngOnInit() {

    this.depotForm = this.fb.group({
      montant: ['', [Validators.required]],
      // total: ['', [Validators.required]],
      nomEnvoi: ['', [Validators.required]],
      prenomEnvoi: ['', [Validators.required]],
      nomRec: ['', [Validators.required]],
      prenomRec: ['', [Validators.required]],
      cni: ['', [Validators.required]],
      phoneEnvoi: ['', [Validators.required]],
      phoneRec: ['', [Validators.required]],
      montantget: ['', [Validators.required]],
    });

    // this.total = this.depotForm.controls.total;
    this.nomEnvoi = this.depotForm.controls.nomEnvoi;
    this.prenomEnvoi = this.depotForm.controls.prenomEnvoi;
    this.phoneEnvoi = this.depotForm.controls.phoneEnvoi;
    this.nomRec = this.depotForm.controls.nomRec;
    this.prenomRec = this.depotForm.controls.prenomRec;
    this.phoneRec = this.depotForm.controls.phoneRec;
    this.cni = this.depotForm.controls.cni;
    // this.compte = this.depotForm.controls.compte;


  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'bénéficiaire'){
      this.activeBenefice = true;
      this.activeEmetteur = false;
      // console.log(ev);
    } else {
      this.activeBenefice = false;
      this.activeEmetteur = true;
      // console.log('Emetteur');
    }
  }

  Suivant() {
    this.activeBenefice = true;
    this.activeEmetteur = false;
  }

  async calculFrais(event: KeyboardEvent) {
    // tslint:disable-next-line:triple-equals
    if(this.depotForm.value.montant == 0 || this.depotForm.value.montant == null){
      this.frais = '';
      this.montantTotal = ''
    }else {
      this.fraisService.Frais(this.depotForm.value).subscribe(
        async (data) => {
          this.frais = data;
          this.montantTotal = data + this.depotForm.value.montant;
        }, async (error) => {
        })
    }
  }
  calculTotal(event: KeyboardEvent) {
    // tslint:disable-next-line:triple-equals
    if(this.depotForm.value.total == 0 || this.depotForm.value.total < 500 || this.depotForm.value.total == null){
      this.frais = '';
      this.montantSend = '';
    }else {
      this.fraisService.Frais(this.depotForm.value).subscribe(
        async (res) => {
          this.frais = res;
          this.montantSend = res;
        }, async (error) => {
        })
    }
  }
  async transactionResussi() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Reussie',
      message: 'Le dépôt validé',
      buttons: ['OK']
    });

    await alert.present();
  }

  async submit() {
    const formValue = this.depotForm.value;
    console.log(formValue);
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirmation',
      message: ` <br>EMETTEUR <h4>${this.depotForm.value.prenomEnvoi} ${this.depotForm.value.nomEnvoi}</h4>
                    <br> TELEPHONE<h4>${this.depotForm.value.phoneEnvoi}</h4>
                    <br> N° CNI<h4>${this.depotForm.value.cni}</h4>
                    <br> MONTANT A ENVOYER<h4>${this.depotForm.value.montant}</h4>
                    <br> RECEPTEUR<h4>${this.depotForm.value.prenomRec} ${this.depotForm.value.nomRec}</h4>
                    <br> NUMERO RECEPTEUR<h4>${this.depotForm.value.phoneRec}</h4> `,
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Annuler');
          }
        }, {
          text: 'Valider',
          handler: () => {

            this.transactionService.depotUser(formValue).subscribe(data => {
              console.log(data);
              this.transactionResussi();
              this.router.navigate(['/home']);
            }, error => {
              console.log('error');
            });
          }
        }
      ]
    });

    await alert.present();

  }
}

