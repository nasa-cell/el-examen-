// Contenido de la pantalla «Ver el tema». Usa los mismos datos que las preguntas.
const TEMA = [
  {
    id: "infografia", nombre: "Infografía", color: "#f2c230",
    infografias: [
      { src: "imagenes/tema-regimen-especial-1.jpg", titulo: "Infografía del Régimen Especial de Renta" },
      { src: "imagenes/tema-regimen-especial-2.jpg", titulo: "Infografía educativa sobre el Régimen Especial de Renta" }
    ]
  },
  {
    id: "nrus", nombre: "Nuevo RUS", color: "#e0a800", foto: "imagenes/preguntas/01.jpg",
    resumen: "El régimen más sencillo, para negocios muy pequeños que venden al consumidor final, como una bodega o un puesto del mercado.",
    datos: [
      ["👥", "¿Quiénes?", "Solo personas naturales y sucesiones indivisas. No pueden entrar empresas como una S.A.C."],
      ["💰", "Límite de ingresos", "Hasta S/ 96 000 al año o S/ 8 000 en un mes."],
      ["🪙", "Pago mensual", "Cuota fija: S/ 20 (categoría 1, hasta S/ 5 000 al mes) o S/ 50 (categoría 2, hasta S/ 8 000 al mes). Ya incluye el IGV y la renta."],
      ["🧾", "Comprobantes", "Solo boletas de venta y tickets. No puede emitir facturas."],
      ["📒", "Libros contables", "No lleva libros; solo guarda sus comprobantes."],
      ["📝", "Declaración anual", "No presenta."]
    ],
    sabias: "Si un cliente le pide factura, el negocio debe cambiarse a un régimen que permita emitirlas."
  },
  {
    id: "rer", nombre: "RER", color: "#1f5fd1", foto: "imagenes/preguntas/12.jpg",
    resumen: "Régimen Especial de Renta: para emprendedores, microempresas y pequeños negocios que generan rentas de tercera categoría.",
    datos: [
      ["👥", "¿Quiénes lo conforman?", "Personas naturales y jurídicas, con ingresos de hasta 300 UIT al año."],
      ["💰", "Límite de ingresos", "S/ 300 000 al año."],
      ["🛒", "Límite de compras", "S/ 300 000 al año."],
      ["🏠", "Activos fijos", "Hasta S/ 70 000 (sin contar el inmueble)."],
      ["📒", "Contabilidad y libros", "Registro simplificado: Registro de Compras y Registro de Ventas."],
      ["％", "Tributación", "Pago de un porcentaje fijo del Impuesto a la Renta, según el tipo de actividad."],
      ["🧾", "Comprobantes de pago", "Boletas de venta, notas de crédito y notas de débito."],
      ["⭐", "Beneficio principal", "Menor carga administrativa y tributaria."]
    ],
    sabias: "En el RER no se presenta declaración anual de renta: el pago de cada mes es el definitivo."
  },
  {
    id: "rmt", nombre: "Régimen MYPE", color: "#1e9e4a", foto: "imagenes/preguntas/15.jpg",
    resumen: "Régimen MYPE Tributario: para micro y pequeñas empresas que van creciendo y quieren pagar según lo que ganan.",
    datos: [
      ["👥", "¿Quiénes?", "Personas naturales y jurídicas (micro y pequeñas empresas)."],
      ["💰", "Límite de ingresos", "Hasta 1 700 UIT de ingresos netos al año."],
      ["🗓️", "Pago mensual a cuenta", "1 % de los ingresos netos del mes, si al año no pasan de 300 UIT."],
      ["🧮", "Impuesto anual", "10 % por las primeras 15 UIT de ganancia (renta neta) y 29,5 % por el resto."],
      ["🧾", "Comprobantes", "Puede emitir facturas, boletas y otros comprobantes."],
      ["📝", "Declaración anual", "Sí presenta."]
    ],
    sabias: "Las empresas pequeñas pagan menos porque la primera parte de su ganancia tiene la tasa baja de 10 %."
  },
  {
    id: "general", nombre: "Régimen General", color: "#d62839", foto: "imagenes/preguntas/02.jpg",
    resumen: "El régimen para empresas de cualquier tamaño, desde un negocio mediano hasta una gran empresa.",
    datos: [
      ["👥", "¿Quiénes?", "Cualquier persona natural o jurídica con negocio."],
      ["♾️", "Límite de ingresos", "No tiene límite."],
      ["🏦", "Impuesto anual", "29,5 % de la renta neta (ingresos menos gastos aceptados)."],
      ["🗓️", "Pagos a cuenta", "Paga cada mes a cuenta del impuesto del año."],
      ["📚", "Libros contables", "Lleva contabilidad completa según sus ingresos."],
      ["🧾", "Comprobantes", "Puede emitir facturas, boletas y otros comprobantes."],
      ["📝", "Declaración anual", "Sí presenta."]
    ],
    sabias: "No hay que confundir: 29,5 % es el Impuesto a la Renta y 18 % es el IGV."
  },
  {
    id: "comparar", nombre: "Comparar", color: "#0d2f73",
    tabla: {
      columnas: ["", "Nuevo RUS", "RER", "Régimen MYPE", "Régimen General"],
      filas: [
        ["¿Empresas (S.A.C.)?", "No", "Sí", "Sí", "Sí"],
        ["Límite de ingresos al año", "S/ 96 000", "S/ 300 000", "1 700 UIT", "Sin límite"],
        ["¿Cómo paga?", "Cuota fija S/ 20 o S/ 50", "Porcentaje fijo mensual", "1 % al mes y 10 % / 29,5 % al año", "Pagos a cuenta y 29,5 % al año"],
        ["Libros", "Ninguno", "Compras y Ventas", "Según ingresos", "Contabilidad completa"],
        ["Declaración anual", "No", "No", "Sí", "Sí"]
      ]
    }
  },
  {
    id: "palabras", nombre: "Palabras clave", color: "#7a4cc2",
    palabras: [
      ["🏛️", "SUNAT", "Superintendencia Nacional de Aduanas y de Administración Tributaria. Recauda y fiscaliza los tributos."],
      ["🆔", "RUC", "Registro Único de Contribuyentes: número de 11 dígitos que identifica al negocio."],
      ["📏", "UIT", "Unidad Impositiva Tributaria: un valor en soles que fija el Gobierno cada año y sirve de medida para límites y multas."],
      ["💰", "IGV", "Impuesto General a las Ventas: 18 % (16 % de IGV más 2 % de Impuesto de Promoción Municipal)."],
      ["🧾", "Boleta de venta", "Comprobante para el consumidor final."],
      ["📄", "Factura", "Comprobante para empresas; lleva el RUC del cliente y el IGV aparte."],
      ["📈", "Renta neta", "La ganancia: ingresos menos gastos aceptados."],
      ["🏪", "Tercera categoría", "Las rentas que vienen de un negocio o empresa."]
    ]
  }
];

(function () {
  const pestanas = document.getElementById("pestanas");
  const contenido = document.getElementById("contenidoTema");

  function dibujar(seccion) {
    if (seccion.infografias)
      return `<div class="galeria">${seccion.infografias.map((f, i) => `
        <figure class="infografia" style="animation-delay:${i * .12}s">
          <button class="abrir-foto" data-foto="${i}" aria-label="Ver «${f.titulo}» en pantalla completa">
            <img src="${f.src}" alt="${f.titulo}">
            <span class="lupa">⛶ Pantalla completa</span>
          </button>
          <figcaption>${f.titulo}</figcaption>
        </figure>`).join("")}</div>`;
    if (seccion.tabla)
      return `<div class="tabla-tema"><table>
        <thead><tr>${seccion.tabla.columnas.map(c => `<th>${c}</th>`).join("")}</tr></thead>
        <tbody>${seccion.tabla.filas.map((f, i) => `<tr style="animation-delay:${i * .08}s">${f.map((c, k) => k ? `<td>${c}</td>` : `<th>${c}</th>`).join("")}</tr>`).join("")}</tbody>
      </table></div>`;
    if (seccion.palabras)
      return `<div class="palabras">${seccion.palabras.map((p, i) => `
        <div class="palabra" style="animation-delay:${i * .06}s"><span>${p[0]}</span><div><b>${p[1]}</b><p>${p[2]}</p></div></div>`).join("")}</div>`;
    return `<div class="regimen-tema">
      <div class="lado-foto">
        <img src="${seccion.foto}" alt="">
        <p class="resumen-tema">${seccion.resumen}</p>
        <p class="sabias"><b>¿Sabías que…?</b> ${seccion.sabias}</p>
      </div>
      <ul class="datos-tema">${seccion.datos.map((d, i) => `
        <li style="animation-delay:${i * .07}s"><span class="ico">${d[0]}</span><b>${d[1]}</b><span>${d[2]}</span></li>`).join("")}</ul>
    </div>`;
  }

  function abrir(id) {
    const seccion = TEMA.find(s => s.id === id);
    document.querySelectorAll(".pestana").forEach(b => b.setAttribute("aria-selected", b.dataset.id === id));
    contenido.style.setProperty("--color-tema", seccion.color);
    contenido.innerHTML = `<div class="panel-tema">${dibujar(seccion)}</div>`;
    contenido.scrollTop = 0;
  }

  // Visor a pantalla completa de las infografías, con flechas para pasar de una a otra
  const fotos = TEMA.find(s => s.infografias).infografias;
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

  pestanas.innerHTML = TEMA.map(s =>
    `<button class="pestana" role="tab" data-id="${s.id}" style="--color-tema:${s.color}">${s.nombre}</button>`).join("");
  pestanas.addEventListener("click", e => { const b = e.target.closest(".pestana"); if (b) abrir(b.dataset.id); });
  abrir("infografia");
})();
