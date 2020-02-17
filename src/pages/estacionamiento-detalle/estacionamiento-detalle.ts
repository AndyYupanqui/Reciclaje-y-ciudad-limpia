import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { RegistroProvider } from '../../providers/registro/registro';
import { EspaciosPage } from '../../pages/espacios/espacios';


@Component({
  selector: 'page-estacionamiento-detalle',
  templateUrl: 'estacionamiento-detalle.html',
})
export class EstacionamientoDetallePage {

  incidencia:any = {};

  espacios = EspaciosPage;

  //espacio : any = [];
  ocupacion: any;
  reservacion: any;
  disponible: number=0;
  descuento: any;

  residuo: any;
  volumen: any;

  mireciclaje = false;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public alertCtrl: AlertController,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider,
              public _rs: RegistroProvider) {

    this.incidencia = this.navParams.get("incidencia");

    this.incidencia.id_residuo.get().then(res => {
        this.residuo = res._document.proto.fields.tipo.stringValue;
    })

    this.incidencia.id_volumen.get().then(res => {
      this.volumen = res._document.proto.fields.tipo.stringValue;
    })

  //   for(var i = 0; i < this.estacionamiento.espacio.length; i++){
  //         this.estacionamiento.espacio[i].get().then(res => {
  //           //console.log(res._document.proto.fields.id.stringValue);
  //           this.ocupacion = res._document.proto.fields.estado_ocupacion.stringValue;
  //           this.reservacion = res._document.proto.fields.estado_reservacion.stringValue;
  //           //this.espacio.push(res._document.proto.fields);
  //           if(this.ocupacion == "0" && this.reservacion == "0"){
  //             this.disponible++;
  //           }
  //         })
  //   }
  }

  ngOnInit(){
    // if(this._us.id_usuario){
    //   this._rs.getReservas(this._us.id_usuario).subscribe(res => {
    //     if(res.length >= 5){
    //       this.descuento = Math.round(this.estacionamiento.costo*0.8*10)/10;
    //     }
    //   });
    // }
  }
}
