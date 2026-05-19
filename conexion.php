
<?php
$conexion = new mysqli("localhost", "root", "", "escape_room");

if ($conexion->connect_error) {
    die("Error: " . $conexion->connect_error);
}

$conexion->set_charset("utf8");
?>
