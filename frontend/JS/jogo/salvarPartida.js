const $ = (elemento) => document.querySelector(elemento);
const ENDPOINT_SALVAR_PARTIDA = '../backend/jogo.php';

const MODALIDADE_MAP_TAMANHOS = Object.keys(MAPA_TAMANHOS).reduce((acc, key) => {
    acc[MAPA_TAMANHOS[key].tamanho] = key; 
    return acc;
}, {});

function formatarDataHoraAtual() {
    const agora = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    
    const data = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
    const hora = `${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`;
    
    return `${data} ${hora}`;
}

async function salvarPartida(resultado, tempoFinal) {
    const dimensoes = MODALIDADE_MAP_TAMANHOS[estadoJogo.tamTabuleiro] || '4 x 4';
    const modalidade = estadoJogo.modoDeJogoAtual;
    const num_jogadas = estadoJogo.jogadas || 0;
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

        // Verifica se a resposta HTTP é bem-sucedida (status 200-299)
        if (!response.ok) {
            throw new Error(`Erro de rede: Status ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
            console.error(data.error);
        }

    } catch (error) {
        if (error.name === 'SyntaxError') {
            console.error("Erro ao processar a resposta: Resposta não é JSON válida.", error);
        } else if (error.message.includes("Erro de rede")) {
            console.error(error.message);
        } else {
            console.error("Não foi possível conectar ao servidor ou erro desconhecido:", error);
        }
    }
}

function formatarDataHoraAtual() {
    const agora = new Date();
    const pad = (num) => String(num).padStart(2, '0');
    
    const data = `${agora.getFullYear()}-${pad(agora.getMonth() + 1)}-${pad(agora.getDate())}`;
    const hora = `${pad(agora.getHours())}:${pad(agora.getMinutes())}:${pad(agora.getSeconds())}`;
    
    return `${data} ${hora}`;
}