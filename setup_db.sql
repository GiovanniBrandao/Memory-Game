create database if not exists Memoria;
use Memoria;

create table jogador (
id_jogador int auto_increment primary key not null,
nome varchar(255) not null,
data_nasc date, 
cpf varchar(14) unique, 
telefone varchar(20),
email varchar(100) unique not null,
username varchar(50) unique not null,
senha varchar(255) not null,
data_cadastro timestamp default CURRENT_TIMESTAMP
);

create table partida(
id_partida int auto_increment primary key,
dimensoes varchar(10) not null,
modalidade enum('classico', 'tempo') not null,
tempo_gasto int not null,
num_jogadas int not null,
resultado enum('vitoria', 'derrota', 'desistencia') not null,
data_hora datetime not null,

cod_jogador int not null,
constraint `cod_jogador`
foreign key (cod_jogador) references jogador (id_jogador)
on delete cascade
);