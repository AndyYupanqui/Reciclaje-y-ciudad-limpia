import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import {ProductosProvider} from "../../providers/productos/productos";
import { ProductoPage } from "../producto/producto";

import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";


@Component({
  selector: 'page-publicacion',
  templateUrl: 'publicacion.html',
})
export class PublicacionPage {

  productoPage = ProductoPage;
  estado= true;

  categoria:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _ps:ProductosProvider) {

  }

}
