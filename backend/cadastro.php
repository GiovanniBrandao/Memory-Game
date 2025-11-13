<?php 
    function validation($conn, $username, $email) {
        $sql_check = "SELECT 1 
                    FROM jogador 
                    WHERE username = :username OR email = :email 
                    LIMIT 1";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bindParam(':username', $username);
        $stmt_check->bindParam(':email', $email);
        $stmt_check->execute();

        if ($stmt_check->fetch()) {
            http_response_code(409);
            echo json_encode(["error" => "Nome de usuário ou e-mail já em uso. Por favor, escolha outro."]);
            exit();
        }
    }
    
    $nome = filter_var($_POST['nome'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $nascimento = filter_var($_POST['nascimento'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $cpf = filter_var($_POST['cpf'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $telefone = filter_var($_POST['telefone'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $email = filter_var($_POST['mail'] ?? '', FILTER_SANITIZE_EMAIL);
    $username = filter_var($_POST['usuario'] ?? '', FILTER_SANITIZE_SPECIAL_CHARS);
    $senha_limpa = $_POST['senha'] ?? '';
    $senha_hash = password_hash($senha_limpa, PASSWORD_DEFAULT);

    // como nascimento é um parametro nao obrigatorio, tem que validar se tem algo ou nao
    $nascimento_db = (!empty($nascimento)) ? $nascimento : NULL;

    // verifica os que sao obrigatorios
    if (empty($nome) || empty($email) || empty($username) || empty($senha_limpa)) {
        http_response_code(400);
        echo json_encode(["error" => "Por favor, preencha todos os campos obrigatórios."]);
        exit();
    }

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        validation($conn, $username, $email);

        $sql = "INSERT INTO jogador 
                (nome, data_nasc, cpf, telefone, email, username, senha) 
                VALUES
                (:nome, :nascimento, :cpf, :telefone, :email, :username, :senha_hash)";
        
        $stmt = $conn->prepare($sql);
        
        $stmt->bindParam(':nome', $nome);
        if ($nascimento_db === null) {
            $stmt->bindParam(':nascimento', $nascimento_db, PDO::PARAM_NULL);
        } else {
            $stmt->bindParam(':nascimento', $nascimento_db); 
        }
        $stmt->bindParam(':cpf', $cpf);
        $stmt->bindParam(':telefone', $telefone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':senha_hash', $senha_hash); 
        $result = $stmt->execute();

        if ($result) {
            header("Location: ../frontend/login.php"); 
        } else {
            echo "Houve um erro ao inserir os dados.";
        }

        exit();
    } catch (PDOException $e ) {
        http_response_code(500);
        echo json_encode(["error" => "Falha na conexão ou inserção: " . $e->getMessage()]);
        exit();
    }
?>