import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstacionamientoDetallePage } from '../../pages/estacionamiento-detalle/estacionamiento-detalle';

/**
 * Generated class for the EstacionamientoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-estacionamiento',
  templateUrl: 'estacionamiento.html',
})
export class EstacionamientoPage {

  estacionamientoDetalle = EstacionamientoDetallePage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider) {
  }

  ngOnInit(){
    if(this._us.descuento == true){
      this.alertCtrl.create({
        title: "Felicidades",
        subTitle: "Tiene un descuento del 20% en el costo por hora de todas las playas",
        buttons: ["OK"]
      }).present();
    }
  }

}
