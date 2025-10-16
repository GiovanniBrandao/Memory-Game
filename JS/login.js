const $ = (elemento) => document.querySelector(elemento);

$(".entrar-button").addEventListener("click", (ev) => {
    ev.preventDefault();

    const usuarioInput = $("#usuario").value;
    const senhaInput = $("#senha").value;

    const usuarioSalvoString = localStorage.getItem("usuario");
    
    if (!usuarioSalvoString) {
        alert("Nenhum usuário cadastrado encontrado. Por favor, realize o cadastro.");
        return;
    }

    const usuarioSalvo = JSON.parse(usuarioSalvoString);

    const dadosCorretos = usuarioInput === usuarioSalvo.usuario && senhaInput === usuarioSalvo.senha;

    if (!dadosCorretos) {
        alert("Usuário ou senha inválidos!");
        return;
    }

    window.location.href = "./jogo.html";
});

//função de validação adiquirida em https://github.com/eraldosiniciof/forum-alura/tree/master/duvida17
