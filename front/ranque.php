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
    <link rel="icon" type="image/png" href="../Resources/Images/videogame.svg">
    <link rel="stylesheet" href="../CSS/main.css">
    <link rel="stylesheet" href="../CSS/helpers.css">
    <link rel="stylesheet" href="../CSS/navbar.css">
    <link rel="stylesheet" href="../CSS/rank.css">
    <title>Ranque Global</title>
</head>
<body>
    
    <?php include "navbar.php"; ?>

    <main class="centralizar" style="flex-direction: column;"> 

        <div id="botoes-ranking" class="botoes-ranking">
            <button class="botao-principal" data-tamanho="2x2">2x2</button>
            <button class="botao-principal" data-tamanho="4x4">4x4</button>
            <button class="botao-principal" data-tamanho="6x6">6x6</button>
            <button class="botao-principal" data-tamanho="8x8">8x8</button>
        </div>

        <section class="tabela-ranking">
            <h2 id="ranking-titulo">Ranking 2x2</h2>
            <table>
                <thead>
                    <tr>
                        <th>Posição</th>
                        <th>Username</th>
                        <th>Número de jogadas</th>
                        <th>Tempo (s)</th>
                    </tr>
                </thead>
                <tbody>
                    <?php 
                        session_start();
                        
                        for ($i=0;$i <10; $i++) { 
                            if(isset($_SESSION['ranques'][$i])) {
                                $row = $_SESSION['ranques'][$i];
                                $pos = $i +1;
                                echo "
                                <tr>
                                    <td>$pos</td>
                                    <td>{$row['username']}</td>
                                    <td>{$row['num_jogadas']}</td>
                                    <td>{$row['tempo_gasto']}</td>
                                </tr";
                            }
                        }
                    ?>
                </tbody>
            </table>
        </section>

    </main>

    <footer>
        <p>© 2025 Universidade Estadual de Campinas - Campus Limeira</p>
    </footer>

    <script src="../JS/ranque.js"></script>
</body>
</html>