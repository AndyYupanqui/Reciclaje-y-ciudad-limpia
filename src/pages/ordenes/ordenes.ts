import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { OrdenesDetallePage } from '../../pages/ordenes-detalle/ordenes-detalle';
import { LoginPage } from '../../pages/login/login';
import { EstacionamientoPage } from "../index.paginas";
import { Espacio, RegistroProvider } from '../../providers/registro/registro';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CarritoProvider } from '../../providers/carrito/carrito';



@Component({
  selector: 'page-ordenes',
  templateUrl: 'ordenes.html',
})
export class OrdenesPage {

  incidencia = EstacionamientoPage;
  reservas: any;
  estacionamiento: any;
  espacio: any;
  usuario: any;
  vreciclaje = true;
  mireciclaje = false;
  //espacio : any = [];

  ordenesDetalle = OrdenesDetallePage;
  login = LoginPage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public alertCtrl: AlertController,
              private _us: UsuarioProvider,
              private _cs: CarritoProvider,
              private _rs: RegistroProvider
              ) {
                this._cs.estado_reserva = true;
  }

  ionViewWillEnter(){
    this.estacionamiento = null;
    if(this._us.id_usuario && this._cs.fecha_reserva){    
      this._rs.getReserva(this._cs.fecha_reserva).subscribe(res => {
        //console.log(res);
        this.reservas = res;
          if(res != null){
            res.estacionamiento.get().then(res => {
              var r:any;
              r = res;
              this.estacionamiento = r._document.proto.fields;
            });
            res.espacio.get().then(res => {
              var r:any;
              r = res;
              if(r._document.proto){
                this.espacio = r._document.proto.fields;
              }
            });

            res.usuario.get().then(res => {
              var r:any;
              r = res;
              this.usuario = r._document.proto.fields;
            });
          }
      });
    }  
  }
  // ionViewWillLeave(){
  //   if(this._us.id_usuario == null)
  //     this.estacionamiento = null;
  // }

  eliminarReserva(){
    this._rs.removeReserva(this.reservas.fecha);
    this.alertCtrl.create({
      title: "Eliminado",
      subTitle: "Reserva eliminada correctamente",
      buttons: ["OK"]
    }).present();
    var espacio: Espacio = {estado_ocupacion: this.espacio.estado_ocupacion.stringValue, estado_reservacion: "0", id: this.espacio.id.stringValue};
    this._rs.updateEspacio(espacio, this.espacio.id.stringValue);
    this.estacionamiento = null;
    this._cs.estado_eliminado = true;
  }
}
