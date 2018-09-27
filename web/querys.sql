CREATE DATABASE inter;

USE inter;

CREATE TABLE usuario(
	correo VARCHAR(30) NOT NULL,
    pass VARCHAR(20) NOT NULL,
	nombre VARCHAR(30) NOT NULL,
    apellidop VARCHAR(20) NOT NULL,
    apellidom VARCHAR(20),
    alias VARCHAR(20),
    PRIMARY KEY (correo)
);

INSERT INTO usuario VALUES
("galeomh@hotmail.com", "leo", "Gabriel", "Montoya", "Hernandez", "DeadSpawnZ"),
("brandonshk@gmail.com", "random", "Brandon", "Espinosa", "Resendiz", "Brandonshk07"),
("kev.97@yahoo.com", "kevin", "Kevin", "Gomez", "Gonzales", "KevOut");

CREATE TABLE usuario_n(
	correo VARCHAR(30) NOT NULL,
    PRIMARY KEY (correo)
);

CREATE TABLE grupo(
	codigo VARCHAR(10) NOT NULL,
    id_creador VARCHAR(30) NOT NULL,
    temas VARCHAR(144) NOT NULL, 
    monto_max INT(6) NOT NULL,
    fecha_inter VARCHAR(20) NOT NULL,
    fecha_limite VARCHAR(20) NOT NULL,
    comentarios VARCHAR(144),
    FOREIGN KEY (id_creador) REFERENCES usuario(correo) ON DELETE CASCADE,
    PRIMARY KEY (codigo)
);

CREATE TABLE amistad(
	id_amistad INT NOT NULL AUTO_INCREMENT,
    id_usuario1 VARCHAR(30) NOT NULL,
    id_usuario2 VARCHAR(30) NOT NULL,
    nombre_relativo VARCHAR(30) NOT NULL,
	FOREIGN KEY (id_usuario1) REFERENCES usuario(correo) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario2) REFERENCES usuario(correo) ON DELETE CASCADE,
	PRIMARY KEY (id_amistad)
);

CREATE TABLE intercambio(
	id_intercambio INT NOT NULL AUTO_INCREMENT,
    id_grupo VARCHAR(10) NOT NULL,
    id_usuario1 VARCHAR(30) NOT NULL,
    id_usuario2 VARCHAR(30),
    estado VARCHAR(30) NOT NULL,
	tema varchar(30),
    FOREIGN KEY (id_usuario2) REFERENCES usuario(correo) ON DELETE CASCADE,
    FOREIGN KEY (id_grupo) REFERENCES grupo(codigo) ON DELETE CASCADE,
    PRIMARY KEY (id_intercambio)
);

create table amistad_n (
	 id_amistad_n int(11) not null auto_increment,
	 id_usuario1 varchar(30) not null, 
	 id_usuario2 varchar(30) not null, 
	 nombre_relativo varchar(30) not null, 
	 foreign key (id_usuario1) references usuario(correo) on delete cascade, 
	 foreign key (id_usuario2) references usuario_n(correo) on delete cascade, 
	 primary key(id_amistad_n)
 );