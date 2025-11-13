 
<?php 
    session_start();

    $s_nome = filter_var($_POST['nome'], FILTER_SANITIZE_STRING);
    $s_nascimento = filter_var($_POST['nascimento'], FILTER_SANITIZE_STRING);
    $s_cpf = filter_var($_POST['cpf'], FILTER_SANITIZE_STRING);
    $s_telefone = filter_var($_POST['telefone'], FILTER_SANITIZE_STRING);
    $s_email = filter_var($_POST['mail'], FILTER_SANITIZE_STRING);
    $s_username = filter_var($_POST['usuario'], FILTER_SANITIZE_STRING);
    $s_senha = filter_var($_POST['senha'], FILTER_SANITIZE_STRING);


    try {
        $conn = new PDO("mysql::host=localhost;dbname=Memoria", "root", "");
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

        $sql  = "insert into jogador 
        (nome, data_nasc, cpf, telefone, email, username, senha) 
        values
        ('$s_nome','$s_nascimento','$s_cpf','$s_telefone','$s_email','$s_username','$s_senha');";

        $result = $conn->exec($sql);

        if ($result) {
            header("Location: ../front/login.php");
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