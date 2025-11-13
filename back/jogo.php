<?php 
    session_start();

    $s_dimensoes = filter_var($_POST['dimensoes'], FILTER_SANITIZE_STRING);
    $s_modalidade = filter_var($_POST['modalidade'], FILTER_SANITIZE_STRING);
    $s_tempo_gasto = filter_var($_POST['tempo_gasto'], FILTER_SANITIZE_STRING);
    $s_num_jogadas = filter_var($_POST['num_jogadas'], FILTER_SANITIZE_STRING);
    $s_resultado = filter_var($_POST['resultado'], FILTER_SANITIZE_STRING);
    $s_data_hora = filter_var($_POST['data_hora'], FILTER_SANITIZE_STRING);

    $cod_jogador = $_SESSION['id_jogador'];

    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql  = "insert into partida 
        (cod_jogador, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora) 
        values
        ($cod_jogador,'$s_dimensoes','$s_modalidade',$s_tempo_gasto,$s_num_jogadas,'$s_resultado','$s_data_hora');";
        
        $result = $conn->exec($sql);

        if ($result) {
            header("Location: ../front/jogo.php");
            die();
        }
        else{
            echo "Houve um erro: " . $conn->errorCode();
            die();
        }

    } catch (PDOException $e ) {
        echo "Connection failed:  " . $e->getMessage();
        die();
    }
?>