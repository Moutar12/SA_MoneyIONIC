import { Component, OnInit } from '@angular/core';
import {UsersService} from '../../services/users.service';
import {AlertController} from '@ionic/angular';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ProfilService} from '../../services/profil.service';
import {AgenceService} from '../../services/agence.service';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.page.html',
  styleUrls: ['./add-users.page.scss'],
})
export class AddUsersPage implements OnInit {
  msg = '';
  selectedFile: any ;
  agences: any = [];
  profils: any;
  userForm: FormGroup;
  avatar: any;
  password: string;
  confirmPassword: string;
  errorPassword: boolean;

  constructor(private usersService: UsersService,
              private alertController: AlertController,
              private router: Router, private profilService: ProfilService, private agenceService: AgenceService) { }

  ngOnInit() {
    this.agenceService.getAllAgence().subscribe(
      data => {
        this.agences = data;
      }
    );
    this.profilService.getAllprofil().subscribe(
      data => {
        this.profils = data;
      }
    );
    this.userForm = new FormGroup({
        nom: new FormControl(null, [Validators.required]),
        prenom: new FormControl(null, [Validators.required]),
        username: new FormControl(null, [Validators.required]),
        password: new FormControl(null, [Validators.required]),
        confirmPassword: new FormControl(null, [Validators.required]),
        avatar: new FormControl(null, [Validators.required]),
        phone: new FormControl(null, [Validators.required]),
        adresse: new FormControl(null, [Validators.required]),
        agence: new FormControl(null, [Validators.required]),
        profil: new FormControl(null, [Validators.required]),
        cni: new FormControl(null, [Validators.required])
    });
  }

Uploadavatar(event: any){
  // tslint:disable-next-line:triple-equals
    if (!event.target.files[0] || event.target.files[0] == 0){
      this.msg = 'Vous devez selectionner une image';
    }
    this.selectedFile = event.target.files[0];
    const type = event.target.files[0].type;

    if (type.match(/image\/*/) == null){
      this.msg = 'Unsupported';
      return;
    }
    const read = new FileReader();
    read.readAsDataURL(event.target.files[0]);
  // tslint:disable-next-line:variable-name
    read.onload = (_event) => {
      this.avatar = read.result;
    };
}
 ConfirmPassword($event: KeyboardEvent){
  // @ts-ignore
   if (this.confirmPassword !== this.password){
    this.errorPassword = true;
  }else {
     this.errorPassword = false;
   }
 }

 async addUsers(){
   // tslint:disable-next-line:triple-equals
    if (this.errorPassword == true){
      return;
    }
    const formValue = this.userForm;
    const formData = new FormData();
    for (const key of Object.keys(formValue)){
      if (key !== 'avatar'){
        const val = formValue[key];
        formData.append(key, val);
      }
    }
    if (this.selectedFile){
      formData.append('avatar', this.selectedFile);
    }
    this.usersService.addUsers(formData).subscribe(
      data => {
        console.log(data);
        this.userForm.reset();
      }
    );
 }

}
