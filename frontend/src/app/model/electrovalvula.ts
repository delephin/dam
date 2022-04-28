export class ElectroValvula {

    electroValvulaId: number;
    nombre: string;

    constructor( electroValvulaId: number, nombre: string){
        this.electroValvulaId = electroValvulaId;
        this.nombre = nombre;
    }

    getElectrovalvula(){
        return this.electroValvulaId;
    }

    setElectrovalvula(electroValvulaId: number){
        this.electroValvulaId = electroValvulaId;
    }

    getNombre() {
        return this.nombre;
    }

    setNombre(nombre: string) {
        this.nombre = nombre;
    }
}