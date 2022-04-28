import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LogsPageRoutingModule } from './logs-routing.module';

import { LogsPage } from './logs.page';
import { LogFormattingPipe } from '../pipe/log-formatting.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LogsPageRoutingModule
  ],
  declarations: [LogsPage, LogFormattingPipe]
})
export class LogsPageModule {}
