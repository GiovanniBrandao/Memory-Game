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

create table partida(
    id_partida int(11) not null auto_increment primary key,
    dimensoes varchar(10) not null,
    modalidade enum('classico', 'tempo') not null,
    tempo_gasto int(11) not null,
    num_jogadas int(11) not null,
    resultado enum('vitoria', 'derrota', 'desistencia') not null,
    data_hora datetime not null,
    cod_jogador int(11) not null,
    constraint fk_cod_jogador
    foreign key (cod_jogador) references jogador (id_jogador)
    on delete cascade
);