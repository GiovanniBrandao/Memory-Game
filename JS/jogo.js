document.addEventListener('DOMContentLoaded', () => {
    const modal = document.querySelector('dialog');
    const botaoFecharModal = document.querySelector('.botao-fechar');
    const botaoConfiguracoes = document.querySelector('.cabecalho .botao-principal');
    const botaoAplicar = document.getElementById('botao-aplicar');
    const modoJogoItem = document.querySelector('.item:nth-child(1)');
    const tabuleiroItem = document.querySelector('.item:nth-child(2)');
    const botaoModoTrapaca = modal.querySelector('.botao-principal:not(#botao-aplicar)');
    const modoJogoTexto = modoJogoItem.querySelector('dd');
    const tamanhoTabuleiroTexto = tabuleiroItem.querySelector('dd');

    let configuracoes = {
        modoDeJogo: 'Normal',
        tamanhoDoTabuleiro: '4x4',
        modoTrapaca: false
    };

    const opcoesTabuleiro = ['2x2', '4x4', '6x6', '8x8'];

    function fecharModal() {
        if (modal) {
            modal.close();
        }
    }

    function abrirModal() {
        if (modal) {
            modal.showModal();
        }
    }

    function alternarModoJogo() {
        configuracoes.modoDeJogo = (configuracoes.modoDeJogo === 'Normal') ? 'Contra o tempo' : 'Normal';
        modoJogoTexto.textContent = configuracoes.modoDeJogo;
    }

    function alternarTamanhoTabuleiro() {
        const indiceAtual = opcoesTabuleiro.indexOf(configuracoes.tamanhoDoTabuleiro);
        const proximoIndice = (indiceAtual + 1) % opcoesTabuleiro.length;
        configuracoes.tamanhoDoTabuleiro = opcoesTabuleiro[proximoIndice];
        tamanhoTabuleiroTexto.textContent = configuracoes.tamanhoDoTabuleiro;
    }

    function toggleModoTrapaca() {
        configuracoes.modoTrapaca = !configuracoes.modoTrapaca;
        botaoModoTrapaca.textContent = `Modo trapaça: ${configuracoes.modoTrapaca ? 'ON' : 'OFF'}`;
    }

    if (modal && botaoFecharModal && botaoConfiguracoes && modoJogoItem && tabuleiroItem && botaoModoTrapaca && botaoAplicar) {
        
        botaoConfiguracoes.addEventListener('click', abrirModal);
        
        botaoFecharModal.addEventListener('click', fecharModal);
        
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                fecharModal();
            }
        });
        
        modoJogoItem.addEventListener('click', alternarModoJogo);
        tabuleiroItem.addEventListener('click', alternarTamanhoTabuleiro);
        botaoModoTrapaca.addEventListener('click', toggleModoTrapaca);
        
        botaoAplicar.addEventListener('click', () => {
            fecharModal();
        });
    }
});