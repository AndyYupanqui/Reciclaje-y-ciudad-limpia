import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CarritoProvider } from "../../providers/carrito/carrito";

import { ProductoPage } from "../producto/producto";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { Geolocation, Geoposition } from '@ionic-native/geolocation';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  productoPage = ProductoPage;

  doRefresh(refresher) {
      console.log('Begin async operation', refresher);

      setTimeout(() => {
        console.log('Async operation has ended');
        refresher.complete();
      }, 2000);
    }
  constructor( public navCtrl: NavController,
               public geolocation: Geolocation,
               private _cs: CarritoProvider,
               private _us: UsuarioProvider) {
      this.getGeolocation()
  }


  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this._cs.latitud = geoposition.coords.latitude;
      this._cs.longitud = geoposition.coords.longitude;
    });
  }

  // siguiente_pagina( infiniteScroll ){

  //   this._ps.cargar_todos()
  //         .then( ()=>{

  //           infiniteScroll.complete();

  //         } )

  // }

}
