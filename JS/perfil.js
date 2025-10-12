const $ = (elemento) => document.querySelector(elemento);

function carregarDadosDoPerfil() {
    const usuarioSalvoString = localStorage.getItem("usuario");

    if (usuarioSalvoString) {
        const usuario = JSON.parse(usuarioSalvoString);
        $("#name").value = usuario.nome;
        $("#email").value = usuario.email;
        $("#phone").value = usuario.telefone;
    } else {
        alert("Usuário não encontrado. Por favor, faça o login novamente.");
        window.location.href = "./login.html";
    }
}

document.addEventListener('DOMContentLoaded', carregarDadosDoPerfil);

$(".botao-salvar").addEventListener("click", (ev) => {
    ev.preventDefault();

    const nome = $("#name").value;
    const email = $("#email").value;
    const telefone = $("#phone").value;

    if (nome.length === 0 || email.length === 0 || telefone.length === 0) {
        alert("Por favor, preencha todos os campos para salvar.");
        return;
    }
    
    const usuarioSalvoString = localStorage.getItem("usuario");
    const usuarioSalvo = JSON.parse(usuarioSalvoString);

    const dadosAtualizados = {
        ...usuarioSalvo,
        nome: nome,
        email: email,
        telefone: telefone,
    };

    const string = JSON.stringify(dadosAtualizados);
    localStorage.setItem("usuario", string);

    alert("Perfil atualizado com sucesso!");
});
