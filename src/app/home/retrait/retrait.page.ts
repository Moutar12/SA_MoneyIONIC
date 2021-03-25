import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {ServiceTransactionService} from '../../services/service-transaction.service';
import {Router} from '@angular/router';
import {Transaction} from '../../moodels/transaction';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  activeEmetteur = true;
  activeBenefice = false;
  validerCode = false;
  codeTransaction: AbstractControl;
  errorCode = '';
  formCode: FormGroup;
  dataClient: any;
  dataBeneficiaire: any;


  constructor(private transactionService: ServiceTransactionService, private formBuilder: FormBuilder,
              private loadingController: LoadingController, private alertController: AlertController,
              private router: Router) {}

  ngOnInit() {
    this.formCode = this.formBuilder.group({
      codeTransaction: ['', [Validators.required]]
    });
    this.codeTransaction = this.formCode.controls.codeTransaction;
  }
  async valider() {
    const loading = await this.loadingController.create({
      cssClass: 'my-loading',
      message: 'chargement...'
    });
    await loading.present();
    // console.log(this.formCode.value.codeTransaction);

    if (this.formCode.value.codeTransaction === '') {
      this.errorCode = 'Veuillez entrer le code de transaction!';
      loading.dismiss();
      return;
    }
    // console.log(this.formCode.value.codeTransaction); return;
    this.transactionService.getInfoRetrait(this.formCode.value.codeTransaction).subscribe(data => {
      console.log(data);
      this.dataClient = data[0] ;
      this.dataBeneficiaire = data[1];
      this.validerCode = true;
      this.activeEmetteur = true;
      this.activeBenefice = false;
      loading.dismiss();
    }, error => {
      loading.dismiss();
      this.errorCode = error.error;
    });
  }
  segmentChanged(ev: any) {
    if (ev.detail.value === 'bénéficiaire'){
      this.activeBenefice = true;
      this.activeEmetteur = false;
    } else {
      this.activeBenefice = false;
      this.activeEmetteur = true;
    }
  }
  Suivant() {
    this.activeBenefice = true;
    this.activeEmetteur = false;
  }
  cancelRetrait() {
    this.validerCode = false;
    this.activeEmetteur = false;
    this.activeBenefice = false;
    this.formCode.reset();
    this.errorCode = '';
    this.router.navigate(['/homepage']);
  }
  async successRetrait(successMessage: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opération reussie!',
      message: successMessage,
      buttons: ['OK']
    });
    await alert.present();
  }
  async confirmRetrait() {
    const loading = await this.loadingController.create({
      cssClass: 'my-loading',
      message: 'chargement...'
    });
    await loading.present();
    // console.log(this.formCode.value.codeTransaction);
    this.transactionService.retrait(this.formCode.value.codeTransaction).subscribe(data => {
      this.successRetrait(data);
      this.formCode.reset();
      this.errorCode = '';
      this.validerCode = false;
      this.activeEmetteur = false;
      this.activeBenefice = false;
      this.router.navigate(['homepage']);
      loading.dismiss();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }
}
