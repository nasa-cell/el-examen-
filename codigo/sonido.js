// Sonidos del examen hechos con el navegador (Web Audio) y música de fondo con la etiqueta <audio>.
const Sonido = (function () {
  let ctx = null, general = null, efectos = null;
  let silencio = localStorage.getItem("examenSilencio") === "1";
  const pista = document.getElementById("musicaFondo");
  const VOLUMEN_MUSICA = 0.3, VOLUMEN_BAJO = 0.12;
  pista.muted = silencio;

  function iniciar() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return true; }
    const Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return false;
    ctx = new Contexto();
    general = ctx.createGain(); general.gain.value = silencio ? 0 : 1; general.connect(ctx.destination);
    efectos = ctx.createGain(); efectos.gain.value = 0.5; efectos.connect(general);
    return true;
  }

  // Una nota con subida y caída suave del volumen
  function nota(frecuencia, inicio, duracion, { tipo = "sine", volumen = 0.3, desliza = 0 } = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(frecuencia, inicio);
    if (desliza) o.frequency.exponentialRampToValueAtTime(frecuencia * desliza, inicio + duracion);
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(volumen, inicio + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
    o.connect(g); g.connect(efectos);
    o.start(inicio); o.stop(inicio + duracion + 0.05);
  }

  const ahora = () => ctx.currentTime + 0.01;
  const listo = () => iniciar() && !silencio;

  return {
    get silencio() { return silencio; },
    alternar() {
      silencio = !silencio;
      localStorage.setItem("examenSilencio", silencio ? "1" : "0");
      if (iniciar()) general.gain.setTargetAtTime(silencio ? 0 : 1, ctx.currentTime, 0.05);
      pista.muted = silencio;
      return silencio;
    },
    musica() {
      if (!pista.paused) return;
      pista.volume = VOLUMEN_MUSICA;
      pista.play().catch(() => {});
    },
    pararMusica() {
      pista.pause();
      pista.currentTime = 0;
    },
    // Volumen de la música más bajo mientras se lee la explicación
    bajarMusica(bajar) {
      pista.volume = bajar ? VOLUMEN_BAJO : VOLUMEN_MUSICA;
    },
    tocar() {
      if (!listo()) return;
      nota(660, ahora(), 0.07, { tipo: "triangle", volumen: 0.25 });
    },
    acierto() {
      if (!listo()) return;
      const t = ahora();
      [523, 659, 784, 1047].forEach((f, i) => nota(f, t + i * 0.08, 0.3, { tipo: "triangle", volumen: 0.35 }));
      nota(1568, t + 0.32, 0.4, { tipo: "sine", volumen: 0.15 });
    },
    fallo() {
      if (!listo()) return;
      const t = ahora();
      nota(220, t, 0.25, { tipo: "sawtooth", volumen: 0.18, desliza: 0.85 });
      nota(165, t + 0.22, 0.45, { tipo: "sawtooth", volumen: 0.18, desliza: 0.7 });
    },
    tic(urgente) {
      if (!listo()) return;
      nota(urgente ? 1320 : 990, ahora(), 0.06, { tipo: "square", volumen: urgente ? 0.16 : 0.1 });
    },
    tiempoAcabado() {
      if (!listo()) return;
      const t = ahora();
      [0, 0.18, 0.36].forEach(d => nota(330, t + d, 0.14, { tipo: "square", volumen: 0.15 }));
      nota(196, t + 0.55, 0.7, { tipo: "sawtooth", volumen: 0.18, desliza: 0.6 });
    },
    racha() {
      if (!listo()) return;
      const t = ahora();
      [784, 988, 1175, 1568, 1175, 1568].forEach((f, i) => nota(f, t + 0.35 + i * 0.07, 0.22, { tipo: "square", volumen: 0.12 }));
    },
    final(aprobado) {
      if (!listo()) return;
      const t = ahora();
      const notas = aprobado ? [523, 659, 784, 1047, 784, 1047, 1319] : [392, 349, 330, 262];
      notas.forEach((f, i) => nota(f, t + i * 0.16, 0.45, { tipo: "triangle", volumen: 0.35 }));
    },
    estrella() {
      if (!listo()) return;
      nota(1760, ahora(), 0.12, { tipo: "sine", volumen: 0.1 });
    }
  };
})();
