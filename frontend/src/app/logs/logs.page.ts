import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { LogRiego } from '../model/log-riego';
import { LogRiegoService } from '../service/logRiego.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.page.html',
  styleUrls: ['./logs.page.scss'],
})
export class LogsPage implements OnInit {

  valvulaId: string;
  logsRiego: LogRiego[];

  constructor(private router: ActivatedRoute, private logsService: LogRiegoService, private navController: NavController) {
    this.valvulaId = this.router.snapshot.paramMap.get('valvulaId');
  }


  ngOnInit() {
    this.logsService.getLogsByValvula(this.valvulaId).then((data) => {
      this.logsRiego = data;
    });
  }

  goBack() {
    this.navController.navigateBack(['/home'])
  }
}
