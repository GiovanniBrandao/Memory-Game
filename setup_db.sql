create database if not exists Memoria;
use Memoria;

create table jogador (
id_jogador int auto_increment primary key not null,
nome varchar(255) not null,
data_nasc date not null,
cpf varchar(14) unique not null,
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

insert into jogador (id_jogador, nome, data_nasc, cpf, telefone, email, username, senha) values
(1, "joao", "2000-06-27", "592.493.287-47", "40 98277-2011", "joao@gmail.com", "jjgames", "senha1"),
(2, "maria", "2003-06-20", "948.493.287-47", "40 74839-2011", "maria@gmail.com", "mzika", "senha2");

insert into partida (cod_jogador, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora) values
(1, "8x8","Classico",200,24,"vitoria","2025-09-16T11:00:00"),
(2, "8x8","Classico", 200, 10, "vitoria", "2025-09-15T21:30:00"),
(2, "8x8","Tempo",260,45,"derrota","2025-09-15T18:11:00"),
(2, "8x8","Tempo",100, 71,"vitoria","2025-09-14T13:20:00");

insert into partida (cod_jogador, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora) values
(1, "2x2","Classico",50,24,"vitoria","2025-09-16T11:00:10"),
(2, "2x2","Classico", 51, 10, "derrota", "2025-09-15T20:30:01"),
(2, "2x2","Tempo",60,15,"vitoria","2025-09-15T18:15:02"),
(2, "2x2","Tempo",100, 21,"vitoria","2025-09-14T13:40:03");
(2, "2x2","Tempo",63,11,"vitoria","2025-09-15T18:15:06"),
(2, "2x2","Tempo",103, 26,"vitoria","2025-09-14T13:00:03");

insert into partida (cod_jogador, dimensoes, modalidade, tempo_gasto, num_jogadas, resultado, data_hora) values
(1, "6x6","Classico",50,20,"desistencia","2025-09-16T11:01:10"),
(1, "6x6","Tempo",150,24,"derrota","2025-09-15T11:00:10"); 