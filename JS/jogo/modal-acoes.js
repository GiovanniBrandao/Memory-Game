// TRAPAÇA 
const botaoTrapaca = document.getElementById('botao-trapaca');
const habilitarTrapaca = document.getElementById('habilitar-trapaca');
var trapacaAtivada = false;

habilitarTrapaca.addEventListener('click', () => {
    const displayAtual = window.getComputedStyle(botaoTrapaca).display;

    if (displayAtual === 'none' || botaoTrapaca.style.display === 'none') {
        botaoTrapaca.style.display = 'block';
        habilitarTrapaca.textContent = 'Modo trapaça: ON';
    } else {
        botaoTrapaca.style.display = 'none';
        habilitarTrapaca.textContent = 'Modo trapaça: OFF';
    }
});

botaoTrapaca.addEventListener('click', () => {
    if (trapacaAtivada) {
        botaoTrapaca.textContent = 'Exibir peças ocultas: OFF'
        esconderCartas();
    } else {
        botaoTrapaca.textContent = 'Exibir peças ocultas: ON'
        revelarCartas();
    }

    trapacaAtivada = !trapacaAtivada;
});

// MODO DE JOGO E TABULEIRO 
const opcoes = {
    jogo: ["Normal", "Contra o Tempo"],
    tabuleiro: ["2 x 2", "4 x 4", "6 x 6", "8 x 8"]
};

let indicesAtuais = {
    jogo: 0,
    tabuleiro: 1
};

const valorModoJogo = document.getElementById('modo-jogo-valor');
const valorTabuleiro = document.getElementById('tabuleiro-valor');
const cronometro = document.getElementById('cronometro');
const botoesNavegacao = document.querySelectorAll('.botao-navegacao');

botoesNavegacao.forEach(botao => {
    botao.addEventListener('click', function () {
        const mudanca = this.getAttribute('data-action');
        const localMudanca = this.getAttribute('data-target');

        if (localMudanca && mudanca) {
            navegarConfiguracao(localMudanca, mudanca);
        }
    });
});

function navegarConfiguracao(localMudanca, mudanca) {
    let indiceAtual = indicesAtuais[localMudanca];
    const maxIndice = opcoes[localMudanca].length - 1;

    if (mudanca === 'anterior') {
        indiceAtual = indiceAtual > 0 ? indiceAtual - 1 : maxIndice;
    } else if (mudanca === 'proximo') {
        indiceAtual = indiceAtual < maxIndice ? indiceAtual + 1 : 0;
    }

    indicesAtuais[localMudanca] = indiceAtual;

    exibirValoresConfiguracao();

    if (localMudanca === 'tabuleiro' && typeof window.aplicarTamanhoTabuleiro === 'function') {
        window.aplicarTamanhoTabuleiro(opcoes.tabuleiro[indiceAtual]);
    }

    if (localMudanca === 'jogo' && typeof window.definirModoDeJogo === 'function') {
        window.definirModoDeJogo(opcoes.jogo[indiceAtual]);
    }
}

function exibirValoresConfiguracao() {
    const modoAtual = opcoes.jogo[indicesAtuais.jogo];

    valorModoJogo.textContent = modoAtual;
    valorTabuleiro.textContent = opcoes.tabuleiro[indicesAtuais.tabuleiro];

    if (modoAtual === "Contra o Tempo") {
        cronometro.textContent = formatarTempo(tempoTotalRegressivo);
    } 
}