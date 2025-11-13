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
        
        if (response.ok || response.status === 302 || response.status === 303) {
            const locationHeader = response.headers.get('Location');
            
            alert("Cadastro realizado com sucesso!");
            
            if (locationHeader) {
                window.location.href = locationHeader; 
            } else { // caso o php não retorne o header
                 window.location.href = "../frontend/login.php"; 
            }
        } else {
            alert("Erro no cadastro. Verifique se o nome de usuário ou e-mail já estão em uso.");
        }

    } catch (error) {
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