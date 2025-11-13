<?php 
    session_start();

    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $username = $_SESSION['username'];

        $sql  = "select username, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora 
            from partida inner join jogador on cod_jogador = id_jogador 
            where username = '$username' 
            order by data_hora desc;";

        $stmt = $conn->query($sql);

        $i = 0;
        $_SESSION['historico'] = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $_SESSION['historico'][$i]['username'] = $row['username'];
            $_SESSION['historico'][$i]['dimensoes'] = $row['dimensoes'];
            $_SESSION['historico'][$i]['modalidade'] = $row['modalidade'];
            $_SESSION['historico'][$i]['tempo_gasto'] = $row['tempo_gasto'];
            $_SESSION['historico'][$i]['num_jogadas'] = $row['num_jogadas'];
            $_SESSION['historico'][$i]['resultado'] = $row['resultado'];
            $_SESSION['historico'][$i]['data_hora'] = $row['data_hora'];

            $i +=1;
        }

        header("Location: ../front/historico.php");

    } catch (PDOException $e ) {
        echo "Connection failed:  " . $e->getMessage();
        die();
    }
?>