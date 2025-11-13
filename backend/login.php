<?php 
    session_start();
    header('Content-Type: application/json');

    $usuario = trim($_POST['usuario'] ?? ''); 
    $s_senha = $_POST['senha'] ?? ''; 

    if (empty($usuario) || empty($s_senha)) {
        http_response_code(400);
        echo json_encode(["error" => "Por favor, preencha o campo de usuário e a senha."]);
        exit();
    }

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT id_jogador, nome, username, senha 
                FROM jogador 
                WHERE username = :usuario
                LIMIT 1";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':usuario', $usuario, PDO::PARAM_STR);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($row && password_verify($s_senha, $row['senha'])) {
            unset($_SESSION['login_fail']);
            $_SESSION['nome'] = $row['nome'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['id_jogador'] = $row['id_jogador']; 
            
            http_response_code(200); 
            echo json_encode(["success" => true, "redirect" => "../frontend/jogo.php"]);
            exit(); 
            
        } else {
            http_response_code(401);
            echo json_encode(["error" => "Usuário ou senha inválidos."]);
            exit();
        }
    } catch (PDOException $e ) {
        http_response_code(500); 
        echo json_encode(["error" => "Falha no servidor. Tente novamente mais tarde."]);
        exit();
    }
?>