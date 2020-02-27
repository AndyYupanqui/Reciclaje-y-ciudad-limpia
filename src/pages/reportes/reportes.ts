import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { RegistroProvider } from '../../providers/registro/registro';
import charJs from 'chart.js';

@Component({
  selector: 'page-reportes',
  templateUrl: 'reportes.html',
})
export class ReportesPage {

  @ViewChild('barCanvas') barCanvas;
  @ViewChild('barCanvas2') barCanvas2;
  @ViewChild('lineCanvas') lineCanvas;
  @ViewChild('pieCanvas') pieCanvas;
  @ViewChild('doughnutCanvas') doughnutCanvas;

  barChart: any;
  barChart2: any;
  lineChart: any;
  pieChart: any;
  doughnutChart: any;

  // monto1: number=0; monto2: number=0; monto3: number=0; monto4: number=0; monto5: number=0; monto6: number=0; monto7: number=0
  // cantidad1: number=0; cantidad2: number=0; cantidad3: number=0; cantidad4: number=0; cantidad5: number=0; cantidad6: number=0; cantidad7: number=0;
  // cJavierPrado: number=0;
  // cMetro: number=0;
  // cMegaPlaza: number=0;
  // cPlaza: number=0;
  // promedio: number=0;

  montoPlasticos: number = 0; montoCarton: number = 0; montoVidrios: number = 0; montoPapel: number = 0; montoPilas: number = 0;
  monto20: number= 0; monto21: number= 0; monto22: number= 0; monto23: number= 0; monto24: number= 0; monto25: number= 0; monto26: number= 0; monto27: number= 0;
  cPlasticos: number = 0; cCarton: number = 0; cVidrios: number = 0; cPapel: number = 0; cPilas: number = 0;
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {
    
  }

