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
        <link rel="stylesheet" href="../CSS/game.css">
        <title>Jogo da memória</title>
    </head>
    <body>
        <?php include "navbar.php"; ?>
        
        <div id="res-modal" >
            <div id="res-modal-content">
                <p id="res-modal-text">default</p>
                <form action="../back/jogo.php" method="POST">
                    <input type="text" name="dimensoes" id="res_dimensoes" style="display:none">
                    <input type="text" name="modalidade" id="res_modalidade" style="display:none">
                    <input type="text" name="tempo_gasto" id="res_tempo_gasto" style="display:none">
                    <input type="text" name="num_jogadas" id="res_num_jogadas" style="display:none">
                    <input type="text" name="resultado" id="res_resultado" style="display:none">
                    <input type="text" name="data_hora" id="res_data_hora" style="display:none">
                    <button type="submit" class="botao-principal entrar-button" id="res-submit">Finalizar</button>
                </form>
            </div>
        </div>

        <main class="container">
            <section class="cabecalho">
                <h2 id="cronometro">Tempo: 00:00</h2> 
                <h2 id="jogadas">Jogadas: 0</h2>
                <button class="botao-principal" id="botao-abrir-configuracoes">Configurações</button>
                <button class="botao-principal" id="botao-trapaca">Exibir peças ocultas: OFF</button>
                <button class="botao-principal" id="botao-iniciar-desistir">Iniciar jogo</button>
            </section>

            <div class="centralizar">
                <div class="tabuleiro"></div>
            </div>


            <dialog id="modal">
                <section class="modal-conteudo">
                    <div>
                        <span class="botao-fechar" id="botao-fechar">&times;</span>
                        <h2>Configurações</h2>
                    </div>
                    
                    <dl id="modo-jogo-container">
                        <dt>Modo de Jogo:</dt>
                        <dd>
                            <button class="botao-navegacao" data-action="anterior" data-target="jogo">&lt;</button>
                            <span id="modo-jogo-valor"></span>
                            <button class="botao-navegacao" data-action="proximo" data-target="jogo">&gt;</button>
                        </dd>
                    </dl>

                    <dl id="tabuleiro-container">
                        <dt>Tabuleiro:</dt>
                        <dd>
                            <button class="botao-navegacao" data-action="anterior" data-target="tabuleiro">&lt;</button>
                            <span id="tabuleiro-valor"></span>
                            <button class="botao-navegacao" data-action="proximo" data-target="tabuleiro">&gt;</button>
                        </dd>
                    </dl>

                    <button class="botao-principal" id="habilitar-trapaca">Modo trapaça: OFF</button>
                </section>
            </dialog>
    </main>

    <footer>
        <p>© 2025 Universidade Estadual de Campinas - Campus Limeira</p>
    </footer>

        <script src="../JS/jogo/modal.js"></script>
        <script src="../JS/jogo/jogo.js"></script> 
        <script src="../JS/jogo/modal-acoes.js"></script> 
        <script src="../JS/jogo/cronometro.js"></script> 
        <script src="../JS/jogo/tabuleiro.js"></script>
    </body>
</html>