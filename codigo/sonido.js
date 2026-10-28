// Sonidos y música de fondo hechos con el navegador (Web Audio), sin archivos.
const Sonido = (function () {
  let ctx = null, general = null, musica = null, efectos = null;
  let silencio = localStorage.getItem("examenSilencio") === "1";
  let sonando = false, siguienteNota = 0, paso = 0, temporizador = null;

  function iniciar() {
    if (ctx) { if (ctx.state === "suspended") ctx.resume(); return true; }
    const Contexto = window.AudioContext || window.webkitAudioContext;
    if (!Contexto) return false;
    ctx = new Contexto();
    general = ctx.createGain(); general.gain.value = silencio ? 0 : 1; general.connect(ctx.destination);
    musica = ctx.createGain(); musica.gain.value = 0.16; musica.connect(general);
    efectos = ctx.createGain(); efectos.gain.value = 0.5; efectos.connect(general);
    return true;
  }

  // Una nota con subida y caída suave del volumen
  function nota(frecuencia, inicio, duracion, { tipo = "sine", volumen = 0.3, destino = efectos, desliza = 0 } = {}) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = tipo;
    o.frequency.setValueAtTime(frecuencia, inicio);
    if (desliza) o.frequency.exponentialRampToValueAtTime(frecuencia * desliza, inicio + duracion);
    g.gain.setValueAtTime(0.0001, inicio);
    g.gain.exponentialRampToValueAtTime(volumen, inicio + 0.015);
    g.gain.exponentialRampToValueAtTime(0.0001, inicio + duracion);
    o.connect(g); g.connect(destino);
    o.start(inicio); o.stop(inicio + duracion + 0.05);
  }

  const ahora = () => ctx.currentTime + 0.01;
  const listo = () => iniciar() && !silencio;

  // Música: huayno alegre en escala pentatónica, con bajo y percusión suave
  const MELODIA = [
    440, 523, 587, 659, 587, 523, 440, 392, 440, 0, 659, 0, 587, 523, 440, 0,
    523, 587, 659, 784, 659, 587, 523, 587, 659, 0, 523, 0, 440, 392, 440, 0,
    659, 784, 880, 784, 659, 587, 659, 784, 659, 0, 587, 523, 587, 0, 659, 0,
    523, 440, 392, 440, 523, 587, 523, 440, 392, 0, 440, 0, 440, 0, 0, 0
  ];
  const BAJO = [110, 110, 131, 98];
  const CORCHEA = 0.19;

  function programar() {
    while (siguienteNota < ctx.currentTime + 0.4) {
      const f = MELODIA[paso % MELODIA.length];
      if (f) nota(f, siguienteNota, CORCHEA * 1.6, { tipo: "triangle", volumen: 0.22, destino: musica });
      if (paso % 4 === 0) nota(BAJO[Math.floor(paso / 16) % BAJO.length], siguienteNota, CORCHEA * 2.5, { tipo: "sine", volumen: 0.35, destino: musica });
      if (paso % 4 === 2) nota(BAJO[Math.floor(paso / 16) % BAJO.length] * 1.5, siguienteNota, CORCHEA * 1.2, { tipo: "sine", volumen: 0.2, destino: musica });
      if (paso % 2 === 0) nota(paso % 4 === 0 ? 90 : 160, siguienteNota, 0.08, { tipo: "square", volumen: 0.05, destino: musica, desliza: 0.5 });
      siguienteNota += CORCHEA;
      paso++;
    }
  }

  return {
    get silencio() { return silencio; },
    alternar() {
      silencio = !silencio;
      localStorage.setItem("examenSilencio", silencio ? "1" : "0");
      if (iniciar()) general.gain.setTargetAtTime(silencio ? 0 : 1, ctx.currentTime, 0.05);
      return silencio;
    },
    musica() {
      if (!iniciar() || sonando) return;
      sonando = true; paso = 0; siguienteNota = ctx.currentTime + 0.1;
      musica.gain.setTargetAtTime(0.16, ctx.currentTime, 0.3);
      programar();
      temporizador = setInterval(programar, 100);
    },
    pararMusica() {
      if (!ctx || !sonando) return;
      sonando = false;
      clearInterval(temporizador);
      musica.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.2);
    },
    // Volumen de la música más bajo mientras se lee la explicación
    bajarMusica(bajar) {
      if (ctx) musica.gain.setTargetAtTime(bajar ? 0.07 : 0.16, ctx.currentTime, 0.2);
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
