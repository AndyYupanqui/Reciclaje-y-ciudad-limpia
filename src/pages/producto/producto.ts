import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';


@Component({
  selector: 'page-producto',
  templateUrl: 'producto.html',
})
export class ProductoPage {

  producto:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {

  }



}
