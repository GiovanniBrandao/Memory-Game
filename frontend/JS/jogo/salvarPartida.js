const $ = (elemento) => document.querySelector(elemento);
const ENDPOINT_SALVAR_PARTIDA = '../backend/jogo.php';

async function salvarPartida(resultado, tempoFinal) {
    const dimensoes = estadoJogo.tamTabuleiro || 'N/A';
    const modalidade = MODALIDADE_MAP[estadoJogo.modoDeJogoAtual] || 'Clássico';
    const num_jogadas = estadoJogo.numJogadas || 0;
    const data_hora = formatarDataHoraAtual();
    
    const formData = new URLSearchParams();
    formData.append('dimensoes', dimensoes);
    formData.append('modalidade', modalidade);
    formData.append('tempo_gasto', tempoFinal);
    formData.append('num_jogadas', num_jogadas);
    formData.append('resultado', resultado);
    formData.append('data_hora', data_hora);

    try {
        const response = await fetch(ENDPOINT_SALVAR_PARTIDA, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded' 
            },
            body: formData 
        });

        response.json().then(data => {
            if (data.error) {
                console.error(data.error);
            }
        }).catch(error => {
            console.error("Erro ao processar a resposta: ", error);
        });

    } catch {
        console.error("Não foi possível conectar ao servidor.");
    }
}

function formatarDataHoraAtual() {
    const agora = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    
    const data = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
    const hora = `${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`;
    
    return `${data} ${hora}`;
}

const MODALIDADE_MAP = {
    'Livre': 'Clássico',
    'Contra o Tempo': 'Tempo'
};