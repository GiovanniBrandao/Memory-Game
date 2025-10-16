const MAPA_TAMANHOS = {
    "2 x 2": { classe: 'grid-2x2', tamanho: 4 },
    "4 x 4": { classe: 'grid-4x4', tamanho: 16 },
    "6 x 6": { classe: 'grid-6x6', tamanho: 36 },
    "8 x 8": { classe: 'grid-8x8', tamanho: 64 },
};

const tabuleiro = document.querySelector('.tabuleiro');

function resetarTabuleiro() {
    estadoJogo.cartaVirada = false;
    estadoJogo.travarTabuleiro = false;
    estadoJogo.cartaUm = null;
    estadoJogo.cartaDois = null;
}

function embaralharTabuleiro() {
    if (cartas) {
        cartas.forEach(carta => {
            let posicao = Math.floor(Math.random() * estadoJogo.tamTabuleiro);
            carta.style.order = posicao;
        });
    }
}

function aplicarTamanhoTabuleiro(tamanhoString) {
    const config = MAPA_TAMANHOS[tamanhoString];

    Object.values(MAPA_TAMANHOS).forEach(c => tabuleiro.classList.remove(c.classe));

    tabuleiro.classList.add(config.classe);
    estadoJogo.tamTabuleiro = config.tamanho;

    reiniciarJogo();
}

function gerarImagens() {
    const numPares = estadoJogo.tamTabuleiro / 2;

    const iconesUsados = ICONES_DISPONIVEIS.slice(0, numPares);
    let listaCartas = [...iconesUsados, ...iconesUsados];

    tabuleiro.innerHTML = '';

    listaCartas.forEach(icone => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card'); 
        cardElement.setAttribute('data-framework', icone.name);

        const frontFace = document.createElement('div');
        frontFace.classList.add('face-front');
        const backFace = document.createElement('div');
        backFace.classList.add('face-back');

        const imgElement = document.createElement('img');
        imgElement.classList.add('icon');
        imgElement.setAttribute('src', icone.src);
        imgElement.setAttribute('alt', icone.name);
        
        backFace.appendChild(imgElement);

        cardElement.appendChild(frontFace);
        cardElement.appendChild(backFace);
        tabuleiro.appendChild(cardElement);
    });

    cartas = document.querySelectorAll('.card');

    cartas.forEach(carta => {
        carta.removeEventListener('click', virarCarta); 
        carta.addEventListener('click', virarCarta);
    });

    embaralharTabuleiro();
}
