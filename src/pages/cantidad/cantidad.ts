import { Component } from '@angular/core';
import { ViewController, NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";


@Component({
  selector: 'page-cantidad',
  templateUrl: 'cantidad.html',
})
export class CantidadPage {

  cantidad = "";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private view: ViewController,
              private _cs: CarritoProvider) {
  }

  ionViewWillLoad(){
    const data = this.navParams.get('data');
    //console.log(data);
  }

  closeModal(){
    const data = {
      name: 'andy'
    };
    this.view.dismiss(data);
  }

  closeModal1(){
    this.view.dismiss();
    this._cs.ver_agregar_reciclaje(this.cantidad);
  }

}
