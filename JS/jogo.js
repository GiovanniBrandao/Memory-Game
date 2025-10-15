let cartas;
let cartaVirada = false;
let travarTabuleiro = false;
let cartaUm, cartaDois;
let tamTabuleiro = 16;
let jogoIniciado = false;
let jogadas = 0;
let modoTrapacaAtivo = false;
let modoDeJogoAtual = 'Normal';
let cronometroInterval;
let segundosPassados = 0;
let paresEncontrados = 0;



const ICONES_DISPONIVEIS = [
    { name: 'coracao', src: '../Resources/Images/coracao.svg' },
    { name: 'pet', src: '../Resources/Images/pet.svg' },
    { name: 'arvores', src: '../Resources/Images/arvores.svg' },
    { name: 'foguete', src: '../Resources/Images/foguete.svg' },
    { name: 'chave', src: '../Resources/Images/chave.svg' },
    { name: 'gota', src: '../Resources/Images/gota.svg' },
    { name: 'coroa', src: '../Resources/Images/coroa.svg' },
    { name: 'bola', src: '../Resources/Images/bola.svg' },
    { name: 'apito', src: '../Resources/Images/apito.svg' },
    { name: 'colmeia', src: '../Resources/Images/colmeia.svg' },
    { name: 'copo', src: '../Resources/Images/copo.svg' },
    { name: 'croissant', src: '../Resources/Images/croissant.svg' },
    { name: 'folha', src: '../Resources/Images/folha.svg' },
    { name: 'grama', src: '../Resources/Images/grama.svg' },
    { name: 'hambuerguer', src: '../Resources/Images/hamburguer.svg' },
    { name: 'lampada', src: '../Resources/Images/lampada.svg' },
    { name: 'lua', src: '../Resources/Images/lua.svg' },
    { name: 'mala', src: '../Resources/Images/mala.svg' },
    { name: 'medico', src: '../Resources/Images/medico.svg' },
    { name: 'microfone', src: '../Resources/Images/microfone.svg' },
    { name: 'montanha', src: '../Resources/Images/montanha.svg' },
    { name: 'peso', src: '../Resources/Images/peso.svg' },
    { name: 'piano', src: '../Resources/Images/piano.svg' },
    { name: 'planeta', src: '../Resources/Images/planeta.svg' },
    { name: 'quimica', src: '../Resources/Images/quimica.svg' },
    { name: 'relogio', src: '../Resources/Images/relogio.svg' },
    { name: 'seringa', src: '../Resources/Images/seringa.svg' },
    { name: 'som', src: '../Resources/Images/som.svg' },
    { name: 'surfe', src: '../Resources/Images/surfe.svg' },
    { name: 'videogame', src: '../Resources/Images/videogame.svg' },
    { name: 'circulo', src: '../Resources/Images/circulo.svg' },
    { name: 'pipa', src: '../Resources/Images/pipa.svg' },
];

const tabuleiro = document.querySelector('.tabuleiro');
const botaoIniciarDesistir = document.getElementById('botao-iniciar-desistir');
const exibirJogadas = document.getElementById('jogadas');
const cronometroNormalDisplay = document.getElementById('cronometro-normal');
const tempoRegressivoDisplay = document.getElementById('tempo');

botaoIniciarDesistir.addEventListener('click', controlarInicioDesistencia);

function revelarCartas() {
    modoTrapacaAtivo = true;
    const cartasAtuais = document.querySelectorAll('.card');
    cartasAtuais.forEach(carta => {
        carta.classList.add('virada');
        carta.removeEventListener('click', virarCarta);
    });
}

function esconderCartas() {
    modoTrapacaAtivo = false;
    const cartasAtuais = document.querySelectorAll('.card');
    cartasAtuais.forEach(carta => {
        if (!carta.classList.contains('acertada')) {
            carta.classList.remove('virada');
        }
        carta.addEventListener('click', virarCarta);
    });
}

function controlarInicioDesistencia() {
    if (jogoIniciado) {
        reiniciarJogo();
        botaoIniciarDesistir.textContent = 'Iniciar jogo';
        alert('Você desistiu do jogo.');
    } else {
        jogoIniciado = true;
        botaoIniciarDesistir.textContent = 'Desistir do jogo';
    }
}

function ganhou() {

    alert('Parabéns, você ganhou!');
    reiniciarJogo();
}


function virarCarta() {
    if (!jogoIniciado) return;

    if (travarTabuleiro) return;
    if (this === cartaUm) return;

    if (!cronometroInterval && modoDeJogoAtual === 'Normal') {
        iniciarCronometroNormal();
    }

    this.classList.add('virada');

    if (!cartaVirada) {
        cartaVirada = true;
        cartaUm = this;
        return;
    }

    cartaDois = this;
    verMatch();
    jogadas++;
    exibirJogadas.textContent = 'Jogadas: ' + jogadas;
}
function verMatch() {
    const isMatch = cartaUm.dataset.framework === cartaDois.dataset.framework;
    isMatch ? desabilitarCartas() : desvirarCartas();
}

function reiniciarJogo() {

    gerarImagens();
    resetarTabuleiro();

    jogadas = 0;
    exibirJogadas.textContent = 'Jogadas: ' + jogadas;

    pararCronometroNormal();
    cronometroInterval = null;
    cronometroNormalDisplay.textContent = 'Tempo: 00:00';

    jogoIniciado = false;
    jogadas = 0;
    paresEncontrados = 0;
}

function desabilitarCartas() {
    cartaUm.removeEventListener('click', virarCarta);
    cartaDois.removeEventListener('click', virarCarta);
    cartaUm.classList.add('acertada');
    cartaDois.classList.add('acertada');

    paresEncontrados++;

    if (paresEncontrados === tamTabuleiro / 2) {
        pararCronometroNormal();
        setTimeout(() => {
            ganhou();
        }, 500);
    }

    resetarTabuleiro();
}

function desvirarCartas() {
    travarTabuleiro = true;
    setTimeout(() => {
        cartaUm.classList.remove('virada');
        cartaDois.classList.remove('virada');
        resetarTabuleiro();
    }, 750);
}

function resetarTabuleiro() {
    [cartaVirada, travarTabuleiro] = [false, false];
    [cartaUm, cartaDois] = [null, null];
}

function embaralharTabuleiro() {
    if (cartas) {
        cartas.forEach(carta => {
            let posicao = Math.floor(Math.random() * tamTabuleiro);
            carta.style.order = posicao;
        });
    }
}

// CRONOMETRO

// Adicione estas 3 funções em qualquer lugar do jogo.js

function iniciarCronometroNormal() {
    segundosPassados = 0;
    cronometroNormalDisplay.textContent = 'Tempo: 00:00';


    cronometroInterval = setInterval(() => {
        segundosPassados++;
        cronometroNormalDisplay.textContent = `Tempo: ${formatarTempo(segundosPassados)}`;
    }, 1000);
}

function pararCronometroNormal() {
    clearInterval(cronometroInterval);
}

function formatarTempo(totalSegundos) {
    const minutos = Math.floor(totalSegundos / 60);
    const segundos = totalSegundos % 60;
    return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
}

// MODO CONTRA O TEMPO

// MUDAR TAMANHO DO TABULEIRO
function aplicarTamanhoTabuleiro(tamanhoString) {
    tabuleiro.classList.remove('grid-2x2', 'grid-6x6', 'grid-8x8');

    let novoTamTabuleiro;

    // 1. Defina o novo tamanho
    if (tamanhoString === "2 x 2") {
        tabuleiro.classList.add('grid-2x2');
        novoTamTabuleiro = 4;
    } else if (tamanhoString === "6 x 6") {
        tabuleiro.classList.add('grid-6x6');
        novoTamTabuleiro = 36;
    } else if (tamanhoString === "8 x 8") {
        tabuleiro.classList.add('grid-8x8');
        novoTamTabuleiro = 64;
    } else { // Padrão 4x4
        novoTamTabuleiro = 16;
    }

    // 2. Atualize a variável global
    tamTabuleiro = novoTamTabuleiro;

    // 3. Gere o tabuleiro com o novo tamanho
    gerarImagens();

    if (jogoIniciado) {
        reiniciarJogo();
    }
}

function gerarImagens() {
    const numPares = tamTabuleiro / 2;
    const iconesUsados = ICONES_DISPONIVEIS.slice(0, numPares);
    let listaCartas = [...iconesUsados, ...iconesUsados];

    tabuleiro.innerHTML = ''; // Limpa o tabuleiro completamente

    listaCartas.forEach(icone => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.setAttribute('data-framework', icone.name);

        const imgElement = document.createElement('img');
        imgElement.classList.add('icon');
        imgElement.setAttribute('src', icone.src);
        imgElement.setAttribute('alt', icone.name);

        cardElement.appendChild(imgElement);
        tabuleiro.appendChild(cardElement);
    });

    cartas = document.querySelectorAll('.card');

    cartas.forEach(carta => {
        carta.addEventListener('click', virarCarta);
    });

    embaralharTabuleiro();
}

function definirModoDeJogo(modo) {
    modoDeJogoAtual = modo;

    if (modoDeJogoAtual === 'Normal') {
        tempoRegressivoDisplay.style.display = 'none';
        cronometroNormalDisplay.style.display = 'block';
    } else {
        tempoRegressivoDisplay.style.display = 'block';
        cronometroNormalDisplay.style.display = 'none';
        pararCronometroNormal();
    }
}

// Inicializa o jogo quando a página carrega
document.addEventListener('DOMContentLoaded', () => {
    aplicarTamanhoTabuleiro("4 x 4");
});

// Funções de funcionamento do jogo da memória adquiridas em https://www.youtube.com/watch?v=NGtx3EBlpNE