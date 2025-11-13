// JS: login.js
const $ = (elemento) => document.querySelector(elemento);

const loginButton = $(".entrar-button");
const form = loginButton.closest('form'); 

const ENDPOINT_LOGIN = '../backend/login.php'; 

form.addEventListener("submit", async (ev) => {
    ev.preventDefault();

    const usuarioLimpo = $("#usuario").value.trim();
    const senhaInput = $("#senha").value;
    
    if (!usuarioLimpo || !senhaInput) {
        alert("Por favor, preencha o campo de usuário/e-mail e a senha.");
        return;
    }

    const formData = new URLSearchParams();
    formData.append('usuario', usuarioLimpo);
    formData.append('senha', senhaInput);

    try {
        const response = await fetch(ENDPOINT_LOGIN, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData 
        });

        const data = await response.json(); // Tenta ler o JSON da resposta

        if (response.ok) {
            // Login de SUCESSO (Status 200 OK)
            if (data.success && data.redirect) {
                window.location.href = data.redirect; // Redireciona para o jogo.php
            } else {
                alert("Login falhou devido a uma resposta inesperada do servidor (Sucesso sem redirecionamento).");
            }
        } else {
            // Login de FALHA (Status 400, 401, 500 etc.)
            const errorMessage = data.error || `Erro inesperado: ${response.status}`;
            alert(`Falha no Login: ${errorMessage}`);
        }

    } catch (error) {
        console.error('Erro de rede ou na requisição:', error);
        alert("Não foi possível conectar ao servidor. Verifique sua conexão ou a resposta inesperada.");
    }
});