import { Pipe, PipeTransform } from "@angular/core";
import { LogRiego } from "../model/log-riego";

@Pipe({ name: 'logFormatting' })
export class LogFormattingPipe implements PipeTransform {

    transform(logRiego: LogRiego): string {
        return 'Fecha de captura: ' + logRiego.fecha + ' | Value: ' + logRiego.apertura;
    }
}