  ionViewWillEnter() {
    this._rs.getReciclaje().subscribe(res => {
      this.montoPlasticos = 0; this.montoCarton = 0; this.montoVidrios = 0; this.montoPapel = 0; this.montoPilas = 0;
      this.monto20 = 0; this.monto21 = 0; this.monto22 = 0; this.monto23 = 0; this.monto24 = 0; this.monto25 = 0; this.monto26 = 0; this.monto27 = 0;
      this.cPlasticos = 0; this.cCarton = 0; this.cVidrios = 0; this.cPapel = 0; this.cPilas = 0;
      //console.log(res);
      for(var i=0; i<res.length; i++){
        for(var j=0; j<res[i].reciclaje.length; j++){
          if(res[i].reciclaje[j].tipo == "Plásticos"){
            this.montoPlasticos = this.montoPlasticos + res[i].reciclaje[j].subtotal;
            this.cPlasticos = this.cPlasticos + Number(res[i].reciclaje[j].cantidad);
          }
          if(res[i].reciclaje[j].tipo == "Cartón"){
            this.montoCarton = this.montoCarton + res[i].reciclaje[j].subtotal;
            this.cCarton = this.cCarton + Number(res[i].reciclaje[j].cantidad);
          }
          if(res[i].reciclaje[j].tipo == "Vidrios"){
            this.montoVidrios = this.montoVidrios + res[i].reciclaje[j].subtotal;
            this.cVidrios = this.cVidrios + Number(res[i].reciclaje[j].cantidad);
          }
          if(res[i].reciclaje[j].tipo == "Papel blanco"){
            this.montoPapel = this.montoPapel + res[i].reciclaje[j].subtotal;
            this.cPapel = this.cPapel + Number(res[i].reciclaje[j].cantidad);
          }
          if(res[i].reciclaje[j].tipo == "Baterías/Pilas"){
            this.montoPilas = this.montoPilas + res[i].reciclaje[j].subtotal;
            this.cPilas = this.cPilas + Number(res[i].reciclaje[j].cantidad);
          }
        }
        if(res[i].fecha == "20-02-2020"){
          this.monto20 = this.monto20 + res[i].total;
        }
        if(res[i].fecha == "21-02-2020"){
          this.monto21 = this.monto21 + res[i].total;
        }
        if(res[i].fecha == "22-02-2020"){
          this.monto22 = this.monto22 + res[i].total;
        }
        if(res[i].fecha == "23-02-2020"){
          this.monto23 = this.monto23 + res[i].total;
        }
        if(res[i].fecha == "24-02-2020"){
          this.monto24 = this.monto24 + res[i].total;
        }
        if(res[i].fecha == "25-02-2020"){
          this.monto25 = this.monto25 + res[i].total;
        }
        if(res[i].fecha == "26-02-2020"){
          this.monto26 = this.monto26 + res[i].total;
        }
        if(res[i].fecha == "27-02-2020"){
          this.monto27 = this.monto27 + res[i].total;
        }
      }
      setTimeout(() => {
        this.barChart = this.getBarChart();
        this.barChart2 = this.getBarChart2();
        // this.lineChart = this.getLineChart();
      }, 500);
      setTimeout(() => {
        this.pieChart = this.getPieChart();
        this.doughnutChart = this.getDoughnutChart();
      }, 1000);
    })
    // this._rs.getTodasReservas().subscribe(res => {
    //   this.monto1 = 0; this.monto2 = 0; this.monto3 = 0; this.monto4 = 0; this.monto5 = 0; this.monto6 = 0; this.monto7 = 0;
    //   this.cantidad1 = 0; this.cantidad2 = 0; this.cantidad3 = 0; this.cantidad4 = 0; this.cantidad5 = 0; this.cantidad6 = 0; this.cantidad7 = 0;
    //   this.cJavierPrado = 0;
    //   this.cMetro = 0;
    //   this.cMegaPlaza = 0;
    //   this.cPlaza = 0;
    //   this.promedio = 0;
    //   for(var i=0; i<res.length; i++){
    //     res[i].estacionamiento.get().then(res => {
    //       var r:any;
    //       r = res;
    //       if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Javier Prado")
    //         this.cJavierPrado = this.cJavierPrado + 1;
    //       if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Metro Alf. Ugarte")
    //         this.cMetro = this.cMetro + 1;
    //       if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Mega Plaza")
    //         this.cMegaPlaza = this.cMegaPlaza + 1;
    //       if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Plaza San Miguel")
    //         this.cPlaza = this.cPlaza + 1;
    //     });

    //     if(res[i].fecha.substring(0,8) == "9-7-2019"){
    //       this.monto1 = this.monto1 + res[i].total;
    //       this.cantidad1 = this.cantidad1 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "10-7-2019"){
    //       this.monto2 = this.monto2 + res[i].total;
    //       this.cantidad2 = this.cantidad2 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "11-7-2019"){
    //       this.monto3 = this.monto3 + res[i].total;
    //       this.cantidad3 = this.cantidad3 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "12-7-2019"){
    //       this.monto4 = this.monto4 + res[i].total;
    //       this.cantidad4 = this.cantidad4 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "13-7-2019"){
    //       this.monto5 = this.monto5 + res[i].total;
    //       this.cantidad5 = this.cantidad5 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "14-7-2019"){
    //       this.monto6 = this.monto6 + res[i].total;
    //       this.cantidad6 = this.cantidad6 + 1;
    //     }
    //     if(res[i].fecha.substring(0,9) == "15-7-2019"){
    //       this.monto7 = this.monto7 + res[i].total;
    //       this.cantidad7 = this.cantidad7 + 1;
    //     }
    //     this.promedio = this.promedio + (res[i].horas/(res.length)); 
    //   }
    // });
    
  }


  getChart(context, charType, data, options?) {
    return new charJs(context, {
      data,
      options,
      type: charType
    });
  }

