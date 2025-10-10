document.addEventListener('DOMContentLoaded', () => {

    // MODAL 
    const modal = document.getElementById('modal');
    const botaoAbrir = document.getElementById('botao-abrir-configuracoes');
    const botaoFechar = document.getElementById('botao-fechar');

    botaoAbrir.addEventListener('click', () => {
        modal.showModal();
    });

    botaoFechar.addEventListener('click', () => {
        modal.close();
    });

    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.close();
        }
    });

    // TRAPAÇA 
    const botaoTrapaca = document.getElementById('botao-trapaca');
    const habilitarTrapaca = document.getElementById('habilitar-trapaca');

    habilitarTrapaca.addEventListener('click', () => {
        const estiloComputado = window.getComputedStyle(botaoTrapaca);
        const displayAtual = estiloComputado.display;

        if (displayAtual === 'none' || botaoTrapaca.style.display === 'none') {
            botaoTrapaca.style.display = 'block';
            habilitarTrapaca.textContent = 'Modo trapaça: ON';
        } else {
            botaoTrapaca.style.display = 'none';
            habilitarTrapaca.textContent = 'Modo trapaça: OFF';
        }
});


    let trapacaAtivada = false;

    botaoTrapaca.addEventListener('click', () => {

        if (trapacaAtivada === false) {

            botaoTrapaca.textContent = 'Exibir peças ocultas: ON'
            revelarCartas();

            trapacaAtivada = true;

        } else {

            if (trapacaAtivada === true) {

                botaoTrapaca.textContent = 'Exibir peças ocultas: OFF'
                esconderCartas();

                trapacaAtivada = false;
            }
        }

    });

    // MODO DE JOGO E TABULEIRO 
    const opcoes = {
        jogo: ["Normal", "Contra o Tempo"],
        tabuleiro: ["2 x 2", "4 x 4", "6 x 6", "8 x 8"]
    };

    let indicesAtuais = {
        jogo: 0,
        tabuleiro: 0
    };

    const valorModoJogo = document.getElementById('modo-jogo-valor');
    const valorTabuleiro = document.getElementById('tabuleiro-valor');
    const tempo = document.getElementById('tempo');

    const botoesNavegacao = document.querySelectorAll('.botao-navegacao');

    function exibirValoresConfiguracao() {
        valorModoJogo.textContent = opcoes.jogo[indicesAtuais.jogo];
        valorTabuleiro.textContent = opcoes.tabuleiro[indicesAtuais.tabuleiro];


        const modoAtual = opcoes.jogo[indicesAtuais.jogo];
        if (modoAtual === "Contra o Tempo") {
            tempo.style.display = 'block';
        } else {
            tempo.style.display = 'none';
        }
    }

    function navegarConfiguracao(target, action) {
        let indiceAtual = indicesAtuais[target];
        const maxIndice = opcoes[target].length - 1;

        if (action === 'anterior') {
            indiceAtual = indiceAtual > 0 ? indiceAtual - 1 : maxIndice;
        } else if (action === 'proximo') {
            indiceAtual = indiceAtual < maxIndice ? indiceAtual + 1 : 0;
        }

        indicesAtuais[target] = indiceAtual;

        exibirValoresConfiguracao();
    }

    botoesNavegacao.forEach(botao => {
        botao.addEventListener('click', function () {
            const action = this.getAttribute('data-action');
            const target = this.getAttribute('data-target');

            if (target && action) {
                navegarConfiguracao(target, action);
            }
        });
    });

    exibirValoresConfiguracao();
});