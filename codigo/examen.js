const SEGUNDOS_POR_PREGUNTA = 30;
const BUENAS_POR_RACHA = 3;
const LETRAS = ["A", "B", "C", "D"];

// estrellas: una por respuesta correcta (máximo 20)
// rachas: se gana una cada 3 buenas seguidas y no se pierde al fallar
let actual = 0, estrellas = 0, rachas = 0, seguidas = 0;
let respondida = false, reloj = null, restante = 0;
let fallos = [];

const $ = id => document.getElementById(id);
const sinMovimiento = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

// Título con letras que rebotan
$("letrero").innerHTML = ["Regímenes", "tributarios"].map((palabra, fila) =>
  `<span class="linea" aria-hidden="true">${[...palabra].map((letra, i) =>
    `<span style="animation-delay:${(fila * 9 + i) * 0.045}s">${letra}</span>`).join("")}</span>`).join("");

function mostrarPantalla(id) {
  document.querySelectorAll(".pantalla").forEach(p => p.classList.toggle("activa", p.id === id));
  scrollTo(0, 0);
}

function pintarMarcador(animar) {
  $("estrellas").textContent = `⭐ ${estrellas}/${PREGUNTAS.length}`;
  $("rachas").innerHTML = `🔥 ${rachas} <span class="puntitos">${"●".repeat(seguidas)}${"○".repeat(BUENAS_POR_RACHA - seguidas)}</span>`;
  if (animar) ["estrellas", "rachas"].forEach(id => { const c = $(id); c.classList.remove("salta"); void c.offsetWidth; c.classList.add("salta"); });
}

function empezar() {
  actual = estrellas = rachas = seguidas = 0;
  fallos = [];
  pintarMarcador(false);
  Sonido.musica();
  mostrarPantalla("juego");
  mostrarPregunta();
}

function mostrarPregunta() {
  const p = PREGUNTAS[actual];
  respondida = false;
  Sonido.bajarMusica(false);
  $("zona").innerHTML = `
    <div class="cabeza">
      <span class="numero">Pregunta <b>${actual + 1}</b> de ${PREGUNTAS.length}</span>
      <div class="reloj" id="reloj"><div style="animation-duration:${SEGUNDOS_POR_PREGUNTA}s"></div></div>
      <span class="segundos" id="segundos">${SEGUNDOS_POR_PREGUNTA}s</span>
    </div>
    <div class="tarjeta-pregunta">
      <div class="dibujo"><img src="${p.imagen}" alt="${p.descripcion}" onerror="this.replaceWith('${p.dibujo}')"></div>
      <div><span class="tema">${p.tema}</span><p class="texto">${p.texto}</p></div>
    </div>
    <div class="alternativas">
      ${p.alternativas.map((a, i) => `
        <button class="alt" data-i="${i}">
          <span class="letra">${LETRAS[i]}</span><span>${a}</span><span class="icono" aria-hidden="true"></span>
        </button>`).join("")}
    </div>
    <div id="resultado" aria-live="polite"></div>`;
  document.querySelectorAll(".alt").forEach(b => b.addEventListener("click", () => responder(+b.dataset.i)));

  restante = SEGUNDOS_POR_PREGUNTA;
  clearInterval(reloj);
  reloj = setInterval(() => {
    restante--;
    $("segundos").textContent = restante + "s";
    if (restante <= 10) $("reloj").classList.add("apurado");
    if (restante <= 0) responder(-1);
    else if (restante <= 10) Sonido.tic(restante <= 5);
  }, 1000);
}

function lanzarChispas(cantidad) {
  if (sinMovimiento()) return;
  const colores = ["#f2c230", "#1e9e4a", "#1f5fd1", "#ffffff", "#d62839"];
  for (let i = 0; i < cantidad; i++) {
    const c = document.createElement("div");
    c.className = "chispa";
    c.style.left = Math.random() * 100 + "vw";
    c.style.background = colores[i % colores.length];
    c.style.animationDelay = Math.random() * 0.5 + "s";
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2300);
  }
}

