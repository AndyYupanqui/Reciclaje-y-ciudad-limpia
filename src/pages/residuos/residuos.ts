import { Component } from '@angular/core';
import { Modal, ModalOptions, NavController, NavParams, ViewController, ModalController} from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { CantidadPage } from "../index.paginas"


@Component({
  selector: 'page-residuos',
  templateUrl: 'residuos.html',
})
export class ResiduosPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private modalCtrl: ModalController) {
  }

  
  abrirModal(){

    const myModalOptions: ModalOptions = {
      enableBackdropDismiss: false,
      cssClass : 'pricebreakup'
    };



    const myData = {
      name: 'dfsd'
    }
    const myModal: Modal = this.modalCtrl.create(CantidadPage, {data: myData}, myModalOptions);

    myModal.present();

    myModal.onDidDismiss((data => {
      //console.log(data);
    }))

  }

}
