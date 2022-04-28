import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Urls } from "../constants/urls";
import { Dispositivo } from "../model/dispositivo";

@Injectable()
export class DispositivoService {
    constructor(private http: HttpClient) { }

    getDispositivos(): Promise<Dispositivo[]> {
        return this.http.get<Dispositivo[]>(Urls.DISPOSITIVOS_ENDPOINT).toPromise().then((dispositivos: Dispositivo[]) => {
            return dispositivos;
        });
    }

    getDispositivo(id: string): Promise<Dispositivo> {
        return this.http.get<Dispositivo[]>(Urls.DISPOSITIVOS_ENDPOINT + '/' + id).toPromise().then((dispositivo: Dispositivo[]) => {
            if (dispositivo && dispositivo.length == 1) {
                return dispositivo[0];
            }
        });
    }
}