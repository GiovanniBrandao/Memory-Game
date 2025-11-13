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
    if (
        cpf.length !== 11 ||
        cpf === "00000000000" ||
        cpf === "11111111111" ||
        cpf === "22222222222" ||
        cpf === "33333333333" ||
        cpf === "44444444444" ||
        cpf === "55555555555" ||
        cpf === "66666666666" ||
        cpf === "77777777777" ||
        cpf === "88888888888" ||
        cpf === "99999999999"
    )
        return false;
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(9))) return false;
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev === 10 || rev === 11) rev = 0;
    if (rev !== parseInt(cpf.charAt(10))) return false;
    return true;
}

function validateNewUser() { 
    const nome = $("#nome").value.trim();
    const usuario = $("#usuario").value.trim();
    const nascimento = $("#nascimento").value;
    const cpf = $("#cpf").value;
    const telefone = $("#telefone").value;
    const email = $("#email").value.trim();
    const senha = $("#senha").value;
    const confirmaSenha = $("#senha-confirm").value;

    if (
        nome.length === 0 || 
        usuario.length === 0 || 
        cpf ===0 ||
        email.length === 0 || 
        senha.length === 0 || 
        confirmaSenha.length === 0
    ) {
        alert("Por favor, preencha todos os campos obrigatórios antes de continuar.");
        return null;
    }
    
    if (!validateEmail(email)) {
        alert("O formato do e-mail é inválido. Por favor, verifique.");
        return null;
    }

    if (senha !== confirmaSenha) {
        alert("A senha e a confirmação de senha não conferem.\nPor favor, verifique.");
        return null;
    }
    
    if (!validateCPF(cpf)) {
        alert("O CPF inserido é inválido. Por favor, verifique.");
        return null;
    }

    if (telefone.length > 0) {
        const telefoneLimpo = telefone.replace(/\D/g, "");
        if (telefoneLimpo.length < 10 || telefoneLimpo.length > 11) { 
            alert("O número de telefone parece inválido. Deve conter DDD + número (10 ou 11 dígitos).");
            return null;
        }
    }

    return {
        nome, usuario, nascimento, cpf, telefone, email, senha
    };
}
