document.addEventListener('DOMContentLoaded', () => {
    const botoesContainer = document.getElementById('botoes-ranking');
    const rankingTitulo = document.getElementById('ranking-titulo');
    const tabelaCorpo = document.querySelector('.tabela-ranking tbody');
    
    function formatarTempo(tempoSegundos) {
        const minutos = Math.floor(tempoSegundos / 60);
        const segundos = tempoSegundos % 60;
        return `${String(minutos).padStart(2, '0')}:${String(segundos).padStart(2, '0')}`;
    }

    async function carregarRanking(tamanho) {
        rankingTitulo.textContent = `Carregando Ranking ${tamanho}...`;
        tabelaCorpo.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';

        try {
            const response = await fetch(`../backend/ranque.php?dimensoes=${tamanho}`);
            
            if (!response.ok) {
                throw new Error(`Erro de rede ou servidor. Status: ${response.status}`);
            }

            const dados = await response.json();
            
            if (dados.error) {
                 throw new Error(dados.error);
            }

            exibirRanking(tamanho, dados);

        } catch (error) {
            console.error('Erro ao carregar o ranking:', error);
            rankingTitulo.textContent = `Ranking ${tamanho} (Erro)`;
            tabelaCorpo.innerHTML = `<tr><td colspan="4">Erro ao carregar os dados: ${error.message}</td></tr>`;
        }
    }

    function exibirRanking(tamanho, dados) {
        rankingTitulo.textContent = `Ranking ${tamanho}`;
        tabelaCorpo.innerHTML = '';
        
        if (dados && dados.length > 0) {
            dados.forEach((item, index) => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${index + 1}º</td>
                    <td>${item.username}</td>
                    <td>${item.num_jogadas}</td>
                    <td>${formatarTempo(item.tempo_gasto)}</td>
                `;
                tabelaCorpo.appendChild(linha);
            });
        } else {
            tabelaCorpo.innerHTML = '<tr><td colspan="4">Nenhum recorde encontrado para esta dimensão.</td></tr>';
        }
    }

    botoesContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const tamanho = event.target.getAttribute('data-tamanho');
            if (tamanho) {
                carregarRanking(tamanho);
            }
        }
    });

    carregarRanking('4 x 4'); 
});