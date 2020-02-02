import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { UsuarioProvider } from "../../providers/usuario/usuario";
import { CarritoProvider } from "../../providers/carrito/carrito";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  usuario:string ="";
  contrasena:string="";
  clave:string="";


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _us: UsuarioProvider,
              private _cs: CarritoProvider) {
                
  }

  loguearse(){
    this._us.loguearse( this.usuario, this.contrasena)
            .subscribe( ()=>{
              if( this._us.activo() ){
                this.viewCtrl.dismiss(true);
              }
            })
  }

}
