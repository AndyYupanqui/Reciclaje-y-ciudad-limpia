import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ProductosProvider} from "../../providers/productos/productos";
import { ProductoPage } from "../producto/producto";


@Component({
  selector: 'page-por-categorias',
  templateUrl: 'por-categorias.html',
})
export class PorCategoriasPage {

  productoPage = ProductoPage;

  categoria:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _ps:ProductosProvider) {

  }


}
