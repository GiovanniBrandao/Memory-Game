const ESTADO_INICIAL_DO_JOGO = {
    cartaVirada: false,
    travarTabuleiro: false,
    cartaUm: null,
    cartaDois: null,
    tamTabuleiro: 16,
    jogoIniciado: false,
    jogadas: 0,
    paresEncontrados: 0,
    modoTrapacaAtivo: false,
    modoDeJogoAtual: 'Normal',
};

let estadoJogo = { ...ESTADO_INICIAL_DO_JOGO };
let cartas; 

const ICONES_DISPONIVEIS = [
    { name: 'coracao', src: 'Resources/Images/coracao.svg' },
    { name: 'pet', src: 'Resources/Images/pet.svg' },
    { name: 'arvores', src: 'Resources/Images/arvores.svg' },
    { name: 'foguete', src: 'Resources/Images/foguete.svg' },
    { name: 'chave', src: 'Resources/Images/chave.svg' },
    { name: 'gota', src: 'Resources/Images/gota.svg' },
    { name: 'coroa', src: 'Resources/Images/coroa.svg' },
    { name: 'bola', src: 'Resources/Images/bola.svg' },
    { name: 'apito', src: 'Resources/Images/apito.svg' },
    { name: 'colmeia', src: 'Resources/Images/colmeia.svg' },
    { name: 'copo', src: 'Resources/Images/copo.svg' },
    { name: 'croissant', src: 'Resources/Images/croissant.svg' },
    { name: 'folha', src: 'Resources/Images/folha.svg' },
    { name: 'grama', src: 'Resources/Images/grama.svg' },
    { name: 'hambuerguer', src: 'Resources/Images/hamburguer.svg' },
    { name: 'lampada', src: 'Resources/Images/lampada.svg' },
    { name: 'lua', src: 'Resources/Images/lua.svg' },
    { name: 'mala', src: 'Resources/Images/mala.svg' },
    { name: 'medico', src: 'Resources/Images/medico.svg' },
    { name: 'microfone', src: 'Resources/Images/microfone.svg' },
    { name: 'montanha', src: 'Resources/Images/montanha.svg' },
    { name: 'peso', src: 'Resources/Images/peso.svg' },
    { name: 'piano', src: 'Resources/Images/piano.svg' },
    { name: 'planeta', src: 'Resources/Images/planeta.svg' },
    { name: 'quimica', src: 'Resources/Images/quimica.svg' },
    { name: 'relogio', src: 'Resources/Images/relogio.svg' },
    { name: 'seringa', src: 'Resources/Images/seringa.svg' },
    { name: 'som', src: 'Resources/Images/som.svg' },
    { name: 'surfe', src: 'Resources/Images/surfe.svg' },
    { name: 'videogame', src: 'Resources/Images/videogame.svg' },
    { name: 'circulo', src: 'Resources/Images/circulo.svg' },
    { name: 'pipa', src: 'Resources/Images/pipa.svg' },
];

const botaoIniciarDesistir = document.getElementById('botao-iniciar-desistir');
const exibirJogadas = document.getElementById('jogadas');

function reiniciarJogo() {
    const { tamTabuleiro, modoDeJogoAtual } = estadoJogo;
    estadoJogo = { ...ESTADO_INICIAL_DO_JOGO, tamTabuleiro, modoDeJogoAtual };
    
    gerarImagens();
    pararCronometros();

    exibirJogadas.textContent = `Jogadas: ${estadoJogo.jogadas}`;
    botaoIniciarDesistir.textContent = 'Iniciar Jogo';
    let tempo = estadoJogo.modoDeJogoAtual == 'Normal' ? tempoTotalProgressivo : obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
    cronometro.textContent = formatarTempo(tempo);
}

function ganhou() {
    const tempoGasto = obterTempoGastoFinal(); 

    salvarPartida('Vitória', tempoGasto)
        .then(() => {
             alert('Parabéns, você ganhou!');
             reiniciarJogo();
        });
}

function desabilitarCartas() {
    estadoJogo.cartaUm.removeEventListener('click', virarCarta);
    estadoJogo.cartaDois.removeEventListener('click', virarCarta);
    estadoJogo.cartaUm.classList.add('acertada');
    estadoJogo.cartaDois.classList.add('acertada');

    estadoJogo.paresEncontrados++;

    if (estadoJogo.paresEncontrados === estadoJogo.tamTabuleiro / 2) {
        pararCronometros();
        const DELAY_VITORIA = 500; 
        setTimeout(() => {
            ganhou();
        }, DELAY_VITORIA);
    }

    resetarTabuleiro();
}

function desvirarCartas() {
    estadoJogo.travarTabuleiro = true;
    const DELAY_DESVIRAR = 750;
    setTimeout(() => {
        estadoJogo.cartaUm.classList.remove('virada');
        estadoJogo.cartaDois.classList.remove('virada');
        resetarTabuleiro();
    }, DELAY_DESVIRAR);
}

function verMatch() {
    const isMatch = estadoJogo.cartaUm.dataset.framework === estadoJogo.cartaDois.dataset.framework;
    isMatch ? desabilitarCartas() : desvirarCartas();
}

function virarCarta() {
    const { jogoIniciado, travarTabuleiro, cartaUm, cartaVirada, modoDeJogoAtual } = estadoJogo;
    
    if (!jogoIniciado || travarTabuleiro || this === cartaUm) return;

    if (!intervaloProgressivo && modoDeJogoAtual === 'Normal') {
        iniciarContagemProgressiva();
    }

    this.classList.add('virada');

    if (!cartaVirada) {
        estadoJogo.cartaVirada = true;
        estadoJogo.cartaUm = this;
        return;
    }

    estadoJogo.cartaDois = this;
    
    verMatch();
    
    estadoJogo.jogadas++;
    exibirJogadas.textContent = `Jogadas: ${estadoJogo.jogadas}`;
}

function revelarCartas() {
    if (estadoJogo.modoTrapacaAtivo) return;
    estadoJogo.modoTrapacaAtivo = true;
    
    if (cartas) {
        cartas.forEach(carta => {
            carta.classList.add('virada');
            carta.removeEventListener('click', virarCarta);
        });
    }
}

function esconderCartas() {
    if (!estadoJogo.modoTrapacaAtivo) return; 

    estadoJogo.modoTrapacaAtivo = false;
    
    if (cartas) {
        cartas.forEach(carta => {
            if (!carta.classList.contains('acertada')) {
                carta.classList.remove('virada');
            }
            carta.addEventListener('click', virarCarta); 
        });
    }
    resetarTabuleiro(); 
}

document.addEventListener('DOMContentLoaded', () => {
    aplicarTamanhoTabuleiro("4 x 4"); 
});

botaoIniciarDesistir.addEventListener('click', function () {
    if (estadoJogo.jogoIniciado) {
        const tempoGasto = obterTempoGastoFinal(); 
        
        salvarPartida('Desistência', tempoGasto)
            .then(() => {
                 alert('Você desistiu do jogo.');
                 reiniciarJogo();
            });
    } else {
        estadoJogo.jogoIniciado = true;
        this.textContent = 'Desistir do Jogo'; 
        
        if (estadoJogo.modoDeJogoAtual === 'Contra o Tempo') {
            iniciarContagemRegressiva();
        }
    }
});

async function salvarPartida(resultado) {
    const formData = new FormData();

    // Pega o tamanho do tabuleiro atual (ex: "4 x 4")
    const dimensoes = document.getElementById('tabuleiro-valor').textContent || "4 x 4";
    // Remove espaços para ficar no padrão do banco se necessário, ou envia como está
    // formData.append('dimensoes', dimensoes.replace(/\s/g, '')); 
    formData.append('dimensoes', dimensoes);

    const modalidade = estadoJogo.modoDeJogoAtual === 'Normal' ? 'classico' : 'tempo';
    formData.append('modalidade', modalidade);
    
    formData.append('num_jogadas', estadoJogo.jogadas);
    formData.append('resultado', resultado); // 'vitoria', 'derrota' ou 'desistencia'

    // Data e Hora atual formatada para MySQL (YYYY-MM-DD HH:MM:SS)
    const agora = new Date();
    // Ajuste fuso horário se necessário, aqui pega o local simplificado
    const dataHora = agora.getFullYear() + '-' + 
        String(agora.getMonth() + 1).padStart(2, '0') + '-' + 
        String(agora.getDate()).padStart(2, '0') + ' ' + 
        String(agora.getHours()).padStart(2, '0') + ':' + 
        String(agora.getMinutes()).padStart(2, '0') + ':' + 
        String(agora.getSeconds()).padStart(2, '0');
    formData.append('data_hora', dataHora);

    // CALCULAR O TEMPO GASTO
    let tempoGasto = 0;
    if (estadoJogo.modoDeJogoAtual === 'Normal') {
        // No modo normal (progressivo), a variável tempoTotalProgressivo guarda o tempo
        tempoGasto = tempoTotalProgressivo; 
    } else {
        // No modo contra o tempo (regressivo), precisamos ver quanto tempo passou
        // tempo inicial - tempo restante
        const tempoInicial = obterTempoInicialPorTamanho(estadoJogo.tamTabuleiro);
        tempoGasto = tempoInicial - tempoTotalRegressivo;
    }
    formData.append('tempo_gasto', tempoGasto);

    try {
        const response = await fetch('../backend/jogo.php', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        if (data.success) {
            console.log("Partida salva com sucesso!");
        } else {
            console.error("Erro ao salvar:", data.error);
        }

    } catch (error) {
        console.error("Erro de conexão ao salvar partida:", error);
    }
}
// Funções de funcionamento do jogo da memória adquiridas em https://www.youtube.com/watch?v=NGtx3EBlpNE