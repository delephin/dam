import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import * as Highcharts from 'highcharts';
import { Dispositivo } from '../model/dispositivo';
import { LogRiego } from '../model/log-riego';
import { Medicion } from '../model/medicion';
import { DispositivoService } from '../service/dispositivo.service';
import { LogRiegoService } from '../service/logRiego.service';
import { MedicionService } from '../service/medicion.service';
declare var require: any;
require('highcharts/highcharts-more')(Highcharts);
require('highcharts/modules/solid-gauge')(Highcharts);


@Component({
  selector: 'app-dispositivo',
  templateUrl: './dispositivo.page.html',
  styleUrls: ['./dispositivo.page.scss'],
})
export class DispositivoPage implements OnInit {

  dispositivoId: string;
  dispositivo: Dispositivo;
  lastLog: LogRiego;
  private valorObtenido: number = 0;
  public myChart;
  private chartOptions;


  constructor(private router: ActivatedRoute, private navController: NavController,
    private dispositivoService: DispositivoService, private logsService: LogRiegoService,
    public datepipe: DatePipe, private alertCtrl: AlertController,
    private medicionService: MedicionService) {
    this.dispositivoId = this.router.snapshot.paramMap.get('dispositivoId');

    setTimeout(() => {
      console.log("Cambio el valor del sensor");
      this.valorObtenido = 60;
      //llamo al update del chart para refrescar y mostrar el nuevo valor
      this.myChart.update({
        series: [{
          name: 'kPA',
          data: [this.valorObtenido],
          tooltip: {
            valueSuffix: ' kPA'
          }
        }]
      });
    }, 6000);
  }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.generarChart();

    this.dispositivoService.getDispositivo(this.dispositivoId).then(data => {
      this.dispositivo = data;

      this.logsService.getLastLogByValvula(this.dispositivo.electrovalvulaId).then(result => {
        this.lastLog = result;
      });
    });
  }

  generarChart() {
    this.chartOptions = {
      chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false
      }
      , title: {
        text: 'Sensor N° ' + this.dispositivoId
      }

      , credits: { enabled: false }


      , pane: {
        startAngle: -150,
        endAngle: 150
      }
      // the value axis
      , yAxis: {
        min: 0,
        max: 100,

        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 10,
        minorTickPosition: 'inside',
        minorTickColor: '#666',

        tickPixelInterval: 30,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        labels: {
          step: 2,
          rotation: 'auto'
        },
        title: {
          text: 'kPA'
        },
        plotBands: [{
          from: 0,
          to: 10,
          color: '#55BF3B' // green
        }, {
          from: 10,
          to: 30,
          color: '#DDDF0D' // yellow
        }, {
          from: 30,
          to: 100,
          color: '#DF5353' // red
        }]
      }
      ,

      series: [{
        name: 'kPA',
        data: [this.valorObtenido],
        tooltip: {
          valueSuffix: ' kPA'
        }
      }]

    };
    this.myChart = Highcharts.chart('highcharts', this.chartOptions);
  }

  goBack() {
    this.navController.navigateBack(['/home'])
  }

  operateValve() {

    this.presentAlertConfirm((this.lastLog?.apertura == 1) ? 'cerrar' : 'abrir');

  }

  openLogs() {
    this.navController.navigateRoot(['/logs/' + this.dispositivo.electrovalvulaId]);
  }

  async presentAlertConfirm(action: string) {
    const alert = await this.alertCtrl.create({
      header: 'Confirme',
      message: 'Desea ' + action + ' la valvula?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirmation cancelled');
          }
        }, {
          text: 'Confirmar',
          id: 'confirm-button',
          handler: () => {
            this.confirmedValveOperation();
          }
        }
      ]
    });

    await alert.present();
  }

  /**
   * Callback when the action is confirmed
   */
  confirmedValveOperation() {
    let date = this.datepipe.transform(new Date(), 'yyyy-MM-dd HH:mm:ss');

    this.addLog(date);

    /**
     * 0 = cerrado
     * 1 = abierto
     */
    if (this.lastLog?.apertura == 1) {
      this.addMedicion(date);
    }

  }

  addMedicion(date: string) {

    let medicion: Medicion = {
      dispositivoId: this.dispositivoId,
      fecha: date,
      valor: this.valorObtenido
    }

    this.medicionService.crearMedicion(medicion).subscribe(result => {
      console.log('Medicion created: ' + JSON.stringify(result));
    });

  }

  addLog(date: string) {

    let log: LogRiego = { apertura: (!this.lastLog || this.lastLog?.apertura == 1 ? 0 : 1), electroValvulaId: this.dispositivo.electrovalvulaId, fecha: date };

    this.logsService.crearLogRiego(log).subscribe(result => {
      console.log('Log Riego created: ' + JSON.stringify(result));
    });
  }
}