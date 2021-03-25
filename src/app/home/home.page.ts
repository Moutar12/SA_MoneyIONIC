import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UsersService} from '../services/users.service';
import {CompteService} from '../services/compte.service';
import {AlertController} from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  caissier = false;
  adminSystem = false;
  useragence = false;
  adminagence = false;
  dataUser: any;
  agence: number;
  compte: any;
  avatar = false;
  helper = new JwtHelperService() ;

  // tslint:disable-next-line:max-line-length
  constructor(private authService: AuthService, private router: Router, private usersService: UsersService, private compteService: CompteService,public alertController: AlertController) {}
  ngOnInit() {
    const token =  localStorage.getItem('token') ;
    const tokenDecoded = this.helper.decodeToken(token) ;
    if (tokenDecoded.roles[0] === 'ROLE_adminSystem'){
      this.adminSystem = true;
    }else if (tokenDecoded.roles[0] === 'ROLE_userAgence'){
      this.useragence = true;
    } else if (tokenDecoded.roles[0] === 'ROLE_caissier'){
      this.caissier = true;
    }else if (tokenDecoded.roles[0] === 'ROLE_adminAgence'){
      this.adminagence = true;
    }
    this.usersService.getUserId(tokenDecoded.id).subscribe(
      data => {
        // console.log(data);
        this.dataUser = data;
        if (this.dataUser.avatar != null){
          this.avatar = true;
        }
        if (this.dataUser.agence == null){
          return;
        }
        this.agence = this.dataUser.agence.id;
        this.compteService.getCompteId(this.agence).subscribe(
          // tslint:disable-next-line:no-shadowed-variable
          data => {
            this.compte = data;
          }, error => {
            console.log(error);
          }
        );
      }
    );
  }



  async logOut() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Message <strong>Voulez-vous déconnecter</strong>!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
            this.authService.logout();
            // tslint:disable-next-line:no-unused-expression
            this.router.navigateByUrl('/connexion');
          }
        }
      ]
    });

    await alert.present();
  }








}
