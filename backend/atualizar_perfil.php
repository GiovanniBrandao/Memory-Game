<?php
session_start();
header('Content-Type: application/json');

if (!isset($_SESSION['id_jogador'])) {
    http_response_code(401);
    echo json_encode(["error" => "Não autorizado"]);
    exit();
}

// Filtra os dados recebidos
$nome = filter_input(INPUT_POST, 'nome', FILTER_SANITIZE_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$telefone = filter_input(INPUT_POST, 'telefone', FILTER_SANITIZE_SPECIAL_CHARS);

// Senhas (opcionais)
$senhaAtual = $_POST['senha_atual'] ?? '';
$novaSenha = $_POST['nova_senha'] ?? '';

try {
    $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Se o usuário enviou senha nova, precisamos verificar a atual antes
    if (!empty($novaSenha)) {
        // Busca senha atual no banco
        $stmt = $conn->prepare("SELECT senha FROM jogador WHERE id_jogador = :id");
        $stmt->bindParam(':id', $_SESSION['id_jogador']);
        $stmt->execute();
        $user = $stmt->fetch(PDO::FETCH_ASSOC);

        if (!$user || !password_verify($senhaAtual, $user['senha'])) {
            echo json_encode(["error" => "A senha atual está incorreta."]);
            exit();
        }
        
        // Atualiza TUDO (incluindo a senha nova criptografada)
        $hashNova = password_hash($novaSenha, PASSWORD_DEFAULT);
        $sql = "UPDATE jogador SET nome=:n, email=:e, telefone=:t, senha=:s WHERE id_jogador=:id";
        $stmtUpdate = $conn->prepare($sql);
        $stmtUpdate->bindParam(':s', $hashNova);
    } else {
        // Atualiza APENAS dados pessoais (sem mexer na senha)
        $sql = "UPDATE jogador SET nome=:n, email=:e, telefone=:t WHERE id_jogador=:id";
        $stmtUpdate = $conn->prepare($sql);
    }

    $stmtUpdate->bindParam(':n', $nome);
    $stmtUpdate->bindParam(':e', $email);
    $stmtUpdate->bindParam(':t', $telefone);
    $stmtUpdate->bindParam(':id', $_SESSION['id_jogador']);
    
    $stmtUpdate->execute();

    // Atualiza o nome na sessão para refletir a mudança imediatamente
    $_SESSION['nome'] = $nome;

    echo json_encode(["success" => true]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro ao atualizar: " . $e->getMessage()]);
}
?>