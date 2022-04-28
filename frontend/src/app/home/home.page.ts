import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Dispositivo } from '../model/dispositivo';
import { DispositivoService } from '../service/dispositivo.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  dispositivos: Dispositivo[];

  constructor(private dispositivoService: DispositivoService, private router: Router) { }

  ngOnInit() {
    this.getDispositivos();
  }

  getDispositivos() {
    this.dispositivoService.getDispositivos().then((dispositivos) => {
      this.dispositivos = dispositivos;
    });
  }
}
