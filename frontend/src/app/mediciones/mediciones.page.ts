import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Medicion } from '../model/medicion';
import { MedicionService } from '../service/medicion.service';

@Component({
  selector: 'app-mediciones',
  templateUrl: './mediciones.page.html',
  styleUrls: ['./mediciones.page.scss'],
})
export class MedicionesPage implements OnInit {

  dispositivoId: string;
  mediciones: Medicion[];

  constructor(private router: ActivatedRoute, private medicionService: MedicionService) {
    this.dispositivoId = this.router.snapshot.paramMap.get('dispositivoId');
  }

  ngOnInit() {
    this.medicionService.getMedicionesByDispositivo(this.dispositivoId).then((data) => {
      this.mediciones = data;
    });
  }
}
