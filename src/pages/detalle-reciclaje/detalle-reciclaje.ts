import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { RegistroProvider, Reciclaje } from '../../providers/registro/registro';

@Component({
  selector: 'page-detalle-reciclaje',
  templateUrl: 'detalle-reciclaje.html',
})
export class DetalleReciclajePage {

  reciclaje:any = {};
  estado: string="false";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {
        
        this.reciclaje = this.navParams.get("reciclaje");
        if(this.reciclaje.estado == "true")
                this.estado = "true";
        //console.log(this.reciclaje);
        // this._rs.getReciclajeUsuario(this._us.id_usuario).subscribe(res => {
        //   this.reciclaje = res[0];
        //   //console.log(this.reciclaje);
        // });
  }

  cambiarEstado(){
    var reciclaje_actualizado : Reciclaje = {id_usuario: this._us.id_usuario, reciclaje: this.reciclaje.reciclaje, estado: "true", fecha: this.reciclaje.fecha, hora: this.reciclaje.hora, direccion: this.reciclaje.direccion, total: this.reciclaje.total };
    this._rs.updateReciclaje(reciclaje_actualizado, this.reciclaje.fecha + ' ' + this.reciclaje.hora);
    this.alertCtrl.create({
      title: "Actulizado",
      subTitle: "Estado del reciclaje actualizado con éxito",
      buttons: ["OK"]
    }).present();
    this.estado = "true";
  }

}
