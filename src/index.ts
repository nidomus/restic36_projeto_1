// localStorage.removeItem('corridas');

import { Corrida } from './corrida'

import './assets/css/main.css'

renderizarCorridas()
gerarDados()
preencherInfos()

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

        const timestamp = new Date()
        const corrida: Object = { 'id': timestamp, "data": data?.value, "distancia": distancia?.value, "tempo": tempo.toLocaleTimeString('pt-br'), "ganho": elevacao?.value }


        adicionarCorrida(corrida)



        data.value = distancia.value = horas.value = minutos.value = segundos.value = elevacao.value = ''

    } catch (error) {
        console.log(error)
    }

    renderizarCorridas()
    gerarDados()
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


}
function apagarCorrida(id: string) {
    let corridas: Corrida[] = JSON.parse(localStorage.getItem('corridas') || '[]');

    (corridas as Object[]) = corridas.filter((corrida: Corrida) => corrida.id !== id);
    localStorage.setItem('corridas', JSON.stringify(corridas));
    renderizarCorridas()
    gerarDados()

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
                const noGanho = document.createTextNode(run.ganho + "m");
                tdGanho.appendChild(noGanho);

                const tdDelete = document.createElement('td');
                const btnDelete = document.createElement('button')
                const noDelete = document.createElement('span')
                btnDelete.classList.add("del-button")
                noDelete.innerHTML = "Apagar"
                btnDelete.appendChild(noDelete);
                btnDelete.addEventListener('click', function () { apagarCorrida(run.id) })
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


function gerarDados() {

    let corridas: Corrida[] = JSON.parse(localStorage.getItem('corridas') || '[]');


    if (corridas.length == 0) {
        localStorage.setItem('infoData', '[]')
        preencherInfos()
        return
    }

    let data: any[] = []
    let data2: any[] = []
    let label: any[] = []

    let qtdCorridas = 0
    let kmTotal = 0
    let maiorTempoSeg = converterTempoParaSegundos(corridas[0].tempo)
    let maiorTempo = ''
    let maiorVelocidade = 0
    let tempoTotal = 0

    corridas.forEach((corrida: Corrida) => {

        label.push(new Date(corrida.data + "T00:00:00").toLocaleDateString('pt-BR'))
        data.push(corrida.distancia)

        let tempoSeg = converterTempoParaSegundos(corrida.tempo)

        if (tempoSeg >= maiorTempoSeg) {
            maiorTempo = corrida.tempo
        }

        let tempoMin = tempoSeg / 60
        let pace: Number = tempoMin / Number(corrida.distancia)

        data2.push(pace)

        var velocidade = corrida.distancia * 1000 / tempoSeg

        if (velocidade > maiorVelocidade) {
            maiorVelocidade = velocidade
        }
        console.log(maiorVelocidade)

        kmTotal += Number(corrida.distancia)
        tempoTotal += tempoSeg
        qtdCorridas++

    });

    const kmMedio = kmTotal / qtdCorridas

    const infoData = {
        corridas: qtdCorridas,
        kmTotal: Number(kmTotal).toFixed(1),
        kmMedio: Number(kmMedio).toFixed(1),
        maiorTempo: maiorTempo,
        tempoTotal: converterSegundosParaTempo(tempoTotal),
        maiorVelocidade: Number(maiorVelocidade).toFixed(1)
    }

    localStorage.setItem('infoData', JSON.stringify(infoData))
    preencherInfos()
}


function converterTempoParaSegundos(tempo: String) {

    const tempoDividido = tempo.split(':')
    const hora = parseInt(tempoDividido[0]) * 3600
    const minutos = parseInt(tempoDividido[1]) * 60
    const segundos = parseInt(tempoDividido[2])
    return hora + minutos + segundos

}

function converterSegundosParaTempo(seconds: number): string {

    const horas = Math.floor(seconds / 3600);
    const minutos = Math.floor((seconds % 3600) / 60);
    const segundos = seconds % 60;

    return `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;
}


function preencherInfos() {

    const i = localStorage.getItem('infoData')
    const infoData = JSON.parse(i!)

    if (infoData === null) {
        return
    }

    document.getElementById('info-corridas')!.innerHTML = infoData.corridas ? infoData.corridas : '-'
    document.getElementById('info-kmTotal')!.innerHTML = infoData.kmTotal ? infoData.kmTotal : '-'
    document.getElementById('info-kmMedio')!.innerHTML = infoData.kmMedio ? infoData.kmMedio : '-'
    document.getElementById('info-tempoTotal')!.innerHTML = infoData.tempoTotal ? infoData.tempoTotal : '-'
    document.getElementById('info-maiorVelocidade')!.innerHTML = infoData.maiorVelocidade ? infoData.maiorVelocidade : '-'

}
