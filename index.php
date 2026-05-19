<?php
session_start();
$_SESSION["nivel"] = 1;
$_SESSION["intentos"] = 0;
$_SESSION["intentos_incorrectos"] = 0;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Acertijo de Palabras</title>
    <link rel="stylesheet" href="estilos.css">
</head>

<body>

<audio id="inicio">
    <source src="sonidos/letsplay.mp3" type="audio/mpeg">
</audio>

<div class="contenedor">
    <h1>Acertijo de Palabras</h1>

    <p>Adivina la palabra según la imagen.</p>
    <p>¡Completa todos los niveles!</p>
    <p>Si adivinas todas las palabras ganas un bla<p>

    <!-- BOTON CORRECTO -->
    <a href="#" id="btnComenzar" class="boton">Comenzar</a>
</div>

<script>
document.getElementById("btnComenzar").addEventListener("click", function(e) {
    e.preventDefault();

    let audio = document.getElementById("inicio");

    audio.currentTime = 0;
    audio.play().then(() => {

        setTimeout(() => {
            window.location.href = "juego.php";
        }, 3000);

    }).catch(() => {
        window.location.href = "juego.php";
    });
});
</script>

</body>
</html>