function avisoRacha() {
  const aviso = document.createElement("div");
  aviso.className = "aviso-racha";
  aviso.innerHTML = `🔥 ¡Racha! ${BUENAS_POR_RACHA} buenas seguidas`;
  document.body.appendChild(aviso);
  setTimeout(() => aviso.remove(), 2200);
}

// i = -1 cuando se acaba el tiempo
function responder(i) {
  if (respondida) return;
  respondida = true;
  clearInterval(reloj);
  $("reloj").querySelector("div").style.animationPlayState = "paused";

  const p = PREGUNTAS[actual];
  const botones = document.querySelectorAll(".alt");
  const acerto = i === p.correcta;

  botones.forEach((b, k) => {
    b.disabled = true;
    if (k === p.correcta) { b.classList.add("correcta"); b.querySelector(".icono").textContent = "✔"; }
    else if (k === i) { b.classList.add("incorrecta"); b.querySelector(".icono").textContent = "✘"; }
    else b.classList.add("apagada");
  });

  let html;
  if (acerto) {
    estrellas++; seguidas++;
    Sonido.acierto();
    if (seguidas === BUENAS_POR_RACHA) { rachas++; seguidas = 0; avisoRacha(); Sonido.racha(); }
    lanzarChispas(50);
    html = `<div class="explicacion bien"><span class="cara">⭐</span>
      <div><span class="titulo">¡Correcto! +1 estrella</span>${p.porque}</div>
      <button class="boton-principal" id="seguir">${textoSeguir()}</button></div>`;
  } else {
    seguidas = 0;
    fallos.push(p);
    if (i === -1) Sonido.tiempoAcabado(); else Sonido.fallo();
    const inicio = i === -1 ? "Se acabó el tiempo." : "Incorrecto.";
    html = `<div class="explicacion mal"><span class="cara">💡</span>
      <div><span class="titulo">${inicio} Era «${p.alternativas[p.correcta]}»</span><b>¿Por qué?</b> ${p.porque}</div>
      <button class="boton-principal" id="seguir">${textoSeguir()}</button></div>`;
  }
  pintarMarcador(true);
  Sonido.bajarMusica(true);
  $("resultado").innerHTML = html;
  $("seguir").addEventListener("click", siguiente);
  $("seguir").focus({ preventScroll: true });
  $("resultado").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function textoSeguir() {
  return actual + 1 < PREGUNTAS.length ? "Siguiente pregunta" : "Ver mis resultados";
}

function siguiente() {
  actual++;
  if (actual < PREGUNTAS.length) mostrarPregunta();
  else mostrarFinal();
}

// Sube un número de 0 al valor final
function contar(elemento, hasta, duracion, alTerminar) {
  if (sinMovimiento() || hasta === 0) { elemento.textContent = hasta; if (alTerminar) alTerminar(); return; }
  const inicio = performance.now();
  (function paso(ahora) {
    const t = Math.min(1, (ahora - inicio) / duracion);
    elemento.textContent = Math.round(hasta * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(paso); else if (alTerminar) alTerminar();
  })(inicio);
}

// Escribe la frase letra por letra
function escribir(elemento, texto) {
  if (sinMovimiento()) { elemento.textContent = texto; return; }
  let n = 0;
  const t = setInterval(() => { elemento.textContent = texto.slice(0, ++n); if (n >= texto.length) clearInterval(t); }, 28);
}

function fraseFinal(nota) {
  const resumen = `Lograste ${estrellas} de ${PREGUNTAS.length} estrellas y ${rachas} ${rachas === 1 ? "racha" : "rachas"}.`;
  if (nota === 20) return `${resumen} ¡Perfecto! Eres un experto en regímenes tributarios.`;
  if (nota >= 18) return `${resumen} ¡Excelente! Dominas los regímenes tributarios.`;
  if (nota >= 14) return `${resumen} ¡Muy bien! Repasa las que fallaste y llegarás a 20.`;
  if (nota >= 11) return `${resumen} Aprobaste. Lee las explicaciones de abajo para mejorar.`;
  return `${resumen} Todavía no apruebas. Repasa las explicaciones y vuelve a intentarlo.`;
}

function mostrarFinal() {
  const nota = Math.round(estrellas * 20 / PREGUNTAS.length);
  const aprobado = nota >= 11;

  $("tarjetaFinal").innerHTML = `
    <img class="logo-final" src="imagenes/logo.png" alt="Escudo de la IES Comercial 45">
    <div class="nota ${aprobado ? "aprobado" : "desaprobado"}"><span id="numNota">0</span><small>/20</small></div>
    <div class="fila-estrellas" aria-label="${estrellas} estrellas de ${PREGUNTAS.length}">
      ${PREGUNTAS.map((_, k) => `<span class="estrella-final" style="animation-delay:${0.4 + k * 0.08}s">${k < estrellas ? "⭐" : "☆"}</span>`).join("")}
    </div>
    <p class="mensaje-final" id="frase"></p>
    <div class="resumen">
      <span class="dato" style="animation-delay:.6s">⭐ <b id="numEstrellas">0</b> estrellas</span>
      <span class="dato" style="animation-delay:.8s">🔥 <b id="numRachas">0</b> rachas</span>
      <span class="dato" style="animation-delay:1s">✘ <b id="numFallos">0</b> incorrectas</span>
    </div>
    ${fallos.length ? `<div class="repaso"><h2>Para repasar</h2><ul>${fallos.map(f =>
      `<li>${f.texto}<br><b>Respuesta: ${f.alternativas[f.correcta]}.</b> ${f.porque}</li>`).join("")}</ul></div>` : ""}
    <button class="boton-principal" id="reiniciar">Iniciar de nuevo</button>`;
  mostrarPantalla("final");
  Sonido.pararMusica();
  Sonido.final(aprobado);
  for (let k = 0; k < estrellas; k++) setTimeout(Sonido.estrella, 1000 + (400 + k * 80));

  contar($("numNota"), nota, 1600, () => { if (nota >= 14) lanzarChispas(90); });
  contar($("numEstrellas"), estrellas, 1600);
  contar($("numRachas"), rachas, 1200);
  contar($("numFallos"), fallos.length, 1200);
  setTimeout(() => escribir($("frase"), fraseFinal(nota)), 500);
  $("reiniciar").addEventListener("click", () => mostrarPantalla("entrada"));
}

// Teclado: 1-4 o A-D para responder
document.addEventListener("keydown", e => {
  if (!$("juego").classList.contains("activa")) return;
  const tecla = e.key.toUpperCase();
  let i = "1234".indexOf(tecla);
  if (i < 0) i = LETRAS.indexOf(tecla);
  if (i >= 0 && !respondida) responder(i);
});

$("ingresar").addEventListener("click", empezar);
$("temaIngresar").addEventListener("click", empezar);
$("verTema").addEventListener("click", () => { Sonido.tocar(); Sonido.musica(); mostrarPantalla("tema"); });

// Botón para silenciar o activar el sonido; se recuerda para la próxima vez
const botonSonido = $("botonSonido");
function pintarBotonSonido() {
  botonSonido.textContent = Sonido.silencio ? "🔇" : "🔊";
  botonSonido.setAttribute("aria-label", Sonido.silencio ? "Activar sonido" : "Silenciar sonido");
  botonSonido.title = botonSonido.getAttribute("aria-label");
}
botonSonido.addEventListener("click", () => { Sonido.alternar(); pintarBotonSonido();

// Pantalla completa para toda la página (tema y examen)
function alternarCompleta() {
  if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  else if (document.documentElement.requestFullscreen) document.documentElement.requestFullscreen().catch(() => {});
}
function pintarCompleta() {
  const dentro = !!document.fullscreenElement;
  $("botonCompleta").textContent = dentro ? "✕" : "⛶";
  $("botonCompleta").title = dentro ? "Salir de pantalla completa" : "Pantalla completa";
  $("botonCompleta").setAttribute("aria-label", $("botonCompleta").title);
  $("temaCompleta").textContent = dentro ? "✕ Salir de pantalla completa" : "⛶ Pantalla completa";
}
$("botonCompleta").addEventListener("click", alternarCompleta);
$("temaCompleta").addEventListener("click", alternarCompleta);
document.addEventListener("fullscreenchange", pintarCompleta); Sonido.tocar(); });
pintarBotonSonido();
$("volverInicio").addEventListener("click", () => mostrarPantalla("entrada"));
