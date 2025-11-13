<?php
session_start();
header('Content-Type: application/json');

// Verifica se está logado
if (!isset($_SESSION['id_jogador'])) {
    http_response_code(401);
    echo json_encode(["error" => "Não autorizado"]);
    exit();
}

try {
    $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Busca os dados do jogador logado
    $sql = "SELECT nome, username, data_nasc, cpf, email, telefone FROM jogador WHERE id_jogador = :id";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':id', $_SESSION['id_jogador']);
    $stmt->execute();

    $dados = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if ($dados) {
        echo json_encode($dados);
    } else {
        echo json_encode(["error" => "Usuário não encontrado no banco."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["error" => "Erro no servidor"]);
}
?>