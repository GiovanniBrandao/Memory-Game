document.addEventListener('DOMContentLoaded', () => {

    const rankingData = {
        '2x2': [
            { pos: 1, user: 'jogadorA', jogadas: 8, tempo: 15 },
            { pos: 2, user: 'jogadorB', jogadas: 9, tempo: 18 },
            { pos: 3, user: 'jogadorC', jogadas: 10, tempo: 20 },
            { pos: 4, user: 'jogadorD', jogadas: 11, tempo: 22 },
            { pos: 5, user: 'jogadorE', jogadas: 12, tempo: 25 },
            { pos: 6, user: 'jogadorF', jogadas: 13, tempo: 28 },
            { pos: 7, user: 'jogadorG', jogadas: 14, tempo: 30 },
            { pos: 8, user: 'jogadorH', jogadas: 15, tempo: 32 },
            { pos: 9, user: 'jogadorI', jogadas: 16, tempo: 35 },
            { pos: 10, user: 'jogadorJ', jogadas: 17, tempo: 38 },
        ],
        '4x4': [
            { pos: 1, user: 'jogadorK', jogadas: 20, tempo: 45 },
            { pos: 2, user: 'jogadorL', jogadas: 22, tempo: 48 },
            { pos: 3, user: 'jogadorM', jogadas: 24, tempo: 50 },
            { pos: 4, user: 'jogadorN', jogadas: 26, tempo: 52 },
            { pos: 5, user: 'jogadorO', jogadas: 28, tempo: 55 },
            { pos: 6, user: 'jogadorP', jogadas: 30, tempo: 58 },
            { pos: 7, user: 'jogadorQ', jogadas: 32, tempo: 60 },
            { pos: 8, user: 'jogadorR', jogadas: 34, tempo: 62 },
            { pos: 9, user: 'jogadorS', jogadas: 36, tempo: 65 },
            { pos: 10, user: 'jogadorT', jogadas: 38, tempo: 68 },
        ],
        '6x6': [
            { pos: 1, user: 'jogadorU', jogadas: 40, tempo: 90 },
            { pos: 2, user: 'jogadorV', jogadas: 42, tempo: 95 },
            { pos: 3, user: 'jogadorW', jogadas: 44, tempo: 100 },
            { pos: 4, user: 'jogadorX', jogadas: 46, tempo: 105 },
            { pos: 5, user: 'jogadorY', jogadas: 48, tempo: 110 },
            { pos: 6, user: 'jogadorZ', jogadas: 50, tempo: 115 },
            { pos: 7, user: 'jogadorAA', jogadas: 52, tempo: 120 },
            { pos: 8, user: 'jogadorBB', jogadas: 54, tempo: 125 },
            { pos: 9, user: 'jogadorCC', jogadas: 56, tempo: 130 },
            { pos: 10, user: 'jogadorDD', jogadas: 58, tempo: 135 },
        ],
        '8x8': [
            { pos: 1, user: 'jogadorEE', jogadas: 60, tempo: 150 },
            { pos: 2, user: 'jogadorFF', jogadas: 63, tempo: 155 },
            { pos: 3, user: 'jogadorGG', jogadas: 66, tempo: 160 },
            { pos: 4, user: 'jogadorHH', jogadas: 69, tempo: 165 },
            { pos: 5, user: 'jogadorII', jogadas: 72, tempo: 170 },
            { pos: 6, user: 'jogadorJJ', jogadas: 75, tempo: 175 },
            { pos: 7, user: 'jogadorKK', jogadas: 78, tempo: 180 },
            { pos: 8, user: 'jogadorLL', jogadas: 81, tempo: 185 },
            { pos: 9, user: 'jogadorMM', jogadas: 84, tempo: 123 },
            { pos: 10, user: 'jogadorNN', jogadas: 86, tempo: 130 },
        ]
    };

    const botoesContainer = document.getElementById('botoes-ranking');
    const rankingTitulo = document.getElementById('ranking-titulo');
    const tabelaCorpo = document.querySelector('.tabela-ranking tbody');

    function exibirRanking(tamanho) {
        const dados = rankingData[tamanho];
        rankingTitulo.textContent = `Ranking ${tamanho}`;
        tabelaCorpo.innerHTML = '';

        if (dados) {
            dados.forEach(item => {
                const linha = document.createElement('tr');
                linha.innerHTML = `
                    <td>${item.pos}</td>
                    <td>${item.user}</td>
                    <td>${item.jogadas}</td>
                    <td>${item.tempo}</td>
                `;
                tabelaCorpo.appendChild(linha);
            });
        }
    }

    botoesContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const tamanho = event.target.getAttribute('data-tamanho');
            exibirRanking(tamanho);
        }
    });

    exibirRanking('2x2');
});