  // getBarChart(){
  //   const data = {
  //     labels: ['9/07/19','10/07/19','11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
  //     datasets: [{
  //       label: 'Total (S/.)',
  //       data: [this.monto1,this.monto2,this.monto3,this.monto4,this.monto5,this.monto6,this.monto7],
  //       backgroundColor: [
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)',
  //         'rgb(20, 0, 255)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   };

  //   const options = {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   }

  //   return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  // }

  // getBarChart2(){
  //   const data = {
  //     labels: ['9/07/19','10/07/19','11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
  //     datasets: [{
  //       label: 'Reservaciones',
  //       data: [this.cantidad1,this.cantidad2,this.cantidad3,this.cantidad4,this.cantidad5,this.cantidad6,this.cantidad7],
  //       backgroundColor: [
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)',
  //         'rgb(200, 6, 0)'
  //       ],
  //       borderWidth: 1
  //     }]
  //   };

  //   const options = {
  //     scales: {
  //       yAxes: [{
  //         ticks: {
  //           beginAtZero: true
  //         }
  //       }]
  //     }
  //   }

  //   return this.getChart(this.barCanvas2.nativeElement, 'bar', data, options);
  // }

  getBarChart(){
    const data = {
      labels: ['Plásticos','Cartón','Vidrios', 'Papel blanco', 'Baterías/Pilas'],
      datasets: [{
        label: 'Total (S/.)',
        data: [this.montoPlasticos,this.montoCarton,this.montoVidrios,this.montoPapel,this.montoPilas],
        backgroundColor: [
          'rgb(20, 0, 255)',
          'rgb(20, 0, 255)',
          'rgb(20, 0, 255)',
          'rgb(20, 0, 255)',
          'rgb(20, 0, 255)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.barCanvas.nativeElement, 'bar', data, options);
  }

  getBarChart2(){
    const data = {
      labels: ['20/02/2020','21/02/2020','22/02/2020', '23/02/2020', '24/02/2020', '25/02/2020', '26/02/2020', '27/02/2020'],
      datasets: [{
        label: 'Total (S/.)',
        data: [this.monto20,this.monto21,this.monto22,this.monto23,this.monto24,this.monto25,this.monto26,this.monto27],
        backgroundColor: [
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)',
          'rgb(200, 6, 0)'
        ],
        borderWidth: 1
      }]
    };

    const options = {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }

    return this.getChart(this.barCanvas2.nativeElement, 'bar', data, options);
  }

  // getLineChart(){
  //   const data = {
  //     labels: ['9/07/19', '15/07/19'],
  //     datasets: [{
  //       label: 'Promedio',
  //       fill: false,
  //       lineTension: 0.1,
  //       backgroundColor: 'rgb(0, 178, 255)',
  //       borderColor: 'rgb(231, 205, 35)',
  //       borderCapStyle: 'butt',
  //       borderJoinStyle: 'miter',
  //       pointRadius: 1,
  //       pointHitRadius: 10,
  //       data:[Math.round(this.promedio * 100) / 100, Math.round(this.promedio * 100) / 100],
  //       scanGaps: false,
  //     }
  //     // , {
  //     //   label: 'Meu segundo Dataset',
  //     //   fill: false,
  //     //   lineTension: 0.1,
  //     //   backgroundColor: 'rgb(117, 0, 49)',
  //     //   borderColor: 'rgb(51, 50, 46)',
  //     //   borderCapStyle: 'butt',
  //     //   borderJoinStyle: 'miter',
  //     //   pointRadius: 1,
  //     //   pointHitRadius: 10,
  //     //   data:[29, 135, 13, 70],
  //     //   scanGaps: false,
  //     // }
  //   ]
  //   }

  //   return this.getChart(this.lineCanvas.nativeElement, 'line', data)
  // }

  getPieChart(){
    const data = {
      labels: ['Plásticos','Cartón','Vidrios', 'Papel blanco', 'Baterías/Pilas'],
      datasets: [{
        data: [this.montoPlasticos,this.montoCarton,this.montoVidrios,this.montoPapel,this.montoPilas],
        backgroundColor: ['rgb(200, 6, 0)', 'rgb(36, 0, 255)', 'rgb(242, 255, 0)', 'rgb(24, 255, 0)', 'rgb(37, 39, 43)'], 
      }]
    }

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getDoughnutChart(){
    const data = {
      labels: ['Plásticos','Cartón','Vidrios', 'Papel blanco', 'Baterías/Pilas'],
      datasets: [{
        label: 'Cantidad (Kg.)',
        data: [this.cPlasticos,this.cCarton,this.cVidrios,this.cPapel,this.cPilas],
        backgroundColor: [
          'rgb(0, 244, 97)',
          'rgb(37, 39, 43)',
          'rgb(255, 207, 0)',
          'rgb(36, 0, 255)',
          'rgb(200, 6, 0)'
        ]
      }]
    }

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
  }

}
