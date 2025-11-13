<header>
    <nav aria-label="Navegação principal">
        <ul>
            <li><a href="jogo.php">Jogo</a></li>
            <li><a href="../back/historico.php">Histórico</a></li>
            <li><a href="../back/ranque.php">Ranque global</a></li>
            <?php 
                session_start();
                echo "
                <li><a href='perfil.php'>Perfil da {$_SESSION['nome']}</a></li>
                ";
            ?>
            <li class="align-right">
                <form action="../back/sair.php">
                    <button type="submit" class="botao-principal entrar-button"><a>Sair</a></button>
                </form>
            </li>
        </ul>
    </nav>
</header>