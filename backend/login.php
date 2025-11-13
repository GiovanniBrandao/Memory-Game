<?php 
session_start();
header('Content-Type: application/json'); // Garante que o retorno é JSON

$identificador = trim($_POST['usuario'] ?? ''); 
$s_senha = $_POST['senha'] ?? ''; 

// --- 1. VERIFICAÇÃO DE CAMPOS ---
if (empty($identificador) || empty($s_senha)) {
    http_response_code(400); // Bad Request
    echo json_encode(["error" => "Por favor, preencha o campo de usuário e a senha."]);
    exit();
}

// --- 2. TENTATIVA DE LOGIN E RESPOSTA ---
try {
    $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $sql = "SELECT id_jogador, nome, username, senha 
            FROM jogador 
            WHERE username = :identificador
            LIMIT 1";

    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':identificador', $identificador, PDO::PARAM_STR);
    $stmt->execute();

    $row = $stmt->fetch(PDO::FETCH_ASSOC);
    
    // --- SUCESSO ---
    if ($row && password_verify($s_senha, $row['senha'])) {
        unset($_SESSION['login_fail']);
        $_SESSION['nome'] = $row['nome'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['id_jogador'] = $row['id_jogador']; 
        
        http_response_code(200); // OK
        echo json_encode(["success" => true, "redirect" => "../frontend/jogo.php"]);
        exit(); 
        
    } else {
        // --- FALHA ---
        http_response_code(401); // Unauthorized (Não Autorizado)
        echo json_encode(["error" => "Usuário ou senha inválidos."]);
        exit();
    }

// --- 3. TRATAMENTO DE ERRO DE SERVIDOR/DB ---
} catch (PDOException $e ) {
    http_response_code(500); // Internal Server Error
    echo json_encode(["error" => "Falha no servidor. Tente novamente mais tarde."]);
    exit();
}
// OBS: Você pode remover a variável de sessão $_SESSION['login_fail'] pois o JS fará o feedback.
?>