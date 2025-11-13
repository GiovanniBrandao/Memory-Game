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
    if (!phone) return "";
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
    if (!cpf) return "";
    let value = cpf.replace(/\D/g, "");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d)/, "$1.$2");
    value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    return value;
}

async function loadProfileData() {
    try {
        const response = await fetch('../backend/carregar_perfil.php');

        if (!response.ok) {
            throw new Error('Não foi possível carregar os dados.');
        }

        const user = await response.json();

        $("#name").value = user.nome || "";
        $("#username").value = user.username || "";
        $("#birthdate").value = user.data_nasc || "";
        $("#cpf").value = formatCPF(user.cpf || "");
        $("#email").value = user.email || "";
        $("#phone").value = formatPhone(user.telefone || "");

    } catch (error) {
        console.error(error);
        alert("Sessão expirada ou erro ao carregar dados. Por favor faça login novamente.");
        window.location.href = "./login.php";
    }
}

async function saveProfileChanges() {
    const name = $("#name").value;
    const email = $("#email").value;
    const phone = $("#phone").value;
    
    const currentPassword = $("#current-password").value;
    const newPassword = $("#new-password").value;
    const confirmPassword = $("#confirm-password").value;

    // Validações Frontend
    if (name.length === 0 || email.length === 0) {
        alert("Nome e E-mail são obrigatórios.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Formato de email inválido");
        return;
    }

    if (newPassword.length > 0) {
        if (currentPassword.length === 0) {
            alert("Por favor, digite sua senha atual para realizar a troca.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("A nova senha e a confirmação não coincidem.");
            return;
        }
    }

    const formData = new URLSearchParams();
    formData.append('nome', name);
    formData.append('email', email);
    formData.append('telefone', phone.replace(/\D/g, "")); // Envia apenas números
    
    if (newPassword.length > 0) {
        formData.append('senha_atual', currentPassword);
        formData.append('nova_senha', newPassword);
    }

    try {
        const response = await fetch('../backend/atualizar_perfil.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        const data = await response.json();

        if (response.ok && data.success) {
            alert(data.message);

            $("#current-password").value = "";
            $("#new-password").value = "";
            $("#confirm-password").value = "";
        } else {
            alert(data.error || "Ocorreu um erro ao salvar.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com o servidor.");
    }
}

function initializeApp() {
    loadProfileData(); 

    $("#phone").addEventListener("input", (e) => {
        e.target.value = formatPhone(e.target.value);
    });
    
    $(".botao-salvar").addEventListener("click", (ev) => {
        ev.preventDefault();
        saveProfileChanges();
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);