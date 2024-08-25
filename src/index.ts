// localStorage.removeItem('corridas');

import './style.css'

import './dashboard'

renderizarCorridas()

export function salvarCorrida(): boolean {

    try {

        const data: HTMLInputElement | null = <HTMLInputElement>document.getElementById('data')
        const distancia: HTMLInputElement | null = <HTMLInputElement>document.getElementById('distancia')
        const horas: HTMLInputElement | null = <HTMLInputElement>document.getElementById('horas')
        const minutos: HTMLInputElement | null = <HTMLInputElement>document.getElementById('minutos')
        const segundos: HTMLInputElement | null = <HTMLInputElement>document.getElementById('segundos')
        const elevacao: HTMLInputElement | null = <HTMLInputElement>document.getElementById('ganho')


        const tempo: Date = new Date()

        tempo.setHours(parseInt(horas.value))
        tempo.setMinutes(parseInt(minutos.value))
        tempo.setSeconds(parseInt(segundos.value))


        const corrida: Object = { "data": data?.value, "distancia": distancia?.value, "tempo": tempo.toLocaleTimeString('pt-br'), "ganho": elevacao?.value }


        adicionarCorrida(corrida)


        data.value = distancia.value = horas.value = minutos.value = segundos.value = elevacao.value = ''

    } catch (error) {
        console.log(error)
    }

    renderizarCorridas()
    return false;

};

// Expondo a função no objeto global
(window as any).salvarCorrida = salvarCorrida;


function adicionarCorrida(corrida: Object) {
    let corridas: string | Object[] | null = localStorage.getItem('corridas');
    if (corridas == null) {
        corridas = [];
    } else {
        corridas = JSON.parse(corridas);
    }
    (corridas as Object[]).push(corrida);
    localStorage.setItem('corridas', JSON.stringify(corridas));

    alert('Corrida cadastrada!');

}


function renderizarCorridas() {
    try {

        let c = localStorage.getItem('corridas');

        if (c == null) {
            (document.getElementById('tabela') as HTMLElement).style.display = 'none';
        } else {
            (document.getElementById('mensagem') as HTMLElement).style.display = 'none';
            const tabela = document.getElementById('corpo');

            const corridas = JSON.parse(c)

            limparTabela()

            corridas.forEach(function (run: Corrida) {
                const linha = document.createElement('tr');
                linha.className = 'linha'

                const tdData = document.createElement('td');
                const noData = document.createTextNode(run.data);
                tdData.appendChild(noData);

                const tdDistancia = document.createElement('td');
                const noDistancia = document.createTextNode(run.distancia + 'km');
                tdDistancia.appendChild(noDistancia);

                const tdTempo = document.createElement('td');
                const noTempo = document.createTextNode(run.tempo);
                tdTempo.appendChild(noTempo);

                const tdGanho = document.createElement('td');
                const noGanho = document.createTextNode('' + run.ganho);
                tdGanho.appendChild(noGanho);

                const tdDelete = document.createElement('td');
                const btnDelete = document.createElement('button')
                const noDelete = document.createElement('span')
                btnDelete.classList.add("del-button")
                noDelete.innerHTML = "Apagar"
                btnDelete.appendChild(noDelete);
                btnDelete.addEventListener('click', function () { alert('teste') })
                tdDelete.appendChild(btnDelete)

                linha.appendChild(tdData);
                linha.appendChild(tdDistancia);
                linha.appendChild(tdTempo);
                linha.appendChild(tdGanho);
                linha.appendChild(tdDelete);
                (tabela as HTMLElement).appendChild(linha);
            });
        }
    } catch (error) {
        console.log(error)
    }
}


function limparTabela() {

    var linhas = document.querySelectorAll('.linha')

    linhas.forEach(linha => {

        linha.remove()

    })

}


export class Corrida {
    data: string;
    distancia: number;
    tempo: string;
    ganho: number;

    constructor(data: string, distancia: number, tempo: string, ganho: number) {
        this.data = data;
        this.distancia = distancia;
        this.tempo = tempo;
        this.ganho = ganho;
    }

}