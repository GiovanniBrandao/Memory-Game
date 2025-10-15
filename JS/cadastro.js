const $ = (elemento) => document.querySelector(elemento);

function validateEmail(email) {
    const commonTlds = [
        "com", "org", "net", "edu", "gov", "mil", "int", "br", "io", "co", 
        "info", "biz", "name", "mobi", "app", "dev", "xyz", "club", "online", 
        "store", "tech", "site", "me", "tv", "us", "uk", "ca", "de", "jp", 
        "fr", "au", "ru", "ch", "it", "nl", "se", "no", "es", "pt"
    ];

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(String(email).toLowerCase())) {
        return false;
    }

    const parts = email.split('.');
    const tld = parts[parts.length - 1].toLowerCase();
    
    return commonTlds.includes(tld);
}

function validateCPF(cpf) {
  cpf = cpf.replace(/[^\d]+/g, '');
  if (cpf == '') return false;
  if (
    cpf.length != 11 ||
    cpf == "00000000000" ||
    cpf == "11111111111" ||
    cpf == "22222222222" ||
    cpf == "33333333333" ||
    cpf == "44444444444" ||
    cpf == "55555555555" ||
    cpf == "66666666666" ||
    cpf == "77777777777" ||
    cpf == "88888888888" ||
    cpf == "99999999999"
  )
    return false;
  let add = 0;
  for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(9))) return false;
  add = 0;
  for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpf.charAt(10))) return false;
  return true;
}

function registerUser() {
    const nome = $("#nome").value;
    const usuario = $("#usuario").value;
    const nascimento = $("#nascimento").value;
    const cpf = $("#cpf").value;
    const telefone = $("#telefone").value;
    const email = $("#mail").value;
    const confirmaEmail = $("#mail-confirm").value;
    const senha = $("#senha").value;
    const confirmaSenha = $("#senha-confirm").value;

    if (
        nome.length === 0 ||
        usuario.length === 0 ||
        nascimento.length === 0 ||
        cpf.length === 0 ||
        telefone.length === 0 ||
        email.length === 0 ||
        senha.length === 0
    ) {
        alert("Por favor, preencha todos os campos antes de continuar.");
        return;
    }

    if (!validateEmail(email)) {
        alert("O formato do e-mail é inválido. Por favor, verifique.");
        return;
    }

    if (email !== confirmaEmail) {
        alert("O e-mail e a confirmação de e-mail não conferem.\nPor favor, verifique.");
        return;
    }

    if (!validateCPF(cpf)) {
        alert("O CPF inserido é inválido. Por favor, verifique.");
        return;
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");
    if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) {
        alert("O número de telefone parece inválido. Deve conter DDD + número.");
        return;
    }

    if (senha !== confirmaSenha) {
        alert("A senha e a confirmação de senha não conferem.\nPor favor, verifique.");
        return;
    }

    const usuarioCadastrado = {
        nome,
        usuario,
        nascimento,
        cpf: cpf.replace(/\D/g, ''),
        telefone: telefone.replace(/\D/g, ''),
        email,
        senha,
    };

    const string = JSON.stringify(usuarioCadastrado);
    localStorage.setItem("usuario", string);

    alert("Cadastro realizado com sucesso!");
    window.location.href = "./login.html";
}

$("#cpf").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    e.target.value = value;
});

$("#telefone").addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, "");
    value = value.replace(/^(\d{2})(\d)/g, "($1) $2");
    value = value.replace(/(\d)(\d{4})$/, "$1-$2");
    e.target.value = value;
});

$(".cadastro-button").addEventListener("click", (ev) => {
  ev.preventDefault();
  registerUser();
});