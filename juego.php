<?php
// Variables de estado del juego
$imagen_exito = "";
$mostrar_boton = false;
$respuesta_mostrar = "";
$acertado = false;
$mensaje = "";
$mostrar_pista = false;

// Iniciar sesión y conectar a la base de datos
session_start();
include("conexion.php");

$is_ajax = isset($_POST["_ajax"]) || (isset($_SERVER["HTTP_X_REQUESTED_WITH"]) && $_SERVER["HTTP_X_REQUESTED_WITH"] === "XMLHttpRequest");

if (!isset($_SESSION["nivel"])) {
    $_SESSION["nivel"] = 1;
}

if (!isset($_SESSION["intentos"])) {
    $_SESSION["intentos"] = 0;
}

if (!isset($_SESSION["intentos_incorrectos"])) {
    $_SESSION["intentos_incorrectos"] = 0;
}

$nivel = $_SESSION["nivel"];
$mensaje = "";



// 🔹 Obtener nivel actual
$sql = "SELECT * FROM pistas WHERE orden = $nivel";
$resultado = $conexion->query($sql);

if ($resultado->num_rows == 0) {
    header("Location: final.php");
    exit();
}

$pista = $resultado->fetch_assoc();

// 🔹 Función normalizar
// Convierte el texto a mayúsculas, elimina espacios y reemplaza acentos.
// Esto permite comparar respuestas sin diferencias de formato.
function normalizar($texto) {
    $texto = strtoupper($texto);
    $texto = trim($texto);
    $texto = str_replace(' ', '', $texto);

    $texto = str_replace(
        ['Á','É','Í','Ó','Ú','Ñ'],
        ['A','E','I','O','U','N'],
        $texto
    );

    return $texto;
}

function obtenerPistaDeAudio($nivel) {
    if ($nivel === 10) {
        return "sonidos/final.mp3";
    }

    $pista = ((($nivel - 1) % 4) + 1);
    return "sonidos/suspense" . $pista . ".mp3";
}

$audio_src = obtenerPistaDeAudio($nivel);

if (isset($_POST["siguiente"])) {
    $_SESSION["nivel"]++;
    header("Location: juego.php");
    exit();
}

// 🔹 Validar respuesta

if ($_SERVER["REQUEST_METHOD"] == "POST" && !isset($_POST["siguiente"])) {
    if (isset($_POST["respuesta"])) {
        $_SESSION["intentos"]++;
        $respuesta_usuario = normalizar($_POST["respuesta"]);
        $respuesta_correcta = normalizar($pista["respuesta"]);

        if ($respuesta_usuario == $respuesta_correcta) {
            $acertado = true;
            $respuesta_mostrar = $pista["respuesta"];
            $mostrar_boton = true;
        } else {
            $_SESSION["intentos_incorrectos"]++;
            $mensaje = "Incorrecto";
            $mostrar_pista = true; // Mostrar pista extra tras respuesta incorrecta.
        }
    }
}

$imagen_src = $acertado ? $pista["imagen_acertada"] : ($imagen_exito !== "" ? $imagen_exito : $pista["imagen"]);
$imagen_alt = $acertado ? "correcto" : ($imagen_exito !== "" ? "correcto" : "acertijo");

if ($is_ajax && $_SERVER["REQUEST_METHOD"] === "POST" && !isset($_POST["siguiente"])) {
    header("Content-Type: application/json");
    echo json_encode([
        "acertado" => $acertado,
        "mensaje" => $mensaje,
        "mostrar_pista" => $mostrar_pista,
        "pista_extra" => $pista["pista_extra"],
        "respuesta_mostrar" => $respuesta_mostrar,
        "imagen_src" => $imagen_src,
        "imagen_alt" => $imagen_alt,
    ]);
    exit;
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Juego</title>
    <link rel="stylesheet" href="estilos.css">
</head>
<body>

    <audio id="musica" loop muted preload="auto" src="<?php echo $audio_src; ?>"></audio>
    <audio id="sound-correct" preload="auto" src="sonidos/correct.mp3"></audio>
    <button id="mute-btn" class="boton-mute" type="button">🔇 Activar sonido</button>

    <div class="contenedor">
    <h1>Nivel <?php echo $nivel; ?></h1>

    <h2 id="estado-juego">
    <?php if ($acertado): ?>
        ¡Adivinaste correctamente!
    <?php else: ?>
        Adivina la palabra
    <?php endif; ?>
    </h2>
    <p id="mensaje"><?php echo $mensaje; ?></p>
    <?php if ($mostrar_pista): ?>
        <p id="pista-extra" class="pista-extra">
            Pista: <?php echo $pista["pista_extra"]; ?>
        </p>
    <?php else: ?>
        <p id="pista-extra" class="pista-extra" style="display:none;"></p>
    <?php endif; ?>

    <p id="respuesta-correcta" class="respuesta-correcta" style="<?php echo $acertado ? '' : 'display:none;'; ?>">
        <?php echo $respuesta_mostrar; ?>
    </p>

<div class="imagen-juego">

<?php if ($acertado): ?>
    <img id="juego-imagen" src="<?php echo $pista['imagen_acertada']; ?>" alt="correcto">
<?php else: ?>
    <img id="juego-imagen" src="<?php echo $pista['imagen']; ?>" alt="acertijo">
<?php endif; ?>

</div>

<div id="form-container">
<?php if ($acertado): ?>
    <form method="POST">
        <input type="hidden" name="siguiente" value="1">
        <button type="submit">Siguiente Nivel</button>
    </form>
<?php else: ?>
    <form id="form-respuesta" method="POST" autocomplete="off">
        <input type="text" name="respuesta" id="respuesta" placeholder="Escribe tu respuesta" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
        <br><br>
        <button type="submit">Enviar</button>
    </form>
<?php endif; ?>
</div>

<script>
window.acertado = <?php echo $acertado ? 'true' : 'false'; ?>;
</script>

<script src="script.js"></script>
</body>
    </html>
