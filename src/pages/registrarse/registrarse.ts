import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Todo, RegistroProvider } from '../../providers/registro/registro';

import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";


@Component({
  selector: 'page-registrarse',
  templateUrl: 'registrarse.html',
})
export class RegistrarsePage {

  todos: Todo[];
  conductor: Todo = {id: "75159634", nombres:"Kevin Gustavo", apellidos:"Rojas Orihuela", celular:"987456123",
                    correo:"kevin.rojas@gmial.com", placa:"FS5-741", usuario:"kevin.rojas", contraseña:"987123", clave:"kevin.rojas987123"};

  dni: string="";
  nombres: string="";
  apellidos: string="";
  celular: string="";
  correo:  string ="";
  placa: string="";
  usuario: string="";
  contrasena: string="";
  clave: string="";

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private registroProvider: RegistroProvider,
              private _cs:CarritoProvider,
              private _us:UsuarioProvider) {
  }

  ngOnInit(){
    // this.registroProvider.getTodos().subscribe(res => {
    //   this.todos = res;
    //   console.log(res);
    // });
    // this.registroProvider.getTodo("75012728").subscribe(res => {
    //   if(res != undefined)
    //   console.log(res);
    //   else{
    //     console.log("No se encuentra usuario");
    //   }
    // }
    // );
  }

  guardarUsuario(){
    this.clave = this.usuario+this.contrasena;
    var conductor: Todo = {id: this.dni, nombres: this.nombres, apellidos: this.apellidos, celular: this.celular,
                    correo: this.correo, placa: this.placa, usuario: this.usuario, contraseña: this.contrasena, clave: this.clave};
    this.registroProvider.addTodo(conductor, conductor.id);
    this.alertCtrl.create({
      title: "Felicidades",
      subTitle: "Registro de cuenta con éxito",
      buttons: ["OK"]
    }).present();
    this.viewCtrl.dismiss(true);
  }

  remove(item){
    this.registroProvider.removeTodo(item.id);
  }
}
