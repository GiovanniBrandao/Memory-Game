<?php
    session_start();
    header('Content-Type: application/json');

    $id_jogador = $_SESSION['id_jogador'];

    // Receber dados
    $nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS);

    $senha_atual = $_POST['senha_atual'] ?? '';
    $nova_senha = $_POST['nova_senha'] ?? '';

    // Validação básica
    if (empty($nome) || empty($email)) {
        http_response_code(400);
        echo json_encode(["error" => "Nome e E-mail são obrigatórios."]);
        exit();
    }

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // 1. Verificar se o email já pertence a OUTRO utilizador (evitar duplicados)
        $sql_check = "SELECT id_jogador FROM jogador WHERE email = :email AND id_jogador != :id";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bindParam(':email', $email);
        $stmt_check->bindParam(':id', $id_jogador);
        $stmt_check->execute();

        if ($stmt_check->rowCount() > 0) {
            http_response_code(409);
            echo json_encode(["error" => "Este e-mail já está em uso por outra conta."]);
            exit();
        }

        // 2. Lógica de alteração de senha e montagem da query
        $sql = "UPDATE jogador SET nome = :nome, email = :email, telefone = :telefone";
        $params = [
            ':nome' => $nome,
            ':email' => $email,
            ':telefone' => $telefone,
            ':id' => $id_jogador
        ];

        // Se o utilizador tentou mudar a senha
        if (!empty($nova_senha)) {
            if (empty($senhab_atual)) {
                http_response_code(400);
                echo json_encode(["error" => "Para definir uma nova senha, informe a senha atual."]);
                exit();
            }

            // Buscar a hash da senha atual no banco
            $sql_pass = "SELECT senha FROM jogador WHERE id_jogador = :id";
            $stmt_pass = $conn->prepare($sql_pass);
            $stmt_pass->bindParam(':id', $id_jogador);
            $stmt_pass->execute();
            $current_data = $stmt_pass->fetch(PDO::FETCH_ASSOC);

            if (!$current_data || !password_verify($senha_atual, $current_data['senha'])) {
                http_response_code(401);
                echo json_encode(["error" => "A senha atual está incorreta."]);
                exit();
            }

            // Se a senha atual estiver correta, adiciona a nova senha à query
            $sql .= ", senha = :nova_senha";
            $params[':nova_senha'] = password_hash($nova_senha, PASSWORD_DEFAULT);
        }

        $sql .= " WHERE id_jogador = :id";

        // 3. Executar atualização
        $stmt = $conn->prepare($sql);
        if ($stmt->execute($params)) {
            // Atualiza a sessão com o novo nome
            $_SESSION['nome'] = $nome;
            
            echo json_encode(["success" => true, "message" => "Perfil atualizado com sucesso!"]);
        } else {
            echo json_encode(["error" => "Não foi possível atualizar os dados."]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro no servidor: " . $e->getMessage()]);
    }
?>