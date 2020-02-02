import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginPage } from '../../pages/login/login';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Espacio, Reserva, RegistroProvider } from '../../providers/registro/registro';


@Component({
  selector: 'page-espacios-detalle',
  templateUrl: 'espacios-detalle.html',
})
export class EspaciosDetallePage {

  //espacio: any;
  descuento: any=0;
  maxTime: any=60;
  maxTime2: any;
  timer: any;
  timer2: any;
  estacionamiento: any;
  costo: any;
  horas: any="";
  cronometro: any;
  cronometro2: any;
  fecha_reg = new Date();
  fecha : string = this.fecha_reg.getDate() + "-" + (this.fecha_reg.getMonth() + 1) + "-" + this.fecha_reg.getFullYear() + "   " + this.fecha_reg.getHours() + ":" + this.fecha_reg.getMinutes() + ":" + this.fecha_reg.getSeconds();
  
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private modalCtrl: ModalController,
              private alertCtrl: AlertController,
              private db: AngularFirestore,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider,
              public _rs: RegistroProvider) {

      //this.espacio = this.navParams.get("espacio");
      this.estacionamiento = this.navParams.get("estacionamiento");
      this.costo = this.estacionamiento.costo;
      this.descuento = 0;
      
      if(this._us.id_usuario){
        this._rs.getReservas(this._us.id_usuario).subscribe(res => {
          if(res.length >= 5){
            this.descuento = Math.round(this.estacionamiento.costo*0.8*10)/10;
          }
        });
      }
  }

  reservar(){
    let modal:any;
    this._cs.estado_pago = false;
    this._cs.reserva_estado = false;
    this._cs.estado_eliminado = false;
    this._cs.estado_reserva = true;

    if( !this._us.token ){
      // mostrar el login
      modal = this.modalCtrl.create( LoginPage );
      modal.present();
    }else{
      this.alertCtrl.create({
        title: "Reserva",
        subTitle: "Su vacante fue reservada con éxito",
        buttons: [{text:"OK",
                   handler: () =>{
                    this.alertCtrl.create({
                      title: "Reserva",
                      subTitle: "Su tiempo máximo para llegar al espacio y realizar el pago de 15 minutos",
                      buttons: [{text:"OK",
                                  handler: () => {
                                    this.navCtrl.popToRoot();
                                  }}]
                    }).present();
                   }}]
      }).present();

      if(this.descuento != 0){
        var total = this.descuento*this.horas;
      }else{
        var total = this.costo*this.horas;
      }
      this._cs.fecha_reserva = this.fecha;

      var espacio: Espacio = {estado_ocupacion: this._cs.espacio.estado_ocupacion, estado_reservacion: "1", id: this._cs.espacio.id};
      this._rs.updateEspacio(espacio, this._cs.espacio.id);

      var reserva: Reserva = {espacio: this.db.doc('/Espacio/'+this._cs.espacio.id).ref, estacionamiento: this.db.doc('/Estacionamiento/'+this.estacionamiento.id).ref, 
                              id_usuario: this._us.id_usuario, estado_pago: "Por pagar", estado: "En proceso", fecha: this.fecha, horas: Number(this.horas), total: total, usuario: this.db.doc('/Usuario/'+this._us.id_usuario).ref};
      this._rs.addReserva(reserva, this.fecha);

      //this.carga(); 
      //this.tiempo(); 
      this.StartTimer();  
    }
  }

//   carga(){
//     var contador_s = 0;
//     var contador_m = 0;
//     // var s = document.getElementById("segundos");
//     // var m = document.getElementById("minutos");
    
//     this.cronometro = setInterval(
//         function(){
//           if(contador_m.toString()+":"+contador_s.toString() != "0:15"){
//             if(contador_s==60)
//             {
//                 contador_s=0;
//                 contador_m++;
//                 //m.innerHTML = contador_m;

//                 if(contador_m==60)
//                 {
//                     contador_m=0;
//                 }
//             }
//             //s.innerHTML = contador_s;
//             contador_s++;
//             console.log(contador_m+":"+contador_s);
//           }else{
//             clearInterval(this.cronometro);
//             console.log("Finalizado");
//           }
//         }
//         ,1000);
//  }

//  tiempo(){
//    setTimeout(function(){
//     alert("Reserva eliminada");
//     //this.alertCtrl.create({
//     //   title: "Reserva eliminada",
//     //   subTitle: "Usted no llegó en el tiempo establecido",
//     //   enableBackdropDismiss: true,
//     //   buttons: ["OK"]
//     // }).present();
//    }, 10000);
//  }

 StartTimer(){
  this.timer = setTimeout(x => 
    {
        if(this.maxTime <= 0 || this._cs.espacio.estado_ocupacion == "1") { }
        this.maxTime -= 1;
        //console.log(this.maxTime);
        this._cs.cronometro = this.maxTime;

        if(this.maxTime>0 && (this._cs.espacio.estado_ocupacion == "0" || this._cs.estado_pago == false) && this._cs.estado_eliminado == false){
          //this.hidevalue = false;
          this.StartTimer();
        }
        
        else{
          if(this._cs.espacio.estado_ocupacion == "1" && this._cs.estado_pago == true){
            this._cs.cronometro = null;
            alert("Ha comenzado a transcurrir su tiempo de reserva");
            this.maxTime2 = this.horas*20;
            this.StartTimer2();
          }
          else{
            if(this._cs.estado_eliminado == true){

            }
            else{
              alert("Reserva eliminada");
              this._rs.removeReserva(this.fecha);
              var espacio: Espacio = {estado_ocupacion: this._cs.espacio.estado_ocupacion, estado_reservacion: "0", id: this._cs.espacio.id};
              this._rs.updateEspacio(espacio, this._cs.espacio.id);
              this._cs.estado_reserva = false;
              //this.hidevalue = true;
            }
          }  
        }

    }, 1000);


}

StartTimer2(){
  this.timer2 = setTimeout(x => 
    {
      this.maxTime2 -= 1;
      this._cs.cronometro2 = this.maxTime2;
      if(this.maxTime2>0){
        if(this.maxTime2 == 10){
          alert("Quedan 10 segundos para que termine su reserva")
        }
        //this.hidevalue = false;
        this.StartTimer2();
      }

      else{
        this._rs.updateReservaEstado2(this.fecha);
        var espacio: Espacio = {estado_ocupacion: this._cs.espacio.estado_ocupacion, estado_reservacion: "0", id: this._cs.espacio.id};
        this._rs.updateEspacio(espacio, this._cs.espacio.id);
        this._cs.reserva_estado = true;
        alert("Reserva finalizada");
        //this.navCtrl.popToRoot();
      }
    }, 1000);
}
  
}
