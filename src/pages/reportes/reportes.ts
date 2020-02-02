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

  monto1: number=0; monto2: number=0; monto3: number=0; monto4: number=0; monto5: number=0; monto6: number=0; monto7: number=0
  cantidad1: number=0; cantidad2: number=0; cantidad3: number=0; cantidad4: number=0; cantidad5: number=0; cantidad6: number=0; cantidad7: number=0;
  cJavierPrado: number=0;
  cMetro: number=0;
  cMegaPlaza: number=0;
  cPlaza: number=0;
  promedio: number=0;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              private _us: UsuarioProvider,
              private _rs: RegistroProvider) {
    
  }

  ionViewWillEnter() {
    this._rs.getTodasReservas().subscribe(res => {
      this.monto1 = 0; this.monto2 = 0; this.monto3 = 0; this.monto4 = 0; this.monto5 = 0; this.monto6 = 0; this.monto7 = 0;
      this.cantidad1 = 0; this.cantidad2 = 0; this.cantidad3 = 0; this.cantidad4 = 0; this.cantidad5 = 0; this.cantidad6 = 0; this.cantidad7 = 0;
      this.cJavierPrado = 0;
      this.cMetro = 0;
      this.cMegaPlaza = 0;
      this.cPlaza = 0;
      this.promedio = 0;
      for(var i=0; i<res.length; i++){
        res[i].estacionamiento.get().then(res => {
          var r:any;
          r = res;
          if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Javier Prado")
            this.cJavierPrado = this.cJavierPrado + 1;
          if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Metro Alf. Ugarte")
            this.cMetro = this.cMetro + 1;
          if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Mega Plaza")
            this.cMegaPlaza = this.cMegaPlaza + 1;
          if(r._document.proto.fields.nombre.stringValue == "Estacionamiento Plaza San Miguel")
            this.cPlaza = this.cPlaza + 1;
        });

        if(res[i].fecha.substring(0,8) == "9-7-2019"){
          this.monto1 = this.monto1 + res[i].total;
          this.cantidad1 = this.cantidad1 + 1;
        }
        if(res[i].fecha.substring(0,9) == "10-7-2019"){
          this.monto2 = this.monto2 + res[i].total;
          this.cantidad2 = this.cantidad2 + 1;
        }
        if(res[i].fecha.substring(0,9) == "11-7-2019"){
          this.monto3 = this.monto3 + res[i].total;
          this.cantidad3 = this.cantidad3 + 1;
        }
        if(res[i].fecha.substring(0,9) == "12-7-2019"){
          this.monto4 = this.monto4 + res[i].total;
          this.cantidad4 = this.cantidad4 + 1;
        }
        if(res[i].fecha.substring(0,9) == "13-7-2019"){
          this.monto5 = this.monto5 + res[i].total;
          this.cantidad5 = this.cantidad5 + 1;
        }
        if(res[i].fecha.substring(0,9) == "14-7-2019"){
          this.monto6 = this.monto6 + res[i].total;
          this.cantidad6 = this.cantidad6 + 1;
        }
        if(res[i].fecha.substring(0,9) == "15-7-2019"){
          this.monto7 = this.monto7 + res[i].total;
          this.cantidad7 = this.cantidad7 + 1;
        }
        this.promedio = this.promedio + (res[i].horas/(res.length)); 
      }
      setTimeout(() => {
        this.barChart = this.getBarChart();
        this.barChart2 = this.getBarChart2();
        this.lineChart = this.getLineChart();
      }, 500);
      setTimeout(() => {
        this.pieChart = this.getPieChart();
        this.doughnutChart = this.getDoughnutChart();
      }, 1000);
    });
    
  }


  getChart(context, charType, data, options?) {
    return new charJs(context, {
      data,
      options,
      type: charType
    });
  }

  getBarChart(){
    const data = {
      labels: ['9/07/19','10/07/19','11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
      datasets: [{
        label: 'Total (S/.)',
        data: [this.monto1,this.monto2,this.monto3,this.monto4,this.monto5,this.monto6,this.monto7],
        backgroundColor: [
          'rgb(20, 0, 255)',
          'rgb(20, 0, 255)',
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
      labels: ['9/07/19','10/07/19','11/07/19', '12/07/19', '13/07/19', '14/07/19', '15/07/19'],
      datasets: [{
        label: 'Reservaciones',
        data: [this.cantidad1,this.cantidad2,this.cantidad3,this.cantidad4,this.cantidad5,this.cantidad6,this.cantidad7],
        backgroundColor: [
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

  getLineChart(){
    const data = {
      labels: ['9/07/19', '15/07/19'],
      datasets: [{
        label: 'Promedio',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgb(0, 178, 255)',
        borderColor: 'rgb(231, 205, 35)',
        borderCapStyle: 'butt',
        borderJoinStyle: 'miter',
        pointRadius: 1,
        pointHitRadius: 10,
        data:[Math.round(this.promedio * 100) / 100, Math.round(this.promedio * 100) / 100],
        scanGaps: false,
      }
      // , {
      //   label: 'Meu segundo Dataset',
      //   fill: false,
      //   lineTension: 0.1,
      //   backgroundColor: 'rgb(117, 0, 49)',
      //   borderColor: 'rgb(51, 50, 46)',
      //   borderCapStyle: 'butt',
      //   borderJoinStyle: 'miter',
      //   pointRadius: 1,
      //   pointHitRadius: 10,
      //   data:[29, 135, 13, 70],
      //   scanGaps: false,
      // }
    ]
    }

    return this.getChart(this.lineCanvas.nativeElement, 'line', data)
  }

  getPieChart(){
    const data = {
      labels: ['Javier Prado', 'Metro Alf. Ugarte', 'Mega Plaza', 'Plaza San Miguel'],
      datasets: [{
        data: [this.cJavierPrado, this.cMetro, this.cMegaPlaza, this.cPlaza],
        backgroundColor: ['rgb(200, 6, 0)', 'rgb(36, 0, 255)', 'rgb(242, 255, 0)', 'rgb(24, 255, 0)']
      }]
    }

    return this.getChart(this.pieCanvas.nativeElement, 'pie', data);
  }

  getDoughnutChart(){
    const data = {
      labels: ['Javier Prado', 'Metro Alf. Ugarte', 'Mega Plaza', 'Plaza San Miguel'],
      datasets: [{
        label: 'Teste Chart',
        data: [this.cJavierPrado, this.cMetro, this.cMegaPlaza, this.cPlaza],
        backgroundColor: [
          'rgb(0, 244, 97)',
          'rgb(37, 39, 43)',
          'rgb(255, 207, 0)',
          'rgb(36, 0, 255)'
        ]
      }]
    }

    return this.getChart(this.doughnutCanvas.nativeElement, 'doughnut', data);
  }

}
