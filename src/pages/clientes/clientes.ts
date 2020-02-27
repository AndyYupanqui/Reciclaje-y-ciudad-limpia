import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { RegistroProvider } from "../../providers/registro/registro";

@Component({
  selector: 'page-clientes',
  templateUrl: 'clientes.html',
})
export class ClientesPage {

  clientes: any = [];
  cliente: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _cs: CarritoProvider,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {

        this._rs.getUsuarios().subscribe(res => {
             this.clientes = res;
        })


        //     this._rs.getUsuarios().subscribe(res => {
    //       this.arreglos = res;
          
    //       for(var i=0; i < res.length; i++){
    //         this._rs.getReciclajeUsuario(res[i].id).subscribe(response => {
    //           this.subtotal = 0;
              
    //           for(var j=0; j < response.length; j++){
    //             this.subtotal = this.subtotal + response[j].total;
    //           }
    //          this.item = {apellidos: this.arreglos[i].apellidos, celular: this.arreglos[i].celular, contraseña: this.arreglos[i].contraseña, correo: this.arreglos[i].correo, id: this.arreglos[i].id, nombres: this.arreglos[i].nombres, usuario: this.arreglos[i].usuario, total: this.subtotal }
    //         this.total = this.total + this.subtotal; 
    //         this.clientes.push(this.item);  
    //           //this.total_usuario.push(this.subtotal);
    //         })   
    //       }
          
    //  })


  }


}
