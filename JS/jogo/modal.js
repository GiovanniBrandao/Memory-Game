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