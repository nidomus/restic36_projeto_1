export class Corrida {
    id: string;
    data: string;
    distancia: number;
    tempo: string;
    ganho: number;

    constructor(id: string, data: string, distancia: number, tempo: string, ganho: number) {
        this.id = id;
        this.data = data;
        this.distancia = distancia;
        this.tempo = tempo;
        this.ganho = ganho;
    }

}