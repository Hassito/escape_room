let tiempo = 30;
const STORAGE_KEY_MUTE = "escape_room_mute";
let correctMode = false; // Previene reactivación del audio de fondo una vez que se respondió correctamente.

// Inicia el temporizador en pantalla. Si se termina el tiempo, vuelve al inicio.
function iniciarTimer() {
    let contador = document.getElementById("timer");

    if (!contador) {
        console.log("No existe el elemento timer");
        return;
    }

    let intervalo = setInterval(function() {
        tiempo--;

        contador.textContent = "Tiempo: " + tiempo;

        if (tiempo <= 0) {
            clearInterval(intervalo);
            alert("⏱️ Se acabó el tiempo, perdiste");

            window.location.href = "index.php";
        }

    }, 1000);
}

function validarFormulario() {
    let respuesta = document.getElementById("respuesta");

    if (!respuesta || respuesta.value.trim() === "") {
        alert("Por favor escribe tu respuesta antes de enviar.");
        return false;
    }

    return true;
}

function guardarMute(mute) {
    try {
        localStorage.setItem(STORAGE_KEY_MUTE, mute ? "1" : "0");
    } catch (e) {
        console.log("No se pudo guardar el estado de mute.", e);
    }
}

function leerMute() {
    try {
        return localStorage.getItem(STORAGE_KEY_MUTE) === "1";
    } catch (e) {
        return false;
    }
}

function alternarMute() {
    let audio = document.getElementById("musica");
    let botonMute = document.getElementById("mute-btn");

    if (!audio || !botonMute) {
        console.log("Mute no inicializado: audio o boton no encontrado.");
        return;
    }

    audio.muted = !audio.muted;
    actualizarTextoMute();
    guardarMute(audio.muted);

    if (!audio.muted) {
        reproducirAudio(audio);
    }
}

function actualizarTextoMute() {
    let audio = document.getElementById("musica");
    let botonMute = document.getElementById("mute-btn");

    if (!audio || !botonMute) {
        return;
    }

    botonMute.textContent = audio.muted ? "🔇 Activar sonido" : "🔊 Silenciar";
}

function iniciarAudioFondo() {
    let audio = document.getElementById("musica");
    if (!audio) {
        return;
    }
    // Set looping according to current game state (acertado => no loop)
    audio.loop = !window.acertado;
    if (window.acertado) {
        audio.removeAttribute("loop");
    } else {
        audio.setAttribute("loop", "");
    }

    audio.muted = leerMute();
    actualizarTextoMute();

    // Intenta iniciar el audio de fondo si el navegador lo permite.
    reproducirAudio(audio);
}

function reproducirAudio(audio) {
    if (!audio) {
        return;
    }

    let promesa = audio.play();
    if (promesa !== undefined) {
        promesa.catch(() => {
            // Si el navegador bloquea el autoplay, intenta reproducir de nuevo al primer click del usuario.
            let autorizarAudio = function() {
                audio.play().catch(() => {});
                document.removeEventListener("click", autorizarAudio);
            };
            document.addEventListener("click", autorizarAudio, { once: true });
        });
    }
}

function reproducirCorrecto() {
    let audioFondo = document.getElementById("musica");
    let audioCorrecto = document.getElementById("sound-correct");

    correctMode = true;
    window.acertado = true;

    if (audioFondo) {
        audioFondo.loop = false;
        audioFondo.removeAttribute("loop");
        audioFondo.pause();
        audioFondo.currentTime = 0;
    }

    if (!audioCorrecto) {
        return;
    }

    audioCorrecto.muted = audioFondo ? audioFondo.muted : false;
    audioCorrecto.currentTime = 0;

    let onTimeUpdate = function() {
        if (audioCorrecto.currentTime >= 6.9) {
            audioCorrecto.pause();
            audioCorrecto.currentTime = 0;
            audioCorrecto.removeEventListener("timeupdate", onTimeUpdate);
        }
    };

    audioCorrecto.removeEventListener("timeupdate", onTimeUpdate);
    audioCorrecto.addEventListener("timeupdate", onTimeUpdate);
    reproducirAudio(audioCorrecto);
}

function manejarAcertado() {
    let audio = document.getElementById("musica");

    if (!audio) {
        return;
    }

    audio.loop = false;
    audio.removeAttribute("loop");
    audio.pause();
    audio.currentTime = 0;
    reproducirCorrecto();
}

function habilitarEnvioAjax() {
    let formulario = document.getElementById("form-respuesta");
    if (!formulario) {
        return;
    }

    formulario.addEventListener("submit", enviarRespuestaAjax);
}

