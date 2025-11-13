<?php
    session_start();

    unset($_SESSION['login_fail']);
    unset($_SESSION['nome']);
    unset($_SESSION['username']);
    unset($_SESSION['id_jogador']);

    header("Location: ../front/login.php");
    die();
?>