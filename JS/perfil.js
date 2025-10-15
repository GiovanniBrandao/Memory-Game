const $ = (element) => document.querySelector(element);

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

function formatPhone(phone) {
    let value = phone.replace(/\D/g, "");
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

function formatCPF(cpf) {
    let value = cpf.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
}

function loadProfileData() {
    const savedUserString = localStorage.getItem("usuario");

    if (savedUserString) {
        const user = JSON.parse(savedUserString);
        $("#name").value = user.nome;
        $("#username").value = user.usuario;
        $("#birthdate").value = user.nascimento;
        $("#cpf").value = formatCPF(user.cpf);
        $("#email").value = user.email;
        $("#phone").value = formatPhone(user.telefone);
    } else {
        alert("User not found. Please log in again.");
        window.location.href = "./login.html";
    }
}

function saveProfileChanges() {
    const name = $("#name").value;
    const email = $("#email").value;
    const phone = $("#phone").value;
    const currentPassword = $("#current-password").value;
    const newPassword = $("#new-password").value;
    const confirmPassword = $("#confirm-password").value;

    if (name.length === 0 || email.length === 0 || phone.length === 0) {
        alert("Por favora preencha todas as informações pessoais.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Este formato de email é invalido. Por favor cheque novamente");
        return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        alert("Número de celular inválido. Deve conter o DDD + número.");
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
    
    const savedUserString = localStorage.getItem("usuario");
    const savedUser = JSON.parse(savedUserString);

    let passwordToSave = savedUser.senha;

    if (newPassword.length > 0 || currentPassword.length > 0) {
        if (currentPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
            alert("Para mudar sua senha, você deve preencher todos os campos de senha.");
            return;
        }

        if (currentPassword !== savedUser.senha) {
            alert("A senha atual está incorreta.");
            return;
        }

        if (newPassword !== confirmPassword) {
            alert("A nova senha não corresponde a senha de confirmação.");
            return;
        }

        passwordToSave = newPassword;
    }

    const updatedData = {
        ...savedUser,
        nome: name,
        email: email,
        telefone: cleanPhone,
        senha: passwordToSave,
    };

    const string = JSON.stringify(updatedData);
    localStorage.setItem("usuario", string);

    alert("Perfil atualizado com sucesso!");
    
    $("#current-password").value = "";
    $("#new-password").value = "";
    $("#confirm-password").value = "";
}

$("#phone").addEventListener("input", (e) => {
    e.target.value = formatPhone(e.target.value);
});

document.addEventListener('DOMContentLoaded', loadProfileData);

$(".botao-salvar").addEventListener("click", (ev) => {
    ev.preventDefault();
    saveProfileChanges();
});