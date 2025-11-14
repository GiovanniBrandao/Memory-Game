<?php
    session_start();
    header('Content-Type: application/json');

    $id_jogador = $_SESSION['id_jogador'];

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        // Seleciona os dados necessários para o perfil
        $sql = "SELECT nome, username, data_nasc, cpf, email, telefone 
                FROM jogador 
                WHERE id_jogador = :id";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':id', $id_jogador, PDO::PARAM_INT);
        $stmt->execute();

        $dados = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($dados) {
            echo json_encode($dados);
        } else {
            http_response_code(404);
            echo json_encode(["error" => "Perfil não encontrado"]);
        }

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Erro no servidor: " . $e->getMessage()]);
    }
?>