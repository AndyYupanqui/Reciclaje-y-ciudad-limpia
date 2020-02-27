import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,AlertController } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistroProvider, Residuo, Reciclaje } from '../../providers/registro/registro';


@Component({
  selector: 'page-agregar-reciclaje',
  templateUrl: 'agregar-reciclaje.html',
})
export class AgregarReciclajePage {

  id_residuo : string= "";
  residuo : Residuo;
  subtotal: number=0;
  total: number=0;
  reciclaje: any = [];
  mireciclaje : {"id_residuo": string, "tipo": string, "precio": number, "img": string, "cantidad": number, "subtotal": number};
  estado: string = "false";
  direccion: string="";

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {

          if(this._cs.estado == true){

          this.id_residuo = this._cs.id_residuo;
          this._rs.getResiduo(this.id_residuo).subscribe(res => {
            this.residuo = res;
            this.subtotal = res.precio*this._cs.cantidad;
            this.total = this.subtotal + this.total;
          });
          }

          if(localStorage.getItem('reciclaje')){
            this.reciclaje = JSON.parse(localStorage.getItem('reciclaje'));
            for(var i=0; i<this.reciclaje.length; i++){
              this.total = this.reciclaje[i].subtotal + this.total; 
            }
          }
        
  }

  agregarReciclaje(){
    this.mireciclaje = {"id_residuo": this.id_residuo, "tipo": this.residuo.tipo, "precio": this.residuo.precio, "img": this.residuo.img, "cantidad": this._cs.cantidad, "subtotal": this.subtotal };
    this.alertCtrl.create({
      title: "Agregado",
      subTitle: "Residuo agregado correctamente",
      buttons: ["OK"]
    }).present();
    this.reciclaje.push(this.mireciclaje);
    localStorage.setItem('reciclaje', JSON.stringify(this.reciclaje));

    this.navCtrl.popToRoot();
  }

  registrarReciclaje(){
    let date = new Date();
    let fecha;

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    var d = new Date();
    var hora = d.toLocaleTimeString();

    if(month < 10){
      fecha = `${day}-0${month}-${year}`
    }else{
      fecha = `${day}-${month}-${year}`
    }
    var reciclaje : Reciclaje = {id_usuario: this._us.id_usuario, reciclaje: this.reciclaje, estado: this.estado, fecha: fecha, hora: hora, direccion: this.direccion, total: this.total }
  
    this._rs.addReciclaje(reciclaje, fecha + ' ' + hora);

    this.alertCtrl.create({
      title: "Registrado",
      subTitle: "Reciclaje registrado con éxito",
      buttons: ["OK"]
    }).present();

    localStorage.removeItem('reciclaje');

    this.navCtrl.popToRoot();

  }


}
