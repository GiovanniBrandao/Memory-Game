<?php 
    session_start();
    
    if(!isset($_SESSION['id_jogador'])){
        header('Location: ../front/login.php');
    }
?>


<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="../CSS/main.css">
    <link rel="stylesheet" href="../CSS/navbar.css">
    <link rel="stylesheet" href="../CSS/matchHistory.css">
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
                    <?php 
                        session_start();
                        for ($i=0;$i <10; $i++) { 
                            if(isset($_SESSION['historico'][$i])) {
                                $row = $_SESSION['historico'][$i];
                                $pos = $i +1;
                                echo "
                                <tr>
                                    <td data-label='username'> {$row['username']} </td>
                                    <td data-label='dimensoes'> {$row['dimensoes']} </td>
                                    <td data-label='modalidade'> {$row['modalidade']} </td>
                                    <td data-label='tempo_gasto'> {$row['tempo_gasto']} </td>
                                    <td data-label='num_jogadas'> {$row['num_jogadas']} </td>
                                    <td data-label='resultado' class={$row['resultado']}> {$row['resultado']} </td>
                                    <td data-label='data_hora'> {$row['data_hora']} </td>
                                </tr>";
                            }
                        }
                    ?>
            </table>
        </div>
    </main>

    <footer>
        <p>© 2025 Universidade Estadual de Campinas - Campus Limeira</p>
    </footer>
</body>
</html>
