import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";


@Component({
  selector: 'page-volumen',
  templateUrl: 'volumen.html',
})
export class VolumenPage {

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _cs: CarritoProvider) {
  }

}
