// Cada pregunta: tema, dibujo (si falla la foto), imagen, texto, alternativas, índice de la correcta y explicación.
const PREGUNTAS = [
  {
    tema: "Nuevo RUS", dibujo: "🏪",
    imagen: "imagenes/preguntas/01.jpg", descripcion: "Tienda de un mercado de Puno",
    texto: "Doña Rosa tiene una bodega pequeña y vende solo a vecinos (consumidores finales). ¿Qué régimen es el más sencillo para ella?",
    alternativas: ["Régimen General", "Nuevo RUS", "Régimen MYPE Tributario", "Régimen Especial (RER)"],
    correcta: 1,
    porque: "El Nuevo RUS es para personas naturales con negocios pequeños que venden a consumidores finales. Paga una cuota fija al mes y no lleva libros contables."
  },
  {
    tema: "Régimen General", dibujo: "🏢",
    imagen: "imagenes/preguntas/02.jpg", descripcion: "Edificio moderno de una gran empresa en Lima",
    texto: "¿Qué régimen no tiene límite de ingresos?",
    alternativas: ["Nuevo RUS", "Régimen Especial (RER)", "Régimen MYPE Tributario", "Régimen General"],
    correcta: 3,
    porque: "El Régimen General acepta empresas de cualquier tamaño. Los otros regímenes tienen un tope de ingresos al año."
  },
  {
    tema: "SUNAT", dibujo: "🏛️",
    imagen: "imagenes/preguntas/03.jpg", descripcion: "Local de la SUNAT",
    texto: "¿Qué institución administra y cobra los tributos internos en el Perú?",
    alternativas: ["RENIEC", "SUNAT", "SUNARP", "INDECOPI"],
    correcta: 1,
    porque: "La SUNAT (Superintendencia Nacional de Aduanas y de Administración Tributaria) recauda y fiscaliza los tributos. RENIEC ve el DNI, SUNARP los registros públicos e INDECOPI protege al consumidor."
  },
  {
    tema: "RUC", dibujo: "🪪",
    imagen: "imagenes/preguntas/04.jpg", descripcion: "Fachada de una oficina de la SUNAT",
    texto: "¿Cómo se llama el número que identifica a un negocio ante la SUNAT?",
    alternativas: ["RUC", "DNI", "UIT", "IGV"],
    correcta: 0,
    porque: "El RUC (Registro Único de Contribuyentes) tiene 11 dígitos y todo negocio lo necesita para tributar. El DNI identifica a la persona, no al negocio."
  },
  {
    tema: "Nuevo RUS", dibujo: "🧾",
    imagen: "imagenes/preguntas/05.svg", descripcion: "Boleta de venta de una bodega",
    texto: "¿Qué comprobantes de pago puede entregar un negocio del Nuevo RUS?",
    alternativas: ["Facturas y boletas", "Solo facturas", "Solo boletas de venta y tickets", "Ningún comprobante"],
    correcta: 2,
    porque: "En el Nuevo RUS solo se entregan boletas de venta y tickets. No se pueden emitir facturas, porque se vende a consumidores finales."
  },
  {
    tema: "IGV", dibujo: "💰",
    imagen: "imagenes/preguntas/06.jpg", descripcion: "Caja registradora",
    texto: "¿Cuál es la tasa general del IGV (Impuesto General a las Ventas) en el Perú?",
    alternativas: ["10 %", "15 %", "29,5 %", "18 %"],
    correcta: 3,
    porque: "La tasa general es 18 %: 16 % de IGV más 2 % de Impuesto de Promoción Municipal. El 29,5 % es la tasa del Impuesto a la Renta del Régimen General."
  },
  {
    tema: "Nuevo RUS", dibujo: "🪙",
    imagen: "imagenes/preguntas/07.jpg", descripcion: "Billete antiguo de 20 soles",
    texto: "En el Nuevo RUS, ¿cuánto paga al mes un negocio de la categoría 1 (ingresos de hasta S/ 5 000 al mes)?",
    alternativas: ["S/ 20", "S/ 50", "S/ 100", "El 1,5 % de sus ventas"],
    correcta: 0,
    porque: "La categoría 1 paga una cuota fija de S/ 20 al mes y la categoría 2 (hasta S/ 8 000 al mes) paga S/ 50. Esa cuota ya incluye el IGV y el Impuesto a la Renta."
  },
  {
    tema: "Nuevo RUS", dibujo: "📉",
    imagen: "imagenes/preguntas/08.jpg", descripcion: "Mercado Central de Puno",
    texto: "¿Cuál es el máximo de ingresos al año para quedarse en el Nuevo RUS?",
    alternativas: ["S/ 525 000", "S/ 96 000", "1 700 UIT", "No tiene límite"],
    correcta: 1,
    porque: "El Nuevo RUS permite hasta S/ 96 000 al año (o S/ 8 000 en un mes). Si el negocio gana más, debe pasar a otro régimen."
  },
  {
    tema: "Nuevo RUS", dibujo: "👔",
    imagen: "imagenes/preguntas/09.jpg", descripcion: "Reunión de trabajo en una empresa",
    texto: "Una empresa S.A.C. (persona jurídica) quiere acogerse al Nuevo RUS. ¿Puede hacerlo?",
    alternativas: ["Sí, cualquier empresa puede", "Sí, si tiene menos de 5 trabajadores", "No, solo pueden las personas naturales y las sucesiones indivisas", "Sí, si vende solo en Puno"],
    correcta: 2,
    porque: "El Nuevo RUS es solo para personas naturales y sucesiones indivisas. Las empresas como una S.A.C. o una E.I.R.L. deben ir al RER, al Régimen MYPE o al General."
  },
  {
    tema: "Nuevo RUS", dibujo: "📒",
    imagen: "imagenes/preguntas/10.jpg", descripcion: "Libro contable abierto",
    texto: "¿En qué régimen el negocio NO está obligado a llevar libros contables?",
    alternativas: ["Nuevo RUS", "Régimen Especial (RER)", "Régimen MYPE Tributario", "Régimen General"],
    correcta: 0,
    porque: "El Nuevo RUS no lleva libros contables: solo guarda sus comprobantes. El RER lleva Registro de Compras y de Ventas, y el Régimen MYPE y el General llevan más libros."
  },
  {
    tema: "Nuevo RUS", dibujo: "🤝",
    imagen: "imagenes/preguntas/11.svg", descripcion: "Factura con IGV",
    texto: "La bodega de Luis, que está en el Nuevo RUS, empieza a vender a empresas que le piden factura. ¿Qué debe hacer?",
    alternativas: ["Seguir igual y entregar boletas", "Cambiarse a un régimen que permita emitir facturas", "Cerrar el negocio", "Pedir la factura prestada a otro negocio"],
    correcta: 1,
    porque: "En el Nuevo RUS no se emiten facturas. Si sus clientes las necesitan, Luis debe cambiarse a un régimen que las permita, como el Régimen MYPE o el General."
  },
  {
    tema: "RER", dibujo: "📊",
    imagen: "imagenes/preguntas/12.jpg", descripcion: "Ferretería con productos en estantes",
    texto: "¿Cuál es el límite de ingresos al año en el Régimen Especial de Renta (RER)?",
    alternativas: ["S/ 96 000", "S/ 300 000", "1 700 UIT", "No tiene límite"],
    correcta: 1,
    porque: "Según el tema, el RER permite ingresos de hasta S/ 300 000 al año (y compras hasta el mismo monto). S/ 96 000 es el tope del Nuevo RUS y 1 700 UIT es el del Régimen MYPE."
  },
  {
    tema: "RER", dibujo: "📅",
    imagen: "imagenes/preguntas/13.jpg", descripcion: "Calendario de pared",
    texto: "En el RER, ¿cómo se paga el Impuesto a la Renta?",
    alternativas: ["Con una cuota fija de S/ 20", "Con un porcentaje fijo de los ingresos, según el tipo de actividad", "Con el 29,5 % de la ganancia del año", "No se paga nada"],
    correcta: 1,
    porque: "En el RER se paga un porcentaje fijo del Impuesto a la Renta sobre los ingresos, según el tipo de actividad. La cuota fija de S/ 20 es del Nuevo RUS y el 29,5 % es del Régimen General."
  },
  {
    tema: "RER", dibujo: "🏠",
    imagen: "imagenes/preguntas/14.jpg", descripcion: "Taller con mesas y equipos",
    texto: "En el RER, ¿hasta cuánto pueden valer los activos fijos del negocio (sin contar el inmueble)?",
    alternativas: ["S/ 20 000", "S/ 70 000", "S/ 300 000", "No tiene límite"],
    correcta: 1,
    porque: "Según el tema, en el RER los activos fijos (máquinas, muebles, vehículos) pueden valer hasta S/ 70 000, sin contar el local o inmueble. S/ 300 000 es el límite de ingresos."
  },
  {
    tema: "Régimen MYPE", dibujo: "📈",
    imagen: "imagenes/preguntas/15.jpg", descripcion: "Comerciante en las islas de los Uros, Puno",
    texto: "¿Hasta cuántos ingresos netos al año puede tener un negocio del Régimen MYPE Tributario?",
    alternativas: ["S/ 96 000", "S/ 525 000", "1 700 UIT", "No tiene límite"],
    correcta: 2,
    porque: "El Régimen MYPE Tributario es para micro y pequeñas empresas con ingresos de hasta 1 700 UIT al año."
  },
  {
    tema: "Régimen MYPE", dibujo: "🧮",
    imagen: "imagenes/preguntas/16.jpg", descripcion: "Calculadora",
    texto: "En el Régimen MYPE, ¿qué tasa anual se paga por los primeros 15 UIT de ganancia (renta neta)?",
    alternativas: ["10 %", "18 %", "29,5 %", "1 %"],
    correcta: 0,
    porque: "Por las primeras 15 UIT de ganancia se paga 10 %, y por lo que pase de ese monto se paga 29,5 %. Así pagan menos las empresas pequeñas."
  },
  {
    tema: "Régimen MYPE", dibujo: "🗓️",
    imagen: "imagenes/preguntas/17.jpg", descripcion: "Ventanilla de un banco",
    texto: "Un negocio del Régimen MYPE con ingresos de hasta 300 UIT al año, ¿cuánto paga cada mes a cuenta del Impuesto a la Renta?",
    alternativas: ["1 % de sus ingresos netos del mes", "18 % de sus ventas", "Una cuota fija de S/ 50", "No paga nada al mes"],
    correcta: 0,
    porque: "Hasta 300 UIT de ingresos al año, el pago a cuenta es el 1 % de los ingresos netos del mes. Al final del año se hace la declaración anual."
  },
  {
    tema: "Régimen General", dibujo: "🏦",
    imagen: "imagenes/preguntas/18.jpg", descripcion: "Edificio de un banco en Lima",
    texto: "En el Régimen General, ¿cuál es la tasa anual del Impuesto a la Renta para las empresas?",
    alternativas: ["10 %", "1,5 %", "18 %", "29,5 %"],
    correcta: 3,
    porque: "En el Régimen General las empresas pagan 29,5 % sobre su renta neta (ingresos menos gastos aceptados). El 18 % es el IGV."
  },
  {
    tema: "Declaración anual", dibujo: "📝",
    imagen: "imagenes/preguntas/19.jpg", descripcion: "Formulario de impuestos",
    texto: "¿Qué regímenes deben presentar la declaración jurada anual del Impuesto a la Renta?",
    alternativas: ["Solo el Nuevo RUS", "Solo el RER", "El Régimen MYPE y el Régimen General", "Ninguno"],
    correcta: 2,
    porque: "El Régimen MYPE y el Régimen General hacen pagos a cuenta y al final del año presentan la declaración anual. El Nuevo RUS y el RER no la presentan."
  },
  {
    tema: "UIT", dibujo: "📏",
    imagen: "imagenes/preguntas/20.jpg", descripcion: "Moneda peruana de 100 soles de oro",
    texto: "¿Qué es la UIT (Unidad Impositiva Tributaria)?",
    alternativas: ["Un impuesto que se paga cada mes", "Un valor en soles que sirve de referencia para límites, multas y tasas", "El número de RUC del negocio", "Un tipo de comprobante de pago"],
    correcta: 1,
    porque: "La UIT es un monto en soles que fija el Gobierno cada año. Se usa como medida para los topes de los regímenes, las multas y otras cantidades tributarias."
  }
];
