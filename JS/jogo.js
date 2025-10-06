const cartas = document.querySelectorAll('.card');

let cartaVirada = false;
let travarTabuleiro = false;
let cartaUm, cartaDois;
let tamTabuleiro = 16;

function virarCarta() {
    if (travarTabuleiro) return;
    this.classList.add('virada');
    if (this === cartaUm) return;

    if (!cartaVirada) {
        cartaVirada = true;
        cartaUm = this;
        return;
    }

    cartaDois = this;

    verMatch();
}


function verMatch() {
    if (cartaUm.dataset.framework === cartaDois.dataset.framework) {
        cartasErradas();
        return;
    } else {

        desvirarCartas();
    }


}

function cartasErradas() {
    cartaUm.removeEventListener('click', virarCarta);
    cartaDois.removeEventListener('click', virarCarta);

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

(function embaralharTabuleiro(){
    cartas.forEach(cartas => {
        let posicao = Math.floor(Math.random() * tamTabuleiro);
        cartas.style.order = posicao;

    });
})();

cartas.forEach(carta => {
    carta.addEventListener('click', virarCarta);
});
