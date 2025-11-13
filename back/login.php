<?php 
    session_start();

    $s_usuario = filter_var($_POST['usuario'], FILTER_SANITIZE_STRING);
    $s_senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);

    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql  = "Select * from jogador where username = '$s_usuario' and senha = '$s_senha';";

        $stmt = $conn->query($sql);

        if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            
            unset($_SESSION['login_fail']);
            $_SESSION['nome'] = $row['nome'];
            $_SESSION['username'] = $row['username'];
            $_SESSION['id_jogador'] = $row['id_jogador'];
            
            header("Location: ../front/jogo.php");
        }
        else{
            $_SESSION['login_fail'] = 1;
            header("Location: ../front/login.php");
            die();
        }

        die();

    } catch (PDOException $e ) {
        echo "Connection failed:  " . $e->getMessage();
        die();
    }
?>