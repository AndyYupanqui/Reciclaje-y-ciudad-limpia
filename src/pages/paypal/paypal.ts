import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";

/**
 * Generated class for the PaypalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-paypal',
  templateUrl: 'paypal.html',
})
export class PaypalPage {

  correo:string ="";
  contrasena:string="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider) {
  }


}
