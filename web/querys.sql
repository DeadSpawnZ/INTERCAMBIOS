CREATE DATABASE inter;

USE inter;

CREATE TABLE usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT,
	correo VARCHAR(30) NOT NULL,
    pass VARCHAR(20) NOT NULL,
	nombre VARCHAR(30) NOT NULL,
    apellidop VARCHAR(20) NOT NULL,
    apellidom VARCHAR(20),
    alias VARCHAR(20),
    PRIMARY KEY (id_usuario)
);

CREATE TABLE usuario_n(
	id_usuario_n INT NOT NULL AUTO_INCREMENT,
	correo VARCHAR(30) NOT NULL,
    PRIMARY KEY (id_usuario_n)
);

CREATE TABLE amistad(
	id_amistad INT NOT NULL AUTO_INCREMENT,
    id_usuario1 INT NOT NULL,
    id_usuario2 INT NOT NULL,
    nombre_relativo VARCHAR(30) NOT NULL,
	FOREIGN KEY (id_usuario1) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario2) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
	PRIMARY KEY (id_amistad)
);

CREATE TABLE grupo(
	id_grupo INT NOT NULL AUTO_INCREMENT,
    id_creador INT NOT NULL,
    tema_inter VARCHAR(144) NOT NULL, 
    monto_max INT(6) NOT NULL,
    fecha_inter VARCHAR(20) NOT NULL,
    fecha_limite VARCHAR(20) NOT NULL,
    comentarios VARCHAR(144),
    PRIMARY KEY (id_grupo)
);

CREATE TABLE intercambio(
	id_intercambio INT NOT NULL AUTO_INCREMENT,
    id_usuario1 INT NOT NULL,
    id_usuario2 INT,
    estado VARCHAR(30) NOT NULL,
    FOREIGN KEY (id_usuario1) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (id_usuario2) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    PRIMARY KEY (id_intercambio)
);

SELECT * FROM usuario;