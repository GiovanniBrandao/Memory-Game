document.addEventListener('DOMContentLoaded', function() {

    const historicoDePartidas = [
        {
            jogador: "Jogador1",
            dimensao: "4x4",
            modalidade: "Normal",
            tempo: "00:02:15",
            jogadas: 24,
            resultado: "Vitória",
            data: "2025-09-16T11:00:00"
        },
        {
            jogador: "Jogador1",
            dimensao: "2x2",
            modalidade: "Normal",
            tempo: "00:00:35",
            jogadas: 10,
            resultado: "Vitória",
            data: "2025-09-15T20:30:00"
        },
        {
            jogador: "Jogador1",
            dimensao: "6x6",
            modalidade: "Contra o tempo",
            tempo: "00:05:00",
            jogadas: 45,
            resultado: "Derrota",
            data: "2025-09-15T18:15:00"
        },
        {
            jogador: "Jogador1",
            dimensao: "8x8",
            modalidade: "Contra o tempo",
            tempo: "00:04:51",
            jogadas: 71,
            resultado: "Vitória",
            data: "2025-09-14T13:40:00"
        }
    ];

    function carregarHistorico() {
        const tabelaBody = document.querySelector('table tbody');

        tabelaBody.innerHTML = '';

        if (historicoDePartidas.length === 0) {
            const linhaVazia = document.createElement('tr');
            const celulaVazia = document.createElement('td');
            celulaVazia.setAttribute('colspan', '7');
            celulaVazia.textContent = 'Nenhuma partida encontrada no histórico.';
            celulaVazia.style.textAlign = 'center';

            linhaVazia.appendChild(celulaVazia);
            tabelaBody.appendChild(linhaVazia);
            return;
        }

        historicoDePartidas.forEach(partida => {
            const linha = document.createElement('tr');

            const dataFormatada = new Date(partida.data).toLocaleString('pt-BR', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });

            linha.innerHTML = `
                <td data-label="Jogador">${partida.jogador}</td>
                <td data-label="Dimensão">${partida.dimensao}</td>
                <td data-label="Modalidade">${partida.modalidade}</td>
                <td data-label="Tempo">${partida.tempo}</td>
                <td data-label="Jogadas">${partida.jogadas}</td>
                <td data-label="Resultado" class="${partida.resultado.toLowerCase()}">${partida.resultado}</td>
                <td data-label="Data">${dataFormatada}</td>
            `;

            tabelaBody.appendChild(linha);
        });
    }

    carregarHistorico();

});
