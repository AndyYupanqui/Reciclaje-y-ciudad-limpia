import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Camera } from '@ionic-native/camera';

import { HttpModule } from '@angular/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
//import { CarritoProvider } from '../providers/carrito/carrito';
//import { ProductosProvider } from '../providers/productos/productos';
//import { UsuarioProvider } from '../providers/usuario/usuario';


// storage
import { IonicStorageModule } from '@ionic/storage';

// servicios
import { CarritoProvider, UsuarioProvider, ProductosProvider, RegistroProvider  }  from "../providers/index.services";

// Paginas
import { CarritoPage,
         MapaPage,
         LoginPage,
         OrdenesPage,
         OrdenesDetallePage,
         PublicacionPage,
         TabsPage,
         BusquedaPage,
         ProductoPage,
         RegistrarsePage,
         CompraPage,
         TarjetaPage,
         PaypalPage,
         EstacionamientoPage,
         EstacionamientoDetallePage,
         EspaciosPage,
         EspaciosDetallePage,
         HistorialPage,
         ReportesPage,
         MantenimientoPage,
         ResiduosPage,
         VolumenPage,
         FotoPage,
         AgregarReciclajePage,
         CantidadPage,
         DetalleReciclajePage} from "../pages/index.paginas";

export const firebaseConfig = {
  apiKey: "AIzaSyDKkhH0qtvg7FFP5k8SM4eY1gKVavB-KxE",
  authDomain: "paginaweb-6a5ae.firebaseapp.com",
  databaseURL: "https://paginaweb-6a5ae.firebaseio.com",
  projectId: "paginaweb-6a5ae",
  storageBucket: "paginaweb-6a5ae.appspot.com",
  messagingSenderId: "668264152386"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    CarritoPage,
    MapaPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PublicacionPage,
    TabsPage,
    BusquedaPage,
    ProductoPage,
    RegistrarsePage,
    CompraPage,
    TarjetaPage,
    PaypalPage,
    EstacionamientoPage,
    EstacionamientoDetallePage,
    EspaciosPage,
    EspaciosDetallePage,
    HistorialPage,
    ReportesPage,
    MantenimientoPage,
    ResiduosPage,
    VolumenPage,
    FotoPage,
    AgregarReciclajePage,
    CantidadPage,
    DetalleReciclajePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule 
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    CarritoPage,
    MapaPage,
    LoginPage,
    OrdenesPage,
    OrdenesDetallePage,
    PublicacionPage,
    TabsPage,
    BusquedaPage,
    ProductoPage,
    RegistrarsePage,
    CompraPage,
    TarjetaPage,
    PaypalPage,
    EstacionamientoPage,
    EstacionamientoDetallePage,
    EspaciosPage,
    EspaciosDetallePage,
    HistorialPage,
    ReportesPage,
    MantenimientoPage,
    ResiduosPage,
    VolumenPage,
    FotoPage,
    AgregarReciclajePage,
    CantidadPage,
    DetalleReciclajePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CarritoProvider,
    UsuarioProvider,
    ProductosProvider,
    RegistroProvider,
    Geolocation,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    PhotoViewer,
    Camera
  ]
})
export class AppModule {}
