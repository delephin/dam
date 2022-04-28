import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DispositivoService } from './service/dispositivo.service';
import { HttpClientModule } from '@angular/common/http';
import { MedicionService } from './service/medicion.service';
import { LogRiegoService } from './service/logRiego.service';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, DispositivoService, MedicionService, LogRiegoService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule { }
