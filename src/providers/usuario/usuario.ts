import { Injectable } from '@angular/core';
import { Http} from '@angular/http';
import { RegistroProvider } from '../../providers/registro/registro';
import { ModalController } from "ionic-angular";
import { LoginPage } from "../../pages/index.paginas";
import { ResiduosPage } from "../../pages/index.paginas";
import { CarritoProvider } from '../carrito/carrito';
//import 'rxjs/add/operator/map';
import 'rxjs-compat/add/operator/map';

import { AlertController, Platform } from "ionic-angular";

// Plugin storage
import { Storage } from '@ionic/storage';



@Injectable()
export class UsuarioProvider {

  token:string;
  id_usuario:string;
  usuario:string;
  descuento: boolean = false;
  ventana: boolean;

  constructor(public http: Http,
              private registroProvider: RegistroProvider,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private _cs: CarritoProvider,
              private platform: Platform,
              private storage: Storage) {
    this.cargar_storage();
  }

  activo():boolean{

    if( this.token ){
      return true;
    }else{
      return false;
    }

  }

  inactivo():boolean{

    if( this.token ){
      return false;
    }else{
      return true;
    }

  }

  loguearse(usuario, contrasena){
    var clave = usuario+contrasena;
    return this.registroProvider.getUsuario(clave).map(res => {
      if(res[0] != null){
        this.token = res[0].clave;
        this.id_usuario = res[0].id;
        this.usuario = res[0].usuario;
        // Guardar Storage
        this.guardar_storage();
        this.registroProvider.getReservas(this.id_usuario).subscribe(res => {
          if(res.length >= 5){
            this.descuento = true;
          }
        });
      }
      else{
        this.alertCtrl.create({
          title: "Error al iniciar",
          subTitle: "Usuario no encontrado",
          buttons: ["OK"]
        }).present();
      }
    }
    );
  }

  cerrar_sesion(){

    this.token = null;
    this.id_usuario = null;

    this.alertCtrl.create({
      title: "Cerrar Sesión",
      subTitle: " Se cerró la sesión correctamente",
      buttons: ["OK"]
    }).present();
    // Guardar Storage
    this.guardar_storage();
    this.descuento = false;
  }

  private guardar_storage(){

    if( this.platform.is("cordova") ){
      // dispositivo
      this.storage.set('token', this.token );
      this.storage.set('id_usuario', this.id_usuario );
      this.storage.set('usuario', this.usuario );
    }else{
      // computadora
      if( this.token ){
        localStorage.setItem("token", this.token );
        localStorage.setItem("id_usuario", this.id_usuario );
        localStorage.setItem("usuario", this.usuario );
      }else{
        localStorage.removeItem("token");
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("usuario");
      }

    }

  }

  cargar_storage(){

    let promesa = new Promise( ( resolve, reject ) =>{

      if( this.platform.is("cordova") ){
        // dispositivo
        this.storage.ready()
                  .then( ()=>{

                    this.storage.get("token")
                              .then( token =>{
                                if( token ){
                                  this.token = token;
                                }
                            })

                    this.storage.get("id_usuario")
                              .then( id_usuario =>{
                                if( id_usuario ){
                                  this.id_usuario = id_usuario;
                                }
                                resolve();
                            })

                            this.storage.get("usuario")
                                      .then( usuario =>{
                                        if( usuario ){
                                          this.usuario = usuario;
                                        }
                                        resolve();
                                    })

                  } )

      }else{
        // computadora
        if( localStorage.getItem("token") ){
          // Existe items en el localstorage
          this.token = localStorage.getItem("token");
          this.id_usuario = localStorage.getItem("id_usuario");
          this.usuario = localStorage.getItem("usuario");
        }

        resolve();

      }
    });

    return promesa;

  }

  ver_residuo(ventana){

    let modal:any;

    if( !this.token ){
      // mostrar el login
      modal = this.modalCtrl.create( LoginPage );
      modal.present();
    }else{
    this.ventana = ventana;
    this._cs.ver_residuo();
    modal = this.modalCtrl.create( ResiduosPage );
    modal.present();
    }
  }

}
