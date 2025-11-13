<?php
    header('Content-Type: application/json'); 
    session_start();

    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $dimensoes = $_GET['dimensoes'] ?? "8x8";

        $sql = "SELECT username, num_jogadas, tempo_gasto FROM partida 
                INNER JOIN jogador ON cod_jogador = id_jogador 
                WHERE resultado = 'vitoria' AND dimensoes = :dimensoes
                ORDER BY tempo_gasto, num_jogadas 
                LIMIT 10";
        
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':dimensoes', $dimensoes, PDO::PARAM_STR);
        $stmt->execute();

        $ranques = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($ranques);

    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(["error" => "Falha na conexão ou consulta: " . $e->getMessage()]);
    }
?>