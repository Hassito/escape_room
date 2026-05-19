CREATE DATABASE IF NOT EXISTS escape_room;
USE escape_room;

CREATE TABLE IF NOT EXISTS pistas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta TEXT NOT NULL,
    respuesta VARCHAR(100) NOT NULL,
    mensaje_exito TEXT NOT NULL,
    imagen VARCHAR(255) NOT NULL,
    imagen_acertada VARCHAR(255) NOT NULL,
    pista_extra TEXT,
    orden INT NOT NULL
);

INSERT INTO pistas (pregunta, respuesta, mensaje_exito, imagen, imagen_acertada, pista_extra, orden)
VALUES
('Soy la estructura principal de una página web. Sin mí, no hay etiquetas ni contenido ordenado.', 'HTML', 'Correcto. Has desbloqueado la estructura base del servidor.', 'img/nivel1.jpeg', 'img/acertado1.jpeg', 'Piensa en el lenguaje que construye la página.', 1),
('Soy el lenguaje que da color, forma y estilo a una página web.', 'CSS', 'Correcto. Estás dando estilo al servidor.', 'img/nivel2.jpeg', 'img/acertado2.jpeg', 'No es HTML ni JavaScript.', 2),
('Trabajo del lado del cliente y puedo validar formularios, mostrar alertas o cambiar elementos de la página.', 'JAVASCRIPT', 'Correcto. El cliente responde al servidor.', 'img/nivel3.jpeg', 'img/acertado3.jpeg', 'Piensa en el lenguaje de interacción.', 3),
('Vivo en el servidor, proceso formularios y puedo conectarme a una base de datos.', 'PHP', 'Correcto. Has recuperado el acceso al servidor.', 'img/nivel4.jpeg', 'img/acertado4.jpeg', 'Es el lenguaje usado en el backend de este juego.', 4);
