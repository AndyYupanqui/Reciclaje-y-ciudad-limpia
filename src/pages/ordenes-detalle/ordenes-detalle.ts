import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { CompraPage } from '../../pages/compra/compra';
import { RegistroProvider } from '../../providers/registro/registro';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { CarritoProvider } from '../../providers/carrito/carrito';


@Component({
  selector: 'page-ordenes-detalle',
  templateUrl: 'ordenes-detalle.html',
})
export class OrdenesDetallePage {

  usuario: any;
  reserva: any;
  espacio: any;
  estado: any;
  espacio_actual: any;
  reserva_pago: any;
  orden:any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private _us: UsuarioProvider,
              private _cs: CarritoProvider,
              private _rs: RegistroProvider) {

      this.usuario = this.navParams.get("usuario");
      this.reserva = this.navParams.get("reserva");
      this.espacio = this.navParams.get("espacio");

      this._rs.getEspacio(this.espacio.id.stringValue).subscribe(res => {
          this.espacio_actual = res;
      });

      this._rs.getReserva(this._cs.fecha_reserva).subscribe(res => {
        if(res != null){
          this.reserva_pago = res.estado_pago;
          this.estado = res.estado;
        }
    });
  }

  pagar(){
    let modal:any;
      this._cs.total = this.reserva.total;
      modal = this.modalCtrl.create( CompraPage );
      modal.present();
  }
}
