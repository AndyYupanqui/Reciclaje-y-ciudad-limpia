import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs-compat/add/operator/map';

import { ModalController } from "ionic-angular";

import { Estacionamiento, Espacio, RegistroProvider, Residuo, Volumen } from "../../providers/registro/registro";

// paginas del modal
import { LoginPage, RegistrarsePage, TarjetaPage, PaypalPage, VolumenPage, FotoPage} from "../../pages/index.paginas";

@Injectable()
export class CarritoProvider {

  estacionamientos: Estacionamiento[];
  residuos: Residuo[];
  volumenes: Volumen[];
  id_residuo: string="1";
  id_volumen: string="1";
  latitud: number=0;
  longitud: number=0;

  espacio: Espacio;
  total: any;
  cronometro: any;
  cronometro2: any;
  estado_reserva: boolean=true;
  estado_pago: boolean=false;
  reserva_estado: boolean=false;
  fecha_reserva: any;
  estado_eliminado: boolean=false;

  constructor( public http: Http,
               private modalCtrl: ModalController,
               private registroProvider: RegistroProvider ) {

  }

  ver_login(){

      let modal:any;

      modal = this.modalCtrl.create( LoginPage );
      modal.present();
  }

  ver_volumen(){
    let modal:any;

    this.registroProvider.getVolumenes().subscribe(res => {
      this.volumenes = res;
    });

    modal = this.modalCtrl.create( VolumenPage );
    modal.present();
  }

  ver_foto(){
    let modal:any;

    modal = this.modalCtrl.create( FotoPage );
    modal.present();
  }

  ver_residuo(){

    this.registroProvider.getResiduos().subscribe(res => {
      this.residuos = res;
    });
  }

  ver_estacionamiento(){

    this.registroProvider.getEstacionamientos().subscribe(res => {
      this.estacionamientos = res;
    });
  }

  ver_espacio(id){

    this.registroProvider.getEspacio(id).subscribe(res => {
      this.espacio = res;
    });
  }

  ver_registrarse(){

      let modal:any;

      modal = this.modalCtrl.create( RegistrarsePage );
      modal.present();
  }

  pago_tarjeta(){
    let modal:any;

    modal = this.modalCtrl.create( TarjetaPage );
    modal.present();
  }

  pago_paypal(){
    let modal:any;

    modal = this.modalCtrl.create( PaypalPage );
    modal.present();
  }

}
