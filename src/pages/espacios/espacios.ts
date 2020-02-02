import { Component, AfterViewInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CarritoProvider } from '../../providers/carrito/carrito';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { EspaciosDetallePage } from '../../pages/espacios-detalle/espacios-detalle';


@Component({
  selector: 'page-espacios',
  templateUrl: 'espacios.html',
})
export class EspaciosPage {

  estacionamiento:any = {};
  espacios = [];
  espaciosdetalle = EspaciosDetallePage;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public _cs: CarritoProvider,
              public _us: UsuarioProvider) {

    this.estacionamiento = this.navParams.get("estacionamiento");
    //this.espacios = this.estacionamiento.espacio;
    for(var i = 0; i < this.estacionamiento.espacio.length; i++){
            this.estacionamiento.espacio[i].get().then(res => {
              //console.log(res._document.proto.fields.id.stringValue);
              this.espacios.push(res._document.proto.fields);
              //console.log(res);
            })
    }

    //console.log(this.espacios);
  }

  // ionViewDidEnter(){

  //   document.getElementById("1").addEventListener('click',this.ejecutar,false);
  //   document.getElementById("3").addEventListener('click',this.ejecutar,false);
  //   document.getElementById("4").addEventListener('click',this.ejecutar,false);
  // }

  // ejecutar(evt){
  //   // var estado= new Array();
  //   // for (let i=0; i<4;i++){
  //   //   estado[i]=0;
  //   // }

  //   // console.log(this.id);
  //   // if(estado[this.id-1]===0){
  //   //   console.log(this.style.background);
  //   evt.target.style.background='#F77917';
  //   setTimeout(function() {
  //     evt.target.style.background = '#454545';
  //   }, 100);
      
  //   //   estado[this.id-1]=1;}
  //   // else{   
  //   //   this.style.background='#454545';
  //   //   estado[this.id-1]=0;
  //   // }
  // }


}
