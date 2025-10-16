
// VARIAVEIS

let intervaloProgressivo = null, intervaloRegressivo = null;
let tempoTotalProgressivo = 0, tempoTotalRegressivo = 60;

// FORMATACAO DE TEMPO

function formatarTempo(totalSegundos) {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return "Tempo: " + `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// CRONOMETRO - CONTAGEM REGRESSIVA

function iniciarContagemRegressiva() {
    if (intervaloRegressivo) {
        clearInterval(intervaloRegressivo);
    }

    intervaloRegressivo = setInterval(() => {
        tempoTotalRegressivo--;

        if (tempoTotalRegressivo <= 0) {
            alert('O tempo acabou!');
            reiniciarJogo();
        }

        cronometro.textContent = formatarTempo(tempoTotalRegressivo);
    }, 1000);
}

// CRONOMETRO - CONTAGEM PROGRESSIVA

function iniciarContagemProgressiva() {
    tempoTotalProgressivo = 0;

    intervaloProgressivo = setInterval(() => {
        tempoTotalProgressivo++;
        cronometro.textContent = formatarTempo(tempoTotalProgressivo);
    }, 1000);
}

// PARAR CRONOMETROS

function pararCronometros() {
    pararContagemProgressiva();
    pararContagemRegressiva();
    
    let tempo = estadoJogo.modoDeJogoAtual == 'Normal' ? tempoTotalProgressivo : tempoTotalRegressivo;
    cronometro.textContent = formatarTempo(tempo);
    botaoIniciarDesistir.textContent = 'Iniciar jogo';
}

function pararContagemRegressiva() {
    clearInterval(intervaloRegressivo);
    intervaloRegressivo = null;
    tempoTotalRegressivo = 60;
}

function pararContagemProgressiva() {
    clearInterval(intervaloProgressivo);
    intervaloProgressivo = null;
    tempoTotalProgressivo = 0;
}
