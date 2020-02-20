import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistroProvider, Residuo } from '../../providers/registro/registro';


@Component({
  selector: 'page-agregar-reciclaje',
  templateUrl: 'agregar-reciclaje.html',
})
export class AgregarReciclajePage {

  id_residuo : string= "";
  residuo : Residuo;
  subtotal: number=0;
  total: number=0;
  reciclaje: any = [];
  mireciclaje : {"id_residuo": string, "tipo": string, "precio": number, "img": string, "cantidad": number, "subtotal": number};

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {

          this.id_residuo = this._cs.id_residuo;
          this._rs.getResiduo(this.id_residuo).subscribe(res => {
            this.residuo = res;
            this.subtotal = res.precio*this._cs.cantidad;
          });
          
          if(localStorage.getItem('reciclaje'))
            this.reciclaje = JSON.parse(localStorage.getItem('reciclaje'));

  }

  agregarReciclaje(){
    this.mireciclaje = {"id_residuo": this.id_residuo, "tipo": this.residuo.tipo, "precio": this.residuo.precio, "img": this.residuo.img, "cantidad": Number(this._cs.cantidad), "subtotal": this.subtotal };
    this.alertCtrl.create({
      title: "Agregado",
      subTitle: "Residuo agregado correctamente",
      buttons: ["OK"]
    }).present();
    this.reciclaje.push(this.mireciclaje);
    localStorage.setItem('reciclaje', JSON.stringify(this.reciclaje));

    this.navCtrl.popToRoot();
  }


}
