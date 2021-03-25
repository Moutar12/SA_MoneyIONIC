import { Component, OnInit } from '@angular/core';
import {DepotCompteService} from '../../services/depot-compte.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, LoadingController} from '@ionic/angular';
import {Router} from '@angular/router';
import {CompteService} from '../../services/compte.service';

@Component({
  selector: 'app-depot-caissier',
  templateUrl: './depot-caissier.page.html',
  styleUrls: ['./depot-caissier.page.scss'],
})
export class DepotCaissierPage implements OnInit {

  formDepot: FormGroup;
  errorMessage = '';
  compte: any = [];

  constructor(private depot: DepotCompteService,
              private alertController: AlertController,
              private router: Router,
              private loadingController: LoadingController,
              private compteSevice: CompteService
              ) { }

  ngOnInit() {
    this.formDepot = new FormGroup({
      montant: new FormControl(null, [Validators.required]),
      comptes: new FormControl(null,[Validators.required])
    });
    this.compteSevice.getAllcompte().subscribe(
      data => {
        this.compte = data;
      }
    );
  }
  async addDepot(successMessage: any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Opération reussie!',
      message: successMessage,
      buttons: ['OK']
    });

    await alert.present();
  }
  async deposer() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'depot encours ...'
    });
    await loading.present();
    console.log(this.formDepot.value);
    if (this.formDepot.value.montant < 0) {
      this.errorMessage = 'Le montant ne peut pas être négatif!';
      return;
    } else if (this.formDepot.value.montant === 0) {
      this.errorMessage = 'Le montant ne peut pas être null';
      return;
    }
    this.depot.addDepotCaissier(this.formDepot.value).subscribe(data => {
      this.addDepot(data);
      this.router.navigate(['./home']);
      loading.dismiss();
      this.formDepot.reset();
    }, error => {
      console.log(error);
      loading.dismiss();
    });
  }
}
