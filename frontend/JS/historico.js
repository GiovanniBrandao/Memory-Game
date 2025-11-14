document.addEventListener('DOMContentLoaded', function() {
    
    const ENDPOINT_HISTORICO = '../backend/historico.php'; 
    const tabelaBody = document.querySelector('table tbody');

    function formatarDataHora(dataString) {
        const dataObj = new Date(dataString.replace(' ', 'T')); 
        
        return dataObj.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    function formatarTempo(tempoSegundos) {
        const minutos = Math.floor(tempoSegundos / 60);
        const segundos = tempoSegundos % 60;
        return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    function renderizarHistorico(historico) {
        tabelaBody.innerHTML = '';

        if (!historico || historico.length === 0) {
            const linhaVazia = document.createElement('tr');
            const celulaVazia = document.createElement('td');
            celulaVazia.setAttribute('colspan', '7');
            celulaVazia.textContent = 'Nenhuma partida encontrada no histórico.';
            celulaVazia.style.textAlign = 'center';

            linhaVazia.appendChild(celulaVazia);
            tabelaBody.appendChild(linhaVazia);
            return;
        }

        historico.forEach(partida => {
            const linha = document.createElement('tr');
            const resultadoLower = partida.resultado.toLowerCase();
            const dataFormatada = formatarDataHora(partida.data_hora);

            linha.innerHTML = `
                <td data-label="Jogador">${partida.nome}</td>
                <td data-label="Dimensão">${partida.dimensoes}</td>
                <td data-label="Modalidade">${partida.modalidade}</td>
                <td data-label="Tempo">${formatarTempo(partida.tempo_gasto)}</td> 
                <td data-label="Jogadas">${partida.num_jogadas}</td>
                <td data-label="Resultado" class="${resultadoLower}">${partida.resultado}</td>
                <td data-label="Data">${dataFormatada}</td>
            `;

            tabelaBody.appendChild(linha);
        });
    }

    async function carregarHistorico() {
        tabelaBody.innerHTML = '<tr><td colspan="7" style="text-align:center;">Carregando histórico...</td></tr>';
        
        try {
            const response = await fetch(ENDPOINT_HISTORICO);

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Resposta não JSON' }));
                throw new Error(errorData.error || `Erro de rede ou servidor. Status: ${response.status}`);
            }

            const historico = await response.json();
            
            renderizarHistorico(historico);

        } catch (error) {
            console.error('Falha ao carregar o histórico:', error);
            tabelaBody.innerHTML = `<tr><td colspan="7" style="color:red; text-align:center;">Erro: ${error.message}</td></tr>`;
        }
    }

    carregarHistorico();
});