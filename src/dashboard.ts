import { Corrida } from './index'

gerarDados()
preencherInfos()

function gerarDados() {

    const mes = (document.getElementById('select-mes') as HTMLSelectElement).value
    const c: string | null | Object[] = localStorage.getItem('corridas');
    let corridas = JSON.parse(c!)

    console.log(corridas)

    let data: any[] = []
    let data2: any[] = []
    let label: any[] = []

    let qtdCorridas = 0
    let kmTotal = 0
    let maiorTempoSeg = converterTempoParaSegundos(corridas[0].tempo)
    let maiorTempo = ''
    let maiorVelocidade = 0


    corridas.forEach((corrida: Corrida) => {

        if (corrida.data.split("-")[1] === mes) {
            label.push(new Date(corrida.data + "T00:00:00").toLocaleDateString('pt-BR'))
            data.push(corrida.distancia)



            let tempoSeg = converterTempoParaSegundos(corrida.tempo)

            if (tempoSeg >= maiorTempoSeg) {
                maiorTempo = corrida.tempo
            }

            let tempoMin = tempoSeg / 60
            let pace: Number = tempoMin / corrida.distancia

            data2.push(pace)

            var velocidade = corrida.distancia * 1000 / tempoSeg

            if (velocidade > maiorVelocidade) {
                maiorVelocidade = velocidade
            }
            console.log(maiorVelocidade)

            kmTotal += corrida.distancia
            qtdCorridas++
        }


    });

    const kmMedio = kmTotal / qtdCorridas

    const infoData = {
        corridas: qtdCorridas,
        kmTotal: Number(kmTotal).toFixed(1),
        kmMedio: Number(kmMedio).toFixed(1),
        maiorTempo: maiorTempo,
        maiorVelocidade: Number(maiorVelocidade).toFixed(1)

    }

    preencherInfos()
}


function converterTempoParaSegundos(tempo: String) {

    const tempoDividido = tempo.split(':')

    const hora = parseInt(tempoDividido[0]) * 3600
    const minutos = parseInt(tempoDividido[1]) * 60
    const segundos = parseInt(tempoDividido[2])

    return hora + minutos + segundos


}

function preencherInfos() {

    const i = localStorage.getItem('infoData')
    const infoData = JSON.parse(i!)

    document.getElementById('info-corridas')!.innerHTML = infoData.corridas
    document.getElementById('info-kmTotal')!.innerHTML = infoData.kmTotal
    document.getElementById('info-kmMedio')!.innerHTML = infoData.kmMedio
    document.getElementById('info-maiorVelocidade')!.innerHTML = infoData.maiorVelocidade


}