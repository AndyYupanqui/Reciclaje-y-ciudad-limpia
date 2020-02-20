import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistroProvider, Residuo } from '../../providers/registro/registro';


@Component({
  selector: 'page-agregar-reciclaje',
  templateUrl: 'agregar-reciclaje.html',
})
export class AgregarReciclajePage {

  id_residuo = "";
  residuo : Residuo;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {

          this.id_residuo = this._cs.id_residuo;
          this._rs.getResiduo(this.id_residuo).subscribe(res => {
            this.residuo = res;
          })

  }


}
