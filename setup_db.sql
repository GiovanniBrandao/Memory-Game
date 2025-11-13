create database if not exists Memoria;

use Memoria;

create table jogador (
    id_jogador int(11) not null auto_increment primary key,
    nome varchar(255) not null,
    data_nasc date default null, 
    cpf varchar(14) unique default null, 
    telefone varchar(20) default null,
    email varchar(100) unique not null,
    username varchar(50) unique not null,
    senha varchar(255) not null,
    data_cadastro timestamp default current_timestamp null 
);

CREATE TABLE partida (
    id_partida INT(11) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    dimensoes ENUM('2 x 2', '4 x 4', '6 x 6', '8 x 8') NOT NULL,
    modalidade ENUM('Normal', 'Contra o Tempo') NOT NULL, 
    tempo_gasto INT(11) NOT NULL,
    num_jogadas INT(11) NOT NULL,
    resultado ENUM('Vitória', 'Derrota', 'Desistência') NOT NULL,
    data_hora DATETIME NOT NULL,
    cod_jogador INT(11) NOT NULL,
    CONSTRAINT fk_cod_jogador
    FOREIGN KEY (cod_jogador) REFERENCES jogador (id_jogador)
    ON DELETE CASCADE
);