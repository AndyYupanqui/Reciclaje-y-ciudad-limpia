import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistroProvider } from '../../providers/registro/registro';


@Component({
  selector: 'page-tarjeta',
  templateUrl: 'tarjeta.html',
})
export class TarjetaPage {
  numero:string ="";
  myDate:string="";
  cvv:string ="";

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {
  }

  realizar_compra(){
    // this._cs.estado_pago = false;
    // this._rs.getReserva(this._cs.fecha_reserva).subscribe(res => {
    //   if(res != null)
    //     this._rs.updateReservaEstado(res.fecha);
    // });
    this.alertCtrl.create({
      title: "Pago Realizado",
      subTitle: "Pago realizado correctamente del reciclaje",
      buttons: ["OK"]
    }).present();

    // this._cs.estado_pago = true;
   
     this.navCtrl.popToRoot();
  }

}
