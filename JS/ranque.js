document.addEventListener('DOMContentLoaded', () => {


    const botoesContainer = document.getElementById('botoes-ranking');

    botoesContainer.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            const tamanho = event.target.getAttribute('data-tamanho');
            window.location.href = "../back/ranque.php?dimensoes="+tamanho;
        }
    });

});