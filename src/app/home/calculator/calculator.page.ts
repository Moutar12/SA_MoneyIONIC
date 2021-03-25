import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {FraisService} from '../../services/frais.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.page.html',
  styleUrls: ['./calculator.page.scss'],
})
export class CalculatorPage implements OnInit {

  calculForm: FormGroup;
  avatar: string;
  constructor(private fb: FormBuilder,
              private alertCtrl: AlertController,
              private loadingCtrl: LoadingController,
              private frais: FraisService) { }

  ngOnInit() {
    this.calculForm = new FormGroup({
      montant: new FormControl(null, [Validators.required])
    });


  }

  async calculer() {
    const loading = await this.loadingCtrl.create();
    await loading.present();

    this.frais.Frais(this.calculForm.value).subscribe(
      async (res) => {
        await loading.dismiss();
        const alert = await this.alertCtrl.create({
          header: `Pour la transaction de ${this.calculForm.value.montant}, le frais est égal à:`,
          cssClass: 'my-custom-class',
          message: `${res} CFA`,
          buttons: ['OK']
        });
        await alert.present();
        console.log(res);
      }
    );
  }
  get montant() {
    return this.calculForm.get('montant');
  }

}
