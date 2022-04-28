import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Urls } from "../constants/urls";
import { LogRiego } from "../model/log-riego";

@Injectable()
export class LogRiegoService {
    constructor(private http: HttpClient) { }

    /**
     * Recupera todos los logs asociados a la valvula
     * @param valvulaId Id de la valvula a la que están asociados los logs
     * @returns 
     */
    getLogsByValvula(valvulaId: string): Promise<LogRiego[]> {
        return this.http.get<LogRiego[]>(Urls.LOGS_ENDPOINT + '/' + valvulaId).toPromise().then((logs: LogRiego[]) => {
            return logs;
        });
    }

    getLastLogByValvula(valvulaId: number): Promise<LogRiego> {
        return this.http.get<LogRiego[]>(Urls.LOGS_ENDPOINT + '/' + valvulaId + '/ultimo').toPromise().then((logs: LogRiego[]) => {
            if (logs && logs.length == 1) {
                return logs[0];
            }
        });
    }

    /**
     * Crea un LogRiego asociado a una elecctroValvula
     * @param logRiego 
     * @returns 
     */
    crearLogRiego(logRiego: LogRiego): Observable<LogRiego> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<LogRiego>(Urls.LOGS_ENDPOINT, logRiego, httpOptions);
    }
}