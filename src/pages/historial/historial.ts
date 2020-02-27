import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RegistroProvider } from '../../providers/registro/registro';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { DetalleReciclajePage } from '../../pages/detalle-reciclaje/detalle-reciclaje';

/**
 * Generated class for the HistorialPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-historial',
  templateUrl: 'historial.html',
})
export class HistorialPage {

  reservas: any= [];

  detalleReciclaje = DetalleReciclajePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioProvider,
              private _cs: CarritoProvider,
              private _rs: RegistroProvider) {
  }
  

  ionViewWillEnter(){
    this._cs.totalnorecogidos=0;
    this._cs.totalrecogidos=0;
    this._cs.total=0;
    // this.reservas = [];
    // if(this._us.id_usuario){    
    //   this._rs.getReservas(this._us.id_usuario).subscribe(res => {
    //     this.reservas = [];
    //     for(var i = 0; i<res.length; i++){
    //       if(res[i].estado == "Finalizado")
    //       this.reservas.push(res[i]);
    //     }
    //   });
    // }  
    this._cs.ver_reciclajesNoRecogidos();
    this._cs.ver_reciclajesRecogidos();
  }

}
