# Escape Room - Juego de Adivinanzas

Este proyecto es un juego web de adivinanzas en PHP. Los jugadores avanzan por niveles adivinando palabras basadas en imágenes y pistas.

## Estructura del proyecto

- `index.php` - Página inicial con botón para comenzar el juego y sonido de bienvenida.
- `juego.php` - Lógica principal del juego: carga el nivel actual desde la base de datos, valida la respuesta y muestra el siguiente nivel.
- `final.php` - Página de fin de juego cuando no quedan más niveles.
- `conexion.php` - Conexión a la base de datos MySQL.
- `script.js` - Lógica de cliente para el temporizador, validación de formulario y control de audio.
- `estilos.css` - Estilos visuales de la página.
- `sonidos/` - Carpeta con archivos MP3 usados para música y efectos.
- `img/` - Carpeta con imágenes de los niveles.

## Cómo funciona

1. `index.php` inicia la sesión y establece `$_SESSION["nivel"] = 1`.
2. Al entrar a `juego.php`, se lee el nivel actual desde `$_SESSION["nivel"]`.
3. `juego.php` consulta la tabla `pistas` en la base de datos para cargar los datos del nivel:
   - `orden` - número de nivel
   - `respuesta` - palabra correcta
   - `imagen` - imagen del acertijo
   - `imagen_acertada` - imagen que se muestra al acertar
   - `pista_extra` - pista adicional si la respuesta es incorrecta
4. El formulario de respuesta se envía usando AJAX para evitar recargas de página.
5. `juego.php` normaliza la respuesta y la compara con la correcta; la interfaz se actualiza dinámicamente con el resultado.
6. Si acierta, se muestra la imagen de acierto y un botón para pasar al siguiente nivel.
7. Si el nivel no existe, se redirige a `final.php`.

## Detalles importantes

- La normalización elimina espacios y tildes para comparar respuestas sin distinción de mayúsculas/minúsculas.
- El botón de sonido controla el audio y se puede silenciar. El estado se guarda en `localStorage` para mantenerse entre recargas.
- El formulario de respuesta tiene `autocomplete="off"` para que el navegador no guarde respuestas anteriores.
- El juego utiliza sonidos distintos según el nivel:
  - `sonidos/correct.mp3` se reproduce cuando el jugador acierta.
  - `sonidos/suspense1.mp3` a `sonidos/suspense4.mp3` se usan como música de fondo para niveles 1-9.
  - niveles 1-4 usan `suspense1` a `suspense4`
  - niveles 5-9 repiten el ciclo: 5->suspense1, 6->suspense2, 7->suspense3, 8->suspense4, 9->suspense1
  - nivel 10 usa `final.mp3`

## Requisitos y ejecución

- PHP 7.4+ con soporte para sesiones.
- Un servidor local como XAMPP/LAMPP con MySQL.
- Base de datos con tabla `pistas` y columnas mínimas `orden`, `respuesta`, `imagen`, `imagen_acertada`, `pista_extra`.

Para ejecutar el juego, coloca el proyecto bajo el directorio de tu servidor web y abre `index.php` en el navegador.

## Para colaborar

- Añade niveles nuevos en la tabla `pistas` con la columna `orden` consecutiva.
- Agrega nuevos archivos de imagen en `img/` y referencia su ruta en la base de datos.
- Si agregas nuevos sonidos, ponlos en `sonidos/` y referencia su nombre en el código.

## Sugerencias de mejora

- Registrar los intentos del jugador en la base de datos.
- Mostrar un historial de respuestas por nivel.
- Agregar un sistema de puntuación y tiempo.
- Hacer responsiva la interfaz para móviles.
