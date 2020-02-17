import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { AngularFirestore } from 'angularfire2/firestore';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Incidencia, RegistroProvider } from '../../providers/registro/registro';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';


@Component({
  selector: 'page-foto',
  templateUrl: 'foto.html',
})
export class FotoPage {

  image: string = null;
  base64Image : string="";
  titulo: string="";
  ubicacion: string="";
  descripcion: string="";
  latitud: number=0;
  longitud: number=0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController,
              private db: AngularFirestore,
              public geolocation: Geolocation,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider,
              private camera: Camera) {
      this.getGeolocation()
  }

  getGeolocation(){
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      this.latitud = geoposition.coords.latitude;
      this.longitud = geoposition.coords.longitude;
    });
  }

  takePicture(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64:
      this.base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  publicar(){
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

    var incidencia: Incidencia = {id_usuario: this._us.id_usuario, id_residuo: this.db.doc('/Residuo/'+this._cs.id_residuo).ref, id_volumen:  this.db.doc('/Volumen/'+this._cs.id_volumen).ref, titulo: this.titulo, descripcion: this.descripcion, ubicacion: this.ubicacion, latitud: this.latitud, longitud: this.longitud, imagen: this.base64Image, fecha: fecha, hora: hora};

    this._rs.addIncidencia(incidencia, fecha + ' ' + hora);

    this.alertCtrl.create({
      title: "Registrado",
      subTitle: "Incidencia publicada con éxito",
      buttons: ["OK"]
    }).present();

    this.navCtrl.popToRoot();
  }
}
