// Pantalla «Ver el tema»: pestañas y visor de infografías. El contenido está escrito en el index.html.
(function () {
  const pestanas = document.getElementById("pestanas");
  const contenido = document.getElementById("contenidoTema");

  // Muestra la parte del tema elegida; las demás quedan ocultas
  function abrir(id) {
    pestanas.querySelectorAll(".pestana").forEach(b => b.setAttribute("aria-selected", b.dataset.id === id));
    contenido.querySelectorAll(".panel-tema").forEach(panel => {
      panel.hidden = panel.id !== "panel-" + id;
      if (!panel.hidden) contenido.style.setProperty("--color-tema", panel.dataset.color);
    });
    contenido.scrollTop = 0;
  }

  // Visor a pantalla completa de las infografías, con flechas para pasar de una a otra
  const fotos = [...contenido.querySelectorAll(".infografia img")].map(img => ({ src: img.getAttribute("src"), titulo: img.alt }));
  const visor = document.createElement("div");
  visor.className = "visor-completo";
  visor.hidden = true;
  visor.innerHTML = `
    <img id="fotoVisor" alt="">
    <p class="titulo-visor" id="tituloVisor"></p>
    <button class="visor-boton cerrar-visor" id="cerrarVisor" aria-label="Cerrar pantalla completa">✕</button>
    <button class="visor-boton flecha izquierda" data-paso="-1" aria-label="Infografía anterior">‹</button>
    <button class="visor-boton flecha derecha" data-paso="1" aria-label="Infografía siguiente">›</button>`;
  document.body.appendChild(visor);
  let fotoActual = 0;

  function mostrarFoto(i) {
    fotoActual = (i + fotos.length) % fotos.length;
    visor.querySelector("#fotoVisor").src = fotos[fotoActual].src;
    visor.querySelector("#fotoVisor").alt = fotos[fotoActual].titulo;
    visor.querySelector("#tituloVisor").textContent = `${fotoActual + 1} de ${fotos.length} · ${fotos[fotoActual].titulo}`;
  }
  function abrirVisor(i) {
    mostrarFoto(i);
    visor.hidden = false;
    if (visor.requestFullscreen) visor.requestFullscreen().catch(() => {});
    visor.querySelector("#cerrarVisor").focus();
  }
  function cerrarVisor() {
    visor.hidden = true;
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
  }
  document.addEventListener("fullscreenchange", () => { if (!document.fullscreenElement) visor.hidden = true; });
  visor.addEventListener("click", e => {
    const paso = e.target.closest("[data-paso]");
    if (paso) mostrarFoto(fotoActual + +paso.dataset.paso);
    else if (e.target.closest("#cerrarVisor") || e.target === visor) cerrarVisor();
  });
  document.addEventListener("keydown", e => {
    if (visor.hidden) return;
    if (e.key === "ArrowRight") mostrarFoto(fotoActual + 1);
    if (e.key === "ArrowLeft") mostrarFoto(fotoActual - 1);
    if (e.key === "Escape") cerrarVisor();
  });
  contenido.addEventListener("click", e => { const b = e.target.closest(".abrir-foto"); if (b) abrirVisor(+b.dataset.foto); });

  pestanas.addEventListener("click", e => { const b = e.target.closest(".pestana"); if (b) abrir(b.dataset.id); });
  abrir("infografia");
})();
