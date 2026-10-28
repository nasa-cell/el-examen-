// Dibuja el fondo: cielo de día, cerros nevados, lago Titicaca y monedas en 3D.
(function () {
  const COLOR = { lejos: "#6f9ae6", nieve: "#ffffff", medio: "#3a6fd0", loma: "#2556b5", lagoArriba: "#3d7fe0", lagoAbajo: "#143c94" };
  const cielo = document.getElementById("cielo");
  const azar = (a, b) => a + Math.random() * (b - a);

  // Cordillera: puntos alternados cima/valle; las cimas más altas llevan nieve
  function cordillera(puntos, color, linea) {
    let figura = `<path d="M0 420 L${puntos.map(p => p.join(" ")).join(" L")} L1440 420 Z" fill="${color}"/>`;
    puntos.forEach((p, i) => {
      if (p[1] > linea || i === 0 || i === puntos.length - 1) return;
      const a = puntos[i - 1], b = puntos[i + 1], t = 0.32;
      const izq = [p[0] + (a[0] - p[0]) * t, p[1] + (a[1] - p[1]) * t];
      const der = [p[0] + (b[0] - p[0]) * t, p[1] + (b[1] - p[1]) * t];
      const baja = (izq[1] + der[1]) / 2;
      figura += `<path d="M${p.join(" ")} L${der.join(" ")} L${der[0] - (der[0] - p[0]) * .35} ${baja - 6} L${p[0] + 4} ${baja + 4} L${izq[0] + (p[0] - izq[0]) * .4} ${baja - 8} L${izq.join(" ")} Z" fill="${COLOR.nieve}"/>`;
      figura += `<path d="M${p.join(" ")} L${der.join(" ")} L${der[0] - (der[0] - p[0]) * .35} ${baja - 6} Z" fill="#000" opacity=".08"/>`;
    });
    return figura;
  }

  const lejos = [[0, 230], [90, 170], [180, 205], [300, 92], [400, 180], [520, 128], [610, 190], [760, 66], [880, 175], [1000, 118], [1100, 185], [1230, 88], [1340, 170], [1440, 140]];
  const medio = [[0, 272], [120, 222], [260, 262], [380, 192], [520, 266], [660, 206], [800, 272], [950, 202], [1080, 262], [1220, 212], [1360, 256], [1440, 232]];

  let brillos = "";
  for (let i = 0; i < 22; i++) {
    const x = azar(0, 1400), y = azar(330, 410);
    brillos += `<line x1="${x}" y1="${y}" x2="${x + azar(30, 110)}" y2="${y}" stroke="#fff" stroke-width="2" stroke-linecap="round" class="brillo-lago" style="animation-delay:${azar(-3, 0)}s"/>`;
  }

  const paisaje = `<svg class="paisaje" viewBox="0 0 1440 420" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="gLago" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${COLOR.lagoArriba}"/><stop offset="1" stop-color="${COLOR.lagoAbajo}"/></linearGradient>
      <linearGradient id="gNiebla" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#fff" stop-opacity=".18"/></linearGradient>
    </defs>
    ${cordillera(lejos, COLOR.lejos, 140)}
    <rect x="0" y="150" width="1440" height="140" fill="url(#gNiebla)"/>
    ${cordillera(medio, COLOR.medio, 200)}
    <path d="M0 305 Q 180 272 380 300 T 760 298 T 1120 296 T 1440 300 V420 H0 Z" fill="${COLOR.loma}"/>
    <rect x="0" y="318" width="1440" height="102" fill="url(#gLago)"/>
    <path d="M1040 322 Q1110 296 1190 322 Z" fill="${COLOR.loma}"/>
    ${brillos}
    <g class="balsa" style="animation-delay:-25s"><g class="balsa-cuerpo">
      <path d="M0 362 Q30 378 80 376 Q118 372 128 352 Q100 366 60 366 Q22 366 0 362 Z" fill="#d9a441"/>
      <path d="M6 364 Q40 372 80 370 M14 368 Q50 375 96 368" stroke="#9c6d1c" stroke-width="2" fill="none"/>
      <line x1="62" y1="366" x2="62" y2="318" stroke="#5b3d0e" stroke-width="3"/>
      <path d="M64 320 L96 346 L64 350 Z" fill="#f5efe0"/>
    </g></g>
  </svg>`;

  let extra = `<div class="sol"></div>`;
  for (let i = 0; i < 4; i++)
    extra += `<div class="nube" style="top:${azar(6, 38)}%;width:${azar(110, 190)}px;animation-duration:${azar(70, 120)}s;animation-delay:${azar(-120, 0)}s;opacity:${azar(.55, .9)}"></div>`;
  for (let i = 0; i < 3; i++)
    extra += `<div class="ave" style="top:${azar(14, 30)}%;animation-duration:${azar(28, 40)}s;animation-delay:${azar(-30, 0)}s"><svg viewBox="0 0 30 12"><path d="M0 2 Q8 0 15 9 Q22 0 30 2" stroke="#0d2f73" stroke-width="2.5" fill="none" stroke-linecap="round"/></svg></div>`;

  // Monedas peruanas que suben girando; por detrás llevan el escudo del colegio
  const cantidad = innerWidth < 700 ? 5 : 10;
  for (let i = 0; i < cantidad; i++) {
    const valor = [1, 2, 5][i % 3];
    const tam = azar(34, 62);
    extra += `<div class="moneda ${valor === 5 ? "oro" : "plata"}" style="left:${(i + .5) * (100 / cantidad) + azar(-3, 3)}%;width:${tam}px;height:${tam}px;font-size:${tam * .28}px;animation-duration:${azar(18, 30)}s;animation-delay:${azar(-30, 0)}s;opacity:${azar(.55, .85)}">
      <div class="giro" style="animation-duration:${azar(3, 6)}s">
        <div class="cara-moneda"><span class="valor"><small>S/</small>${valor}</span></div>
        <div class="cara-moneda reverso"><img class="escudito" src="imagenes/logo.png" alt=""></div>
      </div></div>`;
  }

  cielo.innerHTML = extra + paisaje;
})();
