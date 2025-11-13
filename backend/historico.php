<?php 
    header('Content-Type: application/json'); 
    session_start();

    $username = $_SESSION['username'];

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "SELECT username, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora 
                FROM partida INNER JOIN jogador ON cod_jogador = id_jogador 
                WHERE username = :username
                ORDER BY data_hora DESC";

        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':username', $username, PDO::PARAM_STR);
        $stmt->execute();
        
        $historico = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode($historico);

    } catch (PDOException $e ) {
        http_response_code(500);
        echo json_encode(["error" => "Falha na conexão ou consulta: " . $e->getMessage()]);
    }
?>