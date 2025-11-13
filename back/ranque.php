<?php 
    session_start();

    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);


        $dimensoes = $_GET['dimensoes']; 
        if(!isset($_GET['dimensoes'])){
            $dimensoes = "8x8"; 
        }

        $sql  = "select username, num_jogadas, tempo_gasto from partida inner join jogador on cod_jogador = id_jogador 
                where resultado = 'vitoria' and dimensoes = '$dimensoes'
                order by tempo_gasto, num_jogadas 
                limit 10;";

        $stmt = $conn->query($sql);

        $i = 0;
        $_SESSION['ranques'] = array();
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $_SESSION['ranques'][$i]['username'] = $row['username'];
            $_SESSION['ranques'][$i]['num_jogadas'] = $row['num_jogadas'];
            $_SESSION['ranques'][$i]['tempo_gasto'] = $row['tempo_gasto'];

            $i +=1;
        }

        header("Location: ../front/ranque.php");

    } catch (PDOException $e ) {
        echo "Connection failed:  " . $e->getMessage();
        die();
    }
?>