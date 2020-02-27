import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EstacionamientoDetallePage } from '../../pages/estacionamiento-detalle/estacionamiento-detalle';
import { DetalleReciclajePage } from '../../pages/detalle-reciclaje/detalle-reciclaje';

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
  detalleReciclaje = DetalleReciclajePage;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider) {
  }

  ngOnInit(){
      
  }

}
