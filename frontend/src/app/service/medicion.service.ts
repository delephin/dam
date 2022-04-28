import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Urls } from "../constants/urls";
import { Medicion } from "../model/medicion";

@Injectable()
export class MedicionService {
    constructor(private http: HttpClient) { }

    getMedicionesByDispositivo(dispositivoId: string): Promise<Medicion[]> {
        return this.http.get<Medicion[]>(Urls.MEDICIONES_ENDPOINT + '/' + dispositivoId).toPromise().then((mediciones: Medicion[]) => {
            return mediciones;
        });
    }

    getMedicion(id: number): Observable<Medicion> {
        return this.http.get<Medicion>(Urls.MEDICIONES_ENDPOINT + '/' + id);
    }

    crearMedicion(medicion: Medicion): Observable<Medicion> {

        const httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        return this.http.post<Medicion>(Urls.MEDICIONES_ENDPOINT, medicion, httpOptions);
    }
}