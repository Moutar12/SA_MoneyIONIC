import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {Swal} from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  formLogin: FormGroup;
  submited: true;
  invalidInfo = false;
  username: string;
  password: string;
  constructor(private formBulder: FormBuilder, private route: Router, private authService: AuthService) { }

  ngOnInit() {
    this.formLogin = this.formBulder.group(
      {
        username: ['', Validators.required],
        password: ['', Validators.required]
      }
    );
  }

  onSubmit(){
    this.submited = true;
    if (this.formLogin.invalid){
      return;
    }
    this.authService.login(this.username, this.password).subscribe(
      res => {
       if (this.authService.existStatus(res['token'])){
         // tslint:disable-next-line:no-unused-expression
         Swal.fire('Cette utilisateur est bloqué');
       }else {
         this.authService.saveToken(res['token']);
         // tslint:disable-next-line:max-line-length
         if (localStorage.getItem('ROLE').includes('ROLE_adminSystem') ||  localStorage.getItem('ROLE').includes('ROLE_userAgence') || localStorage.getItem('ROLE').includes('ROLE_caissier')
         ){
           this.route.navigateByUrl('home');
         }else {
           this.authService.logout();
           Swal.fire('Accés refusé');
         }
       }
      }, (err) => {
        this.invalidInfo = true;
    }
    );
  }

  isConnect(){
   return  this.authService.logedIn();
  }
}
