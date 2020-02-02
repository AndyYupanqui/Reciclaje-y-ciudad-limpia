import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { RegistroProvider } from '../../providers/registro/registro';


@Component({
  selector: 'page-mantenimiento',
  templateUrl: 'mantenimiento.html',
})
export class MantenimientoPage {

  timer: any;
  timer2: any;
  estado: any="0";
  estado2: any="0";
  contador1: any=0;
  contador2: any=0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public _us: UsuarioProvider,
              public _rs: RegistroProvider) {
  }

  ionViewDidLoad() {
    this.StartTimer();
    this.StartTimer2();
  }
  
  StartTimer(){
    this.timer = setTimeout(x => 
      {
        this._rs.getEspacio("JP1").subscribe(res => {
          if(this.contador1 == 5){
            this.contador1 = 0;
            alert("Debe hacer mantenimiento del sensor ultrasonido JP1");
          }
          if(this.estado == res.estado_ocupacion){
            //console.log(this.contador1);
          }
          else{
            this.estado = res.estado_ocupacion;
            this.contador1 = this.contador1 + 1;
            //console.log(this.contador1);
          }
        })  
        this.StartTimer();
      }, 1000);
  }

  StartTimer2(){
    this.timer2 = setTimeout(x => 
      {
        this._rs.getEspacio("M1").subscribe(res => {
          if(this.contador2 == 5){
            this.contador2 = 0;
            alert("Debe hacer mantenimiento del sensor ultrasonido M1");
          }
          if(this.estado2 == res.estado_ocupacion){
            //console.log(this.contador2);
          }
          else{
            this.estado2 = res.estado_ocupacion;
            this.contador2 = this.contador2 + 1;
            //console.log(this.contador2);
          }
        })  
        this.StartTimer2();
      }, 1000);
  }

}
