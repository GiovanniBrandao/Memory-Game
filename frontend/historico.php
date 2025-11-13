<?php
    session_start();
    if (!isset($_SESSION['username'])) {
        header("Location: login.php");
        exit(); 
    }
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="CSS/main.css">
    <link rel="stylesheet" href="CSS/navbar.css">
    <link rel="stylesheet" href="CSS/matchHistory.css">
    <title>Jogo da memória - Histórico</title>
</head>
<body>
    <?php include "navbar.php"; ?>

    <main class="container-historico">
        <h1>Histórico de Partidas</h1>
        <div class="table-container">
            <table>
                <thead>
                    <tr>
                        <th>Jogador</th>
                        <th>Dimensão</th>
                        <th>Modalidade</th>
                        <th>Tempo</th>
                        <th>Jogadas</th>
                        <th>Resultado</th>
                        <th>Data</th>
                    </tr>
                </thead>
                <tbody>
                    </tbody>
            </table>
        </div>
    </main>

    <footer>
        <p>© 2025 Universidade Estadual de Campinas - Campus Limeira</p>
    </footer>

    <script src="JS/historico.js"></script>
</body>
</html>
