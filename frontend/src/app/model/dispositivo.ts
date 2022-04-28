export class Dispositivo {
    dispositivoId: number;
    nombre: string;
    ubicacion: string;
    electrovalvulaId: number;

    constructor(dispositivoId: number, nombre: string, ubicacion: string, electroValvulaId: any) {
        this.dispositivoId = dispositivoId;
        this.nombre = nombre;
        this.ubicacion = ubicacion;
        this.electrovalvulaId = electroValvulaId;
    }

    getDispositivoId() {
        return this.dispositivoId;
    }

    setDispositivoId(dispositivoId: any) {
        this.dispositivoId = dispositivoId;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }

    getUbicacion() {
        return this.ubicacion;
    }

    setUbicacion(ubicacion: string) {
        this.ubicacion = ubicacion;
    }

    getElectroValvulaId() {
        return this.electrovalvulaId;
    }

    setElectroValvulaId(electroValvulaId: any) {
        this.electrovalvulaId = electroValvulaId;
    }
}