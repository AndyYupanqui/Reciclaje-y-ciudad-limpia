import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
//import 'rxjs/add/operator/map';
import 'rxjs-compat/add/operator/map';

@Injectable()
export class ProductosProvider {

  pagina:number = 0;
  productos:any[] = [];
  lineas:any[] = [];
  por_categoria:any[] = [];

  resultados:any[] = [];

  constructor(public http: Http) {

  }

}
