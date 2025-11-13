const $ = (element) => document.querySelector(element);

// Funções de validação e formatação (mantidas)
function validateEmail(email) {
    const commonTlds = ["com", "org", "net", "edu", "gov", "br", "io", "co", "info", "biz"];
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(String(email).toLowerCase())) return false;
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

// NOVA FUNÇÃO DE CARREGAMENTO (Substitui a antiga que usava localStorage)
async function loadProfileData() {
    try {
        const response = await fetch('../backend/get_perfil.php');
        
        // Se não estiver logado, o PHP retorna 401
        if (response.status === 401) {
            alert("Sessão expirada. Faça login novamente.");
            window.location.href = "login.php";
            return;
        }

        const user = await response.json();

        if (user.error) {
            console.error("Erro:", user.error);
            return;
        }

        // Preenche os campos com dados do BANCO DE DADOS
        $("#name").value = user.nome || "";
        $("#username").value = user.username || "";
        $("#birthdate").value = user.data_nasc || "";
        $("#cpf").value = formatCPF(user.cpf || "");
        $("#email").value = user.email || "";
        $("#phone").value = formatPhone(user.telefone || "");

    } catch (error) {
        console.error("Erro ao conectar com o servidor:", error);
    }
}

// FUNÇÃO DE SALVAR (Também atualizada para usar fetch)
async function saveProfileChanges() {
    const name = $("#name").value;
    const email = $("#email").value;
    const phone = $("#phone").value;
    const currentPassword = $("#current-password").value;
    const newPassword = $("#new-password").value;
    const confirmPassword = $("#confirm-password").value;

    if (name.length === 0 || email.length === 0 || phone.length === 0) {
        alert("Por favor preencha todas as informações pessoais para salvar.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Formato de email inválido");
        return;
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        alert("Formato de telefone inválido.");
        return;
    }

    const formData = new FormData();
    formData.append('nome', name);
    formData.append('email', email);
    formData.append('telefone', cleanPhone);

    if (newPassword.length > 0) {
        if (currentPassword.length === 0 || confirmPassword.length === 0) {
            alert("Para mudar a senha, preencha todos os campos de senha.");
            return;
        }
        if (newPassword !== confirmPassword) {
            alert("A nova senha e a confirmação não são iguais.");
            return;
        }
        formData.append('senha_atual', currentPassword);
        formData.append('nova_senha', newPassword);
    }

    try {
        // Você precisa ter criado o arquivo atualizar_perfil.php (passo anterior)
        const response = await fetch('../backend/atualizar_perfil.php', {
            method: 'POST',
            body: formData
        });
        
        const result = await response.json();

        if (result.success) {
            alert("Perfil atualizado com sucesso!");
            $("#current-password").value = "";
            $("#new-password").value = "";
            $("#confirm-password").value = "";
        } else {
            alert("Erro: " + (result.error || "Erro desconhecido"));
        }
    } catch (error) {
        console.error("Erro:", error);
        alert("Erro de conexão ao salvar.");
    }
}

function initializeApp() {
    loadProfileData();

    $("#phone").addEventListener("input", (e) => {
        e.target.value = formatPhone(e.target.value);
    });
    
    const btnSalvar = $(".botao-salvar");
    if(btnSalvar) {
        btnSalvar.addEventListener("click", (ev) => {
            ev.preventDefault();
            saveProfileChanges();
        });
    }
}

document.addEventListener('DOMContentLoaded', initializeApp);