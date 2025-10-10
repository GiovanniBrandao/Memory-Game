const cartas = document.querySelectorAll('.card');

let cartaVirada = false;
let travarTabuleiro = false;
let cartaUm, cartaDois;
let tamTabuleiro = 16; 
let jogoIniciado = false;
let jogadas = 0;
let modoTrapacaAtivo = false; 

const botaoIniciarDesistir = document.getElementById('botao-iniciar-desistir');
const exibirJogadas = document.getElementById('jogadas');

function revelarCartas() {
    modoTrapacaAtivo = true; 
    
    const cartas = document.querySelectorAll('.card'); 
    cartas.forEach(carta => {
        carta.classList.add('virada');
        
        carta.removeEventListener('click', virarCarta); 
    });
}

function esconderCartas() {
    modoTrapacaAtivo = false; 
    
    const cartas = document.querySelectorAll('.card'); 
    cartas.forEach(carta => {
        if (!carta.classList.contains('acertada')) { 
            carta.classList.remove('virada');
        }
        
        carta.addEventListener('click', virarCarta); 
    });
}

function controlarInicioDesistencia() {
    if (jogoIniciado) {
        jogoIniciado = false;
        botaoIniciarDesistir.textContent = 'Iniciar jogo';
        alert('Você desistiu do jogo.');
    } else {
        jogoIniciado = true;
        botaoIniciarDesistir.textContent = 'Desistir do jogo';
    }

    reiniciarJogo(); 
}

function ganhou() {
    const cartasAcertadas = document.querySelectorAll('.card.acertada');

    if (cartasAcertadas.length === cartas.length) {
        alert('Parabéns, você ganhou!');
        reiniciarJogo();
    }
}

function virarCarta() {
    if (!jogoIniciado) return; 
    if (travarTabuleiro) return;
    if (this === cartaUm) return;

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

    if (isMatch) {
        desabilitarCartas(); 
    } else {
        desvirarCartas();
    }
}

function reiniciarJogo() {
    cartas.forEach(carta => {
        carta.classList.remove('virada');
        carta.addEventListener('click', virarCarta); 
    });
    
    resetarTabuleiro();
    
    embaralharTabuleiro(); 
    
    jogadas = 0;
    exibirJogadas.textContent = 'Jogadas: ' + jogadas;
}

function desabilitarCartas() {
    cartaUm.removeEventListener('click', virarCarta);
    cartaDois.removeEventListener('click', virarCarta);

    cartaUm.classList.add('acertada'); 
    cartaDois.classList.add('acertada');

    resetarTabuleiro();

    ganhou();
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

function embaralharTabuleiro(){ 
    cartas.forEach(carta => {
        let posicao = Math.floor(Math.random() * tamTabuleiro);
        carta.style.order = posicao;
    });
}

embaralharTabuleiro();

cartas.forEach(carta => {
    carta.addEventListener('click', virarCarta);
});

botaoIniciarDesistir.addEventListener('click', controlarInicioDesistencia); 

// MODO CONTRA O TEMPO