<!DOCTYPE html>
<html lang="pt-br">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="Resources/Images/videogame.svg">
    <link rel="stylesheet" href="CSS/main.css">
    <link rel="stylesheet" href="CSS/helpers.css">
    <link rel="stylesheet" href="CSS/signup.css">
    <title>Cadastro</title>
</head>

<body>
    <main class="centralizar">
        <section class="card login-central">
            <h1>CADASTRO</h1>
            <div class="formulario">
                <form>
                    <label for="nome">Nome Completo<span class="campo-obrigatorio">*</span></label>
                    <input type="text" name="nome" id="nome" placeholder="Digite seu nome" required **autocomplete="name"**>

                    <label for="usuario">Nome de Usuário<span class="campo-obrigatorio">*</span></label>
                    <input type="text" name="usuario" id="usuario" placeholder="Crie um nome de usuário" required>
                    
                    <label for="nascimento">Data de Nascimento</label>
                    <input type="date" name="nascimento" id="nascimento">

                    <label for="cpf">CPF<span class="campo-obrigatorio">*</span></label>
                    <input type="text" name="cpf" id="cpf" placeholder="Digite seu CPF" minlength="14" maxlength="14" required>

                    <label for="telefone">Telefone</label>
                    <input type="text" name="telefone" id="telefone" placeholder="(xx) xxxxx-xxxx" minlength="14" maxlength="15" **autocomplete="tel"**>

                    <label for="email">E-mail<span class="campo-obrigatorio">*</span></label>
                    <input type="email" name="email" id="email" placeholder="Digite seu e-mail" required **autocomplete="email"**>

                    <label for="senha">Senha<span class="campo-obrigatorio">*</span></label>
                    <input type="password" name="senha" id="senha" placeholder="Digite uma senha" required **autocomplete="new-password"**>

                    <label for="senha-confirm">Confirmação de Senha<span class="campo-obrigatorio">*</span></label>
                    <input type="password" name="senha-confirm" id="senha-confirm" placeholder="Digite a senha novamente" required **autocomplete="new-password"**>

                    <button type="submit" class="botao-principal cadastro-button">Cadastrar</button>
                </form>
            </div>
            <a href="login.php" target="_self">Já tem uma conta?</a>
        </section>
    </main>

    <footer>
        <p>© 2025 Universidade Estadual de Campinas - Campus Limeira</p>
    </footer>
    <script src="JS/cadastro/cadastro.js"></script>
    <script src="JS/cadastro/mascaras.js"></script>
    <script src="JS/cadastro/validacao.js"></script>
</body>
</html>