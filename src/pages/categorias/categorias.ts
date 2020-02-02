import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';
//import { Geolocation } from '@ionic-native/geolocation';

import { CarritoProvider } from "../../providers/carrito/carrito";
import { UsuarioProvider } from "../../providers/usuario/usuario";
import { PorCategoriasPage } from "../index.paginas";
import { EstacionamientoPage } from "../index.paginas";
import { PhotoViewer } from '@ionic-native/photo-viewer';

import 'rxjs-compat/add/operator/map';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  //map: any;

  porCategorias = PorCategoriasPage;
  estacionamiento = EstacionamientoPage;
  view = new PhotoViewer();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private _us: UsuarioProvider,
              private _cs: CarritoProvider,
              public viewer: PhotoViewer,
              public platform: Platform) {
                // this.platform.ready().then(() =>{
                //   var photoUrl = "https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg";
                //   var title = "Foto Ejemplo";
                //   var options = {
                //     share: true
                //   }
                //   this.viewer.show(photoUrl, title, options);
                // })
  }

  ionViewDidLoad(){
    this.drawMap(this.view);
  }

  drawMap(view: PhotoViewer): void {

    let map = Leaflet.map('map').setView([-0.1836298, -78.4821206], 13);
    Leaflet.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: 'AppTuto',
      maxZoom: 18
    }).addTo(map);


     //web location
     map.locate({ setView: true});

     //when we have a location draw a marker and accuracy circle
     function onLocationFound(e) {
       var radius = Math.round(e.accuracy / 2);
 
       Leaflet.marker(e.latlng).addTo(map)
           .bindPopup("Estás dentro de los " + radius + " metros desde este punto").openPopup();

           Leaflet.marker({lat: -12.046848, lng: -77.001806}).addTo(map).bindPopup("Estacionamiento La Muralla <img src='https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg' style='max-width:100%;width:auto;height:auto;'>").on('click', ()=> {
          var photoUrl = "https://e.rpp-noticias.io/normal/2018/12/06/573857_721892.jpg";   
           var title = "Foto Ejemplo";
              var options = {
                share: true
              }
              view.show(photoUrl, title, options);})

           Leaflet.marker({lat: -12.046545, lng: -77.000514}).addTo(map).bindPopup("Estacionamiento Fenix");
           Leaflet.marker({lat: -12.082429, lng: -76.985826}).addTo(map).bindPopup("Estacionamiento Javier Prado");
           Leaflet.marker({lat: -12.053906, lng: -77.043302}).addTo(map).bindPopup("Estacionamiento Metro Alf. Ugarte");
           Leaflet.marker({lat: -11.995110539390058, lng: -77.0609673857689}).addTo(map).bindPopup("Estacionamiento Mega Plaza");
           Leaflet.marker({lat: -12.077637717148855, lng: -77.08165258169176}).addTo(map).bindPopup("Estacionamiento Plaza San Miguel");
           Leaflet.marker({lat: -12.057155, lng: -77.0801286}).addTo(map).bindPopup("Puerta 03 UNMSM <img src='/assets/imgs/Pta 3.jpg' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
           Leaflet.marker({lat: -12.059382, lng: -77.0794179}).addTo(map).bindPopup("Puerta 02 UNMSM <img src='/assets/imgs/Pta 3.jpg' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
           Leaflet.marker({lat: -12.0537523, lng: -77.0850158}).addTo(map).bindPopup("Puerta 07 UNMSM <img src='/assets/imgs/Pta 3.jpg' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
           Leaflet.marker({lat: -12.0610049, lng: -77.0864591}).addTo(map).bindPopup("Puerta 01   UNMSM <img src='/assets/imgs/Pta 3.jpg' alt='' style='max-width:100%;width:auto;height:auto;' onclick=''>");
 
       Leaflet.circle(e.latlng, radius).addTo(map);


      let ubicacion = document.getElementsByClassName('leaflet-marker-icon');
      for(var i=1; i<ubicacion.length; i++){
      ubicacion[i].setAttribute("id", "playa"+i);
      var playaid = document.getElementById("playa"+i);
      playaid.setAttribute("src","/assets/images/basura.png");
      }
     }
     map.on('locationfound', onLocationFound);

    //alert on location error
    function onLocationError(e) {
      alert(e.message);
    }

    function foto() {
      console.log("Pepe");
    }

    map.on('locationerror', onLocationError);

  }
}
