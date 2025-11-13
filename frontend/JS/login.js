const $ = (elemento) => document.querySelector(elemento);
const ENDPOINT_LOGIN = '../backend/login.php'; 

async function fetchData() {
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

        if (response.ok) {
            const data = await response.json(); 
            window.location.href = data.redirect;
        } 

        // tratamento de erros
        response.json().then(data => {
            if (data.error) {
                alert(data.error);
            }
        }).catch(error => {
            console.error("Erro ao processar a resposta: ", error);
        });


    } catch {
        alert("Não foi possível conectar ao servidor.");
    }
}

const loginForm = $("form"); 
if (loginForm) {
    loginForm.addEventListener("submit", (ev) => {
        ev.preventDefault();
        fetchData(); 
    });
}