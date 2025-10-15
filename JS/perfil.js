const $ = (elemento) => document.querySelector(elemento);

function validarEmail(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
}

function formatarTelefone(telefone) {
    let value = telefone.replace(/\D/g, "");
    if (value.length > 10) {
        value = value.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (value.length > 5) {
        value = value.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (value.length > 2) {
        value = value.replace(/^(\d\d)(\d{0,5}).*/, "($1) $2");
    } else {
        value = value.replace(/^(\d*)/, "($1");
    }
    return value;
}

function carregarDadosDoPerfil() {
    const usuarioSalvoString = localStorage.getItem("usuario");

    if (usuarioSalvoString) {
        const usuario = JSON.parse(usuarioSalvoString);
        $("#name").value = usuario.nome;
        $("#email").value = usuario.email;
        $("#phone").value = formatarTelefone(usuario.telefone);
    } else {
        alert("Usuário não encontrado. Por favor, faça o login novamente.");
        window.location.href = "./login.html";
    }
}

$("#phone").addEventListener("input", (e) => {
    e.target.value = formatarTelefone(e.target.value);
});

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

    if (!validarEmail(email)) {
        alert("O formato do e-mail é inválido. Por favor, verifique.");
        return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        alert("O número de telefone parece inválido. Deve conter DDD + número.");
        return;
    }
    
    const usuarioSalvoString = localStorage.getItem("usuario");
    const usuarioSalvo = JSON.parse(usuarioSalvoString);

    const dadosAtualizados = {
        ...usuarioSalvo,
        nome: nome,
        email: email,
        telefone: telefoneLimpo,
    };

    const string = JSON.stringify(dadosAtualizados);
    localStorage.setItem("usuario", string);

    alert("Perfil atualizado com sucesso!");
});
