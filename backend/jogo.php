<?php 
    $cod_jogador = $_SESSION['id_jogador'];
    
    $s_dimensoes = filter_input(INPUT_POST, 'dimensoes', FILTER_SANITIZE_SPECIAL_CHARS);
    $s_modalidade = filter_input(INPUT_POST, 'modalidade', FILTER_SANITIZE_SPECIAL_CHARS);
    $s_tempo_gasto = filter_input(INPUT_POST, 'tempo_gasto', FILTER_VALIDATE_INT);
    $s_num_jogadas = filter_input(INPUT_POST, 'num_jogadas', FILTER_VALIDATE_INT);
    $s_resultado = filter_input(INPUT_POST, 'resultado', FILTER_SANITIZE_SPECIAL_CHARS);
    $s_data_hora = filter_input(INPUT_POST, 'data_hora', FILTER_SANITIZE_SPECIAL_CHARS);

    try {
        $conn = new PDO("mysql:host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql = "INSERT INTO partida 
            (cod_jogador, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora) 
            VALUES
            (:cod_jogador, :dimensoes, :modalidade, :tempo_gasto, :num_jogadas, :resultado, :data_hora)";
        
        $stmt = $conn->prepare($sql);

        $stmt->bindParam(':cod_jogador', $cod_jogador, PDO::PARAM_INT);
        $stmt->bindParam(':dimensoes', $s_dimensoes, PDO::PARAM_STR);
        $stmt->bindParam(':modalidade', $s_modalidade, PDO::PARAM_STR);
        $stmt->bindParam(':tempo_gasto', $s_tempo_gasto, $s_tempo_gasto === false ? PDO::PARAM_NULL : PDO::PARAM_INT);
        $stmt->bindParam(':num_jogadas', $s_num_jogadas, $s_num_jogadas === false ? PDO::PARAM_NULL : PDO::PARAM_INT);
        $stmt->bindParam(':resultado', $s_resultado, PDO::PARAM_STR);
        $stmt->bindParam(':data_hora', $s_data_hora, PDO::PARAM_STR);
        
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            header("Location: ../frontend/jogo.php");
            exit(); 
        }
        else {
             echo "Houve um erro: Nenhuma linha afetada.";
             exit();
        }

    } catch (PDOException $e ) {
        http_response_code(500);
        echo json_encode(["error" => "Falha na conexão ou consulta: " . $e->getMessage()]);
        exit();
    }
?>