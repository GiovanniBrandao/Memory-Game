const $ = (elemento) => document.querySelector(elemento);

$(".cadastro-button").addEventListener("click", (ev) => {
  ev.preventDefault();

  const nome = $("#nome").value;
  const usuario = $("#usuario").value;
  const cpf = $("#cpf").value;
  const telefone = $("#telefone").value;
  const email = $("#mail").value;
  const confirmaEmail = $("#mail-confirm").value;
  const senha = $("#senha").value;
  const confirmaSenha = $("#senha-confirm").value;

  if (
    nome.length === 0 ||
    usuario.length === 0 ||
    cpf.length === 0 ||
    telefone.length === 0 ||
    email.length === 0 ||
    senha.length === 0
  ) {
    alert("Por favor, preencha todos os campos antes de continuar.");
    return;
  }

  if (email !== confirmaEmail) {
    alert("O e-mail e a confirmação de e-mail não conferem.\nPor favor, verifique.");
    return;
  }

  if (senha !== confirmaSenha) {
    alert("A senha e a confirmação de senha não conferem.\nPor favor, verifique.");
    return;
  }

  const usuarioCadastrado = {
    nome,
    usuario,
    cpf,
    telefone,
    email,
    senha,
  };

  const string = JSON.stringify(usuarioCadastrado);
  localStorage.setItem("usuario", string);

  alert("Cadastro realizado com sucesso!");
  window.location.href = "./login.html";
});

//função de validação adiquirida em https://github.com/eraldosiniciof/forum-alura/tree/master/duvida17
