const $ = (elemento) => document.querySelector(elemento);
const ENDPOINT_REGISTER = '../backend/cadastro.php'; 

async function fetchData() {
    const userData = validateNewUser();

    if (!userData) {
        return;
    }

    const formData = new URLSearchParams();
    
    formData.append('nome', userData.nome);
    formData.append('usuario', userData.usuario);
    formData.append('nascimento', userData.nascimento);
    formData.append('cpf', userData.cpf.replace(/\D/g, '')); 
    formData.append('telefone', userData.telefone.replace(/\D/g, ''));
    formData.append('mail', userData.email); 
    formData.append('senha', userData.senha);
    
    try {
        const response = await fetch(ENDPOINT_REGISTER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData 
        }); // requisição
        
        if (response.ok) {
        const data = await response.json(); // Lê o corpo da resposta como JSON
        alert("Cadastro realizado com sucesso!");
        window.location.href = data.redirect; // Usa a URL enviada no JSON
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

const cadastroButton = $(".cadastro-button");
if (cadastroButton) {
    cadastroButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        fetchData(); 
    });
}