function desbloquearAudio() {
    let audioFondo = document.getElementById("musica");
    let audioCorrecto = document.getElementById("sound-correct");

    if (audioFondo) {
        audioFondo.play().then(() => {
            audioFondo.pause();
        }).catch(() => {});
    }

    if (audioCorrecto) {
        let estabaMuteado = audioCorrecto.muted;
        audioCorrecto.muted = true;
        audioCorrecto.play().then(() => {
            audioCorrecto.pause();
            audioCorrecto.currentTime = 0;
            audioCorrecto.muted = estabaMuteado;
        }).catch(() => {
            audioCorrecto.muted = estabaMuteado;
        });
    }
}

async function enviarRespuestaAjax(event) {
    event.preventDefault();
    desbloquearAudio();

    if (!validarFormulario()) {
        return;
    }

    let formulario = event.currentTarget;
    let datos = new FormData(formulario);
    datos.append("_ajax", "1");

    try {
        let respuesta = await fetch("juego.php", {
            method: "POST",
            headers: {
                "X-Requested-With": "XMLHttpRequest",
                "Accept": "application/json"
            },
            body: datos
        });

        if (!respuesta.ok) {
            console.error("Error en la petición AJAX", respuesta.status);
            return;
        }

        let datosJson = await respuesta.json();
        actualizarUI(datosJson);
    } catch (error) {
        console.error("Error enviando la respuesta", error);
    }
}

function actualizarUI(data) {
    let mensajeEl = document.getElementById("mensaje");
    let pistaEl = document.getElementById("pista-extra");
    let respuestaCorrectaEl = document.getElementById("respuesta-correcta");
    let formContainer = document.getElementById("form-container");
    let imagen = document.getElementById("juego-imagen");

    if (mensajeEl) {
        mensajeEl.textContent = data.mensaje || "";
    }

    if (pistaEl) {
        if (data.mostrar_pista) {
            pistaEl.textContent = "💡 Pista: " + data.pista_extra;
            pistaEl.style.display = "block";
        } else {
            pistaEl.textContent = "";
            pistaEl.style.display = "none";
        }
    }

    if (respuestaCorrectaEl) {
        if (data.acertado) {
            respuestaCorrectaEl.textContent = data.respuesta_mostrar || "";
            respuestaCorrectaEl.style.display = "block";
        } else {
            respuestaCorrectaEl.textContent = "";
            respuestaCorrectaEl.style.display = "none";
        }
    }

    if (imagen && data.imagen_src) {
        imagen.src = data.imagen_src;
        imagen.alt = data.imagen_alt || "acertijo";
    }

    let estadoJuego = document.getElementById("estado-juego");
    if (estadoJuego) {
        estadoJuego.textContent = data.acertado ? "✅ ¡Adivinaste correctamente!" : "🧠 Adivina la palabra";
    }

    window.acertado = data.acertado;

    if (formContainer) {
        if (data.acertado) {
            formContainer.innerHTML =
                "<form method=\"POST\">"
                + "<input type=\"hidden\" name=\"siguiente\" value=\"1\">"
                + "<button type=\"submit\">Siguiente</button>"
                + "</form>";
        } else {
            formContainer.innerHTML =
                "<form id=\"form-respuesta\" method=\"POST\" autocomplete=\"off\">"
                + "<input type=\"text\" name=\"respuesta\" id=\"respuesta\" placeholder=\"Escribe tu respuesta\" autocomplete=\"off\" autocorrect=\"off\" autocapitalize=\"off\" spellcheck=\"false\">"
                + "<br><br>"
                + "<button type=\"submit\">Enviar</button>"
                + "</form>";
            habilitarEnvioAjax();
        }
    }

    if (data.acertado) {
        manejarAcertado();
    }
}

window.alternarMute = alternarMute;

iniciarTimer();
function inicializarAudio() {
    iniciarAudioFondo();

    let botonMute = document.getElementById("mute-btn");
    if (botonMute) {
        botonMute.addEventListener("click", alternarMute);
    } else {
        console.log("No se encontró el botón de mute.");
    }

    habilitarEnvioAjax();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inicializarAudio);
} else {
    inicializarAudio();
}

document.addEventListener("click", function() {
    let audio = document.getElementById("musica");

    if (!audio) {
        return;
    }

    if (!audio.muted && audio.paused && !window.acertado && !correctMode) {
        reproducirAudio(audio);
    }
});

