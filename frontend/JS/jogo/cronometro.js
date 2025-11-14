
// VARIAVEIS

let intervaloProgressivo = null, intervaloRegressivo = null;
let tempoTotalProgressivo = 0, tempoTotalRegressivo = 60;

// FORMATACAO DE TEMPO

function formatarTempo(totalSegundos) {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return "Tempo: " + `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// OBTER CONTAGEM REGRESSIVA - TEMPO
function obterTempoInicialPorTamanho(tamanho) {

    switch (tamanho) {
        case 4: 
            return 30; 
        case 36: 
            return 90; 
        case 64: 
            return 120; 
        default: // 4 x 4
            return 60;
    }
}

// CRONOMETRO - CONTAGEM REGRESSIVA

function configuracoesContronometroRegressivo() {
    tempoTotalRegressivo = obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
}

function iniciarContagemRegressiva() {
    if (intervaloRegressivo) {
        clearInterval(intervaloRegressivo);
    }

    tempoTotalRegressivo = obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
    
    cronometro.textContent = formatarTempo(tempoTotalRegressivo);

    intervaloRegressivo = setInterval(() => {
        tempoTotalRegressivo--;

        if (tempoTotalRegressivo <= 0) {
            const tempoGastoNaDerrota = obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
            
            salvarPartida('Derrota', tempoGastoNaDerrota)
                .then(() => {
                    alert('O tempo acabou!');
                    reiniciarJogo();
                });
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
}

function pararContagemRegressiva() {
    clearInterval(intervaloRegressivo);
    intervaloRegressivo = null;
}

function pararContagemProgressiva() {
    clearInterval(intervaloProgressivo);
    intervaloProgressivo = null;
    tempoTotalProgressivo = 0;
}

function obterTempoGastoFinal() {
    let tempoFinal = 0;
    const modo = estadoJogo.modoDeJogoAtual; 

    if (modo === 'Normal') {
        tempoFinal = tempoTotalProgressivo; 
    } 
    
    if (modo === 'Contra o Tempo') {
        const tempoInicial = obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
        tempoFinal = tempoInicial - tempoTotalRegressivo;
    } 

    return tempoFinal;
}
