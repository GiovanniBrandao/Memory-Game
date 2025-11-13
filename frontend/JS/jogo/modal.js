// MODAL 
const modal = document.getElementById('modal');
const botaoAbrir = document.getElementById('botao-abrir-configuracoes');
const botaoFechar = document.getElementById('botao-fechar');

botaoAbrir.addEventListener('click', () => {
    modal.showModal();
    exibirValoresConfiguracao();
});

botaoFechar.addEventListener('click', () => {
    modal.close();
});

modal.addEventListener('click', (event) => {
    if (event.target  === modal) {
        modal.close();
    }
});

// Funções de modal: https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal