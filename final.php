<?php
session_start();
$intentos = isset($_SESSION["intentos"]) ? $_SESSION["intentos"] : 0;
$intentos_incorrectos = isset($_SESSION["intentos_incorrectos"]) ? $_SESSION["intentos_incorrectos"] : 0;
session_destroy();
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Juego Completado</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

<div class="contenedor">
    <h1>🎉 ¡Adivinaste todos los acertijos!</h1>

    <p>Felicidades</p>
    <p>Intentos totales: <?php echo $intentos; ?></p>
    <p>Respuestas incorrectas: <?php echo $intentos_incorrectos; ?></p>
    <p>Excelente trabajo completando el juego</p>
    <p>bla</p>

    <a href="index.php" class="boton">🔄 Jugar de nuevo</a>
</div>

</body>
</html>
