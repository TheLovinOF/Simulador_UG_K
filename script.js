/* =========================
           CONFIG
        ========================= */
const EXAM_SIZE = 40;
const TOTAL_TIME_SEC = 60 * 60;
let CURRENT_MODE = "NORMAL";

/* =========================
   UTILIDADES
========================= */
function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}
function pickN(arr, n) {
    const copy = arr.slice();
    shuffle(copy);
    return copy.slice(0, n);
}
function unique4(correct, wrongs) {
    const s = new Set([correct]);
    for (const w of wrongs) s.add(w);
    const out = Array.from(s);
    while (out.length < 4) out.push(out[out.length - 1] + " ");
    return shuffle(out.slice(0, 4));
}
function q(topic, code, subtema, text, options, correctIndex) {
    return { topic, code, subtema, text, options, correct: correctIndex };
}

/* =========================
   (1) PREGUNTAS TEXTUALES DEL PDF (IMPRIMIDAS)
========================= */
const FIXED = [
    // Lenguaje: cómic
    q("Lenguaje", "12", "El cómic", "¿Qué es una viñeta en un cómic?", [
        "Un tipo de globo de diálogo.",
        "Un recuadro que representa un momento de la historia.",
        "Un símbolo que indica movimiento.",
        "Un recurso tipográfico."
    ], 1),
    q("Lenguaje", "12", "El cómic", "¿Para qué se utilizan los globos o bocadillos en un cómic?", [
        "Para mostrar solo los pensamientos de los personajes.",
        "Para incluir el diálogo, pensamientos o narración.",
        "Para representar el movimiento.",
        "Para separar las viñetas."
    ], 1),
    q("Lenguaje", "30", "Diglosia", "La diglosia es:", [
        "Una situación de bilingüismo en la que las escuelas ofrecen educación en los dos idiomas.",
        "Una situación de bilingüismo en la que las personas manejan indistintamente las dos lenguas.",
        "Una situación de desfase entre lo que habla una persona y lo que dice la nación.",
        "Una situación de bilingüismo en la que una lengua es más prestigiosa que otra."
    ], 3),
    q("Lenguaje", "12", "El cómic", "¿Qué indican las figuras cinéticas en un cómic?", [
        "El estado de ánimo de los personajes.",
        "La trayectoria del movimiento de personajes u objetos.",
        "El tipo de letra utilizada.",
        "El tamaño de las viñetas."
    ], 1),
    q("Lenguaje", "12", "El cómic", "¿Cuál de estos es un recurso tipográfico común en cómics?", [
        "Las onomatopeyas.",
        "Las viñetas redondas.",
        "Las mayúsculas y negritas para dar énfasis.",
        "Los colores de fondo."
    ], 2),
    q("Lenguaje", "12", "El cómic", "¿Qué representan los símbolos como estrellas o bombillas en un cómic?", [
        "El escenario donde ocurre la acción.",
        "El estado de ánimo e ideas de los personajes.",
        "El nombre del autor.",
        "La velocidad del diálogo."
    ], 1),
    q("Lenguaje", "12", "El cómic", "¿Cómo se llama el elemento que enmarca las escenas en un cómic?", [
        "Bocadillo.",
        "Viñeta.",
        "Figuras cinéticas.",
        "Símbolo."
    ], 1),
    q("Lenguaje", "12", "El cómic", "Si un personaje en un cómic tiene líneas curvas alrededor de su cabeza, ¿qué podría indicar?", [
        "Que está corriendo.",
        "Que está hablando en voz alta.",
        "Que está sorprendido o mareado.",
        "Que es el villano de la historia."
    ], 2),
    q("Lenguaje", "12", "El cómic", "¿Qué función tienen las onomatopeyas en un cómic?", [
        "Describir el escenario.",
        "Representar sonidos de manera visual.",
        "Indicar el tiempo entre viñetas.",
        "Mostrar el nombre del personaje."
    ], 1),

    // Matemáticas: impresas
    q("Matemáticas", "3.6", "Punto medio", "El punto medio M de un segmento PQ:", [
        "Es la suma de las coordenadas de P y Q.",
        "Es la semisuma de las coordenadas A y B.",
        "Tienen distintas coordenadas P y Q.",
        "Es la semisuma de las coordenadas P y Q."
    ], 3),
    q("Matemáticas", "3.4", "Bisectriz", "La bisectriz de un ángulo dado un ángulo cualquiera es:", [
        "El lugar geométrico de los puntos que equidistan de las rectas que determinan el ángulo.",
        "El lugar donde el ángulo equidistan de las rectas.",
        "Es la distancia entre las rectas que determinan el ángulo.",
        "Todas las afirmaciones son correctas."
    ], 0),
    q("Matemáticas", "3.6", "Distancia", "Dado el punto A=(0,x), determina el valor de x de modo que la distancia de este al punto B=(5,7) sea de 13 unidades.", [
        "5", "13", "19", "-19"
    ], 2),
    q("Matemáticas", "2.3", "Vector libre", "Se conoce como vector libre aquel:", [
        "Conjunto formado por todos los vectores libres.",
        "Conjunto formado por todos los vectores fijos equipolentes a uno dado.",
        "Los vectores que tienen módulo, dirección y sentido.",
        "Todas las anteriores."
    ], 1),
    q("Matemáticas", "4.1", "Conceptos básicos estadística", "En todo estudio estadístico aparecen los siguientes conceptos básicos que son:", [
        "Población, materia, variable descriptiva.",
        "Estudio, población, media aritmética.",
        "Población, individuo, variable estadística.",
        "Población, número de casos, promedio."
    ], 2),
    q("Matemáticas", "4.1", "Variable cualitativa", "¿Cuál de los siguientes ejemplos corresponde a un caso de variable estadística cualitativa?", [
        "Número de hijos.",
        "Número de horas usando internet.",
        "Grado de satisfacción.",
        "Días de la semana."
    ], 2),
    q("Matemáticas", "4.1", "Muestra representativa", "¿Cuál es la condición necesaria para que el estudio estadístico sea fiable?", [
        "Que la muestra tenga pocos individuos.",
        "Que la muestra sea representativa del total de la población.",
        "Que todos los individuos respondan igual.",
        "Que se use únicamente muestreo estratificado."
    ], 1),
    q("Matemáticas", "4.4", "Percentiles", "Son los valores que dejan por debajo de un porcentaje determinado (k%) de datos cuando la distribución se divide en cien partes iguales. Se representan por Pk. ¿Cómo se denominan?", [
        "Percentiles", "Cuartiles", "Deciles", "Mediana"
    ], 0),
];

/* =========================
   LISTAS DEL TEMARIO (para preguntas “de lista”)
========================= */
const AUTORES_LISTA = [
    "Juan Rulfo", "Jorge Icaza", "José Martí", "Gabriel García Márquez", "Joaquín Gallegos Lara",
    "Demetrio Aguilera Malta", "Luis Martínez", "Alicia Yánez Cossío", "José de la Cuadra",
    "José Joaquín de Olmedo", "Dolores Veintimilla de Galindo", "Numa Pompilio Llona",
    "Julio Zaldumbide", "Juan Montalvo", "Miguel Riofrío"
];
const TEMAS_ULTIMO_EXAMEN = [
    "Tipos de argumentos",
    "Tipos de narrador: protagonista, omnisciente y testigo",
    "Uso del internet en los estudiantes",
    "Formas de presentación para un resumen",
    "Períodos históricos de la literatura ecuatoriana",
    "Importancia de Juan Montalvo en el periodismo",
    "Sinónimo de censor",
    "Aspecto positivo de un argumento",
    "Alumno de Olmedo",
    "Máximo exponente del modernismo literario"
];

/* =========================
   GENERADORES MASIVOS: cubren TODO el temario (1..5.5 / 1..31 / 1..21)
   (Se mantiene igual que el mensaje anterior pero ahora cada pregunta tiene "code" y "subtema")
========================= */

/* -------- Matemáticas -------- */
function genDerivadas() {
    const out = [];
    out.push(q("Matemáticas", "1.6", "Teorema fundamental del cálculo", "El teorema fundamental del cálculo relaciona principalmente:", [
        "Derivadas y límites", "Integrales y derivadas", "Vectores y rectas", "Matrices y determinantes"
    ], 1));

    out.push(q("Matemáticas", "1.1", "Optimización", "En optimización, un punto crítico se identifica cuando:", [
        "f(x)=0", "f'(x)=0 o no existe", "f''(x)=0 siempre", "x=0"
    ], 1));
    out.push(q("Matemáticas", "1.2", "Optimización", "Orden correcto para resolver un problema de optimización:", [
        "Derivar → interpretar → plantear → resolver",
        "Plantear modelo → derivar → hallar críticos → verificar → interpretar",
        "Resolver → derivar → plantear → interpretar",
        "Plantear → integrar → interpretar → derivar"
    ], 1));

    // 1.3 derivadas directas (constante/polinómica)
    for (const c of [-12, -7, -2, 5, 12, 20]) {
        const opts = shuffle([`${c}`, "1", "0", "x"]);
        out.push(q("Matemáticas", "1.3", "Derivadas directas", `La derivada de f(x) = ${c} es:`, opts, opts.indexOf("0")));
    }
    for (const a of [1, 2, 3, 4, 5, 6, 7, 8]) {
        for (const n of [2, 3, 4, 5, 6]) {
            const correct = `${a * n}x^${n - 1}`;
            const opts = unique4(correct, [`${a}x^${n - 1}`, `${a * n}x^${n}`, `${a * (n - 1)}x^${n - 2}`.replace("^0", "")]);
            out.push(q("Matemáticas", "1.3", "Derivadas directas", `Deriva: f(x) = ${a}x^${n}.`, opts, opts.indexOf(correct)));
        }
    }

    // 1.4 derivada en un punto
    for (const a of [1, 2, 3, 4]) {
        for (const b of [-4, -2, -1, 1, 2, 4]) {
            for (const x0 of [-2, -1, 0, 1, 2, 3]) {
                const val = 2 * a * x0 + b;
                const correct = `${val}`;
                const opts = unique4(correct, [`${val + 2}`, `${val - 2}`, `${val + 4}`]);
                out.push(q("Matemáticas", "1.4", "Derivada en un punto",
                    `Si f(x) = ${a}x^2 ${b >= 0 ? `+ ${b}x` : `- ${Math.abs(b)}x`}, entonces f'(${x0}) =`,
                    opts, opts.indexOf(correct)
                ));
            }
        }
    }

    // 1.5 conceptos derivados
    out.push(q("Matemáticas", "1.5", "Conceptos básicos", "Una derivada representa (en general):", [
        "El área bajo la curva",
        "La tasa de cambio instantánea",
        "La distancia entre puntos",
        "El promedio de datos"
    ], 1));
    return out;
}

function genVectores() {
    const out = [];
    out.push(q("Matemáticas", "2.1", "Vector fijo", "Un vector fijo se caracteriza por:", [
        "Solo magnitud",
        "Magnitud y dirección sin punto de aplicación",
        "Magnitud, dirección, sentido y punto de aplicación",
        "Solo sentido"
    ], 2));
    out.push(q("Matemáticas", "2.2", "Vectores equipolentes", "Vectores equipolentes son los que tienen:", [
        "Mismo origen", "Igual magnitud, dirección y sentido", "Igual magnitud únicamente", "Igual dirección únicamente"
    ], 1));
    out.push(q("Matemáticas", "2.3", "Vector libre", "Un vector libre es:", [
        "Cualquier vector con módulo",
        "El conjunto de vectores fijos equipolentes a uno dado",
        "Un vector sin dirección",
        "Un vector sin sentido"
    ], 1));

    // 2.4 componentes
    for (const ax of [-5, -3, -1, 2, 4, 6]) {
        for (const ay of [-4, -2, 1, 3, 5]) {
            const correct = `(${ax},${ay})`;
            const opts = unique4(correct, [`(${ay},${ax})`, `(${ax},${ay + 1})`, `(${ax - 1},${ay})`]);
            out.push(q("Matemáticas", "2.4", "Componentes de un vector", `Si a=(${ax},${ay}), sus componentes son:`, opts, opts.indexOf(correct)));
        }
    }
    // 2.5 operaciones (suma/resta)
    for (const ax of [-2, 1, 3]) {
        for (const ay of [-1, 2, 4]) {
            for (const bx of [1, 2, -3]) {
                for (const by of [0, 3, -2]) {
                    const sx = ax + bx, sy = ay + by;
                    const correct = `(${sx},${sy})`;
                    const opts = unique4(correct, [`(${sx + 1},${sy})`, `(${sx},${sy + 1})`, `(${sx - 1},${sy - 1})`]);
                    out.push(q("Matemáticas", "2.5", "Operaciones entre vectores", `Si a=(${ax},${ay}) y b=(${bx},${by}), a+b =`, opts, opts.indexOf(correct)));
                }
            }
        }
    }
    // 2.6 producto escalar/vectorial
    out.push(q("Matemáticas", "2.6", "Producto escalar", "El producto escalar a·b se usa para:", [
        "Hallar áreas siempre",
        "Relacionar magnitudes y el ángulo entre vectores",
        "Encontrar el punto medio",
        "Calcular varianza"
    ], 1));
    out.push(q("Matemáticas", "2.6", "Producto vectorial", "El producto vectorial (en 3D) produce:", [
        "Un escalar",
        "Un vector perpendicular al plano formado",
        "Siempre cero",
        "Una matriz"
    ], 1));

    // 2.7 punto medio / 2.8 vector director
    for (const x1 of [-4, 0, 2, 6]) {
        for (const y1 of [1, 3, -2]) {
            const x2 = x1 + 4, y2 = y1 - 2;
            const correct = `(${(x1 + x2) / 2},${(y1 + y2) / 2})`;
            const opts = unique4(correct, [`(${(x1 + x2) / 2 + 1},${(y1 + y2) / 2})`, `(${(x1 + x2) / 2},${(y1 + y2) / 2 + 1})`, `(${(x1 + x2) / 2 - 1},${(y1 + y2) / 2 - 1})`]);
            out.push(q("Matemáticas", "2.7", "Punto medio", `Punto medio entre P(${x1},${y1}) y Q(${x2},${y2}) es:`, opts, opts.indexOf(correct)));

            const vx = x2 - x1, vy = y2 - y1;
            const corr2 = `(${vx},${vy})`;
            const opt2 = unique4(corr2, [`(${vy},${vx})`, `(${vx + 1},${vy})`, `(${vx},${vy + 1})`]);
            out.push(q("Matemáticas", "2.8", "Vector director", `Un vector director de la recta que pasa por P(${x1},${y1}) y Q(${x2},${y2}) puede ser:`, opt2, opt2.indexOf(corr2)));
        }
    }
    return out;
}

function genPlano() {
    const out = [];
    out.push(q("Matemáticas", "3.2", "Ecuaciones de la recta", "Ecuación general de la recta:", [
        "y=mx+b", "Ax+By+C=0", "(x-h)^2+(y-k)^2=r^2", "y^2=4px"
    ], 1));
    out.push(q("Matemáticas", "3.9", "Rectas perpendiculares", "Dos rectas son perpendiculares si:", [
        "m1=m2", "m1·m2=-1", "m1+m2=0", "m1·m2=1"
    ], 1));
    out.push(q("Matemáticas", "3.5", "Mediatriz", "La mediatriz de un segmento es la recta que:", [
        "Pasa por un extremo y es paralela al segmento",
        "Es perpendicular al segmento y pasa por su punto medio",
        "Divide el segmento en tres partes iguales",
        "Tiene la misma pendiente que el segmento"
    ], 1));
    out.push(q("Matemáticas", "3.4", "Bisectriz", "La bisectriz de un ángulo es:", [
        "El lugar geométrico de puntos equidistantes de las rectas del ángulo",
        "La distancia entre las rectas",
        "Una recta paralela a ambos lados",
        "La suma de los lados"
    ], 0));

    // 3.6 distancia entre dos puntos (ejercicios)
    const triples = [[3, 4, 5], [6, 8, 10], [5, 12, 13]];
    for (const [dx, dy, d] of triples) {
        for (const x1 of [-2, 0, 3]) {
            const y1 = 1;
            const x2 = x1 + dx, y2 = y1 + dy;
            const correct = `${d}`;
            const opts = unique4(correct, [`${d + 2}`, `${d - 2}`, `${d + 4}`]);
            out.push(q("Matemáticas", "3.6", "Distancia entre dos puntos", `Distancia entre A(${x1},${y1}) y B(${x2},${y2}) es:`, opts, opts.indexOf(correct)));
        }
    }

    // 3.7 distancia punto-recta (concepto)
    out.push(q("Matemáticas", "3.7", "Distancia punto-recta", "La distancia de un punto a una recta representa:", [
        "La distancia mínima entre el punto y la recta",
        "La distancia máxima",
        "La pendiente",
        "El punto medio"
    ], 0));

    // 3.8 posición relativa rectas
    out.push(q("Matemáticas", "3.8", "Posición relativa de rectas", "Si dos rectas tienen la misma pendiente y distinta ordenada al origen, son:", [
        "Secantes", "Paralelas", "Perpendiculares", "Coincidentes"
    ], 1));
    out.push(q("Matemáticas", "3.8", "Posición relativa de rectas", "Si dos rectas tienen la misma pendiente y misma ordenada al origen, son:", [
        "Paralelas", "Secantes", "Coincidentes", "Perpendiculares"
    ], 2));

    // 3.3 paramétrica/vectorial
    out.push(q("Matemáticas", "3.3", "Recta paramétrica", "Forma paramétrica de una recta:", [
        "x=x0+at, y=y0+bt",
        "y=mx+b, z=0",
        "(x-h)^2+(y-k)^2=r^2",
        "Ax+By+C=0 y x=0"
    ], 0));
    return out;
}

function genEstadisticaProb() {
    const out = [];
    out.push(q("Matemáticas", "4.1", "Conceptos básicos", "La media es:", [
        "El valor más frecuente", "El promedio aritmético", "El valor central siempre", "El percentil 25"
    ], 1));
    out.push(q("Matemáticas", "4.1", "Conceptos básicos", "La moda es:", [
        "El valor más frecuente", "El promedio", "La mediana", "La varianza"
    ], 0));
    out.push(q("Matemáticas", "4.1", "Conceptos básicos", "La mediana es:", [
        "El valor central al ordenar", "El más frecuente", "Siempre el promedio", "El máximo"
    ], 0));

    out.push(q("Matemáticas", "4.2", "Clasificación", "La estadística descriptiva se enfoca en:", [
        "Resumir y presentar datos", "Predecir sin datos", "Resolver derivadas", "Resolver sistemas 3x3"
    ], 0));
    out.push(q("Matemáticas", "4.2", "Clasificación", "La estadística inferencial se enfoca en:", [
        "Inferir sobre una población desde una muestra",
        "Describir sin generalizar",
        "Calcular pendientes",
        "Calcular áreas siempre"
    ], 0));

    out.push(q("Matemáticas", "4.3", "Dispersión", "Una medida de dispersión es:", [
        "Varianza", "Moda", "Mediana", "Percentil"
    ], 0));

    out.push(q("Matemáticas", "4.4", "Medidas de posición", "Los cuartiles dividen la distribución en:", [
        "2 partes", "3 partes", "4 partes", "10 partes"
    ], 2));
    out.push(q("Matemáticas", "4.4", "Medidas de posición", "Los deciles dividen la distribución en:", [
        "10 partes", "4 partes", "100 partes", "5 partes"
    ], 0));
    out.push(q("Matemáticas", "4.4", "Medidas de posición", "Los percentiles dividen la distribución en:", [
        "10 partes", "100 partes", "4 partes", "2 partes"
    ], 1));

    out.push(q("Matemáticas", "4.5", "Tendencia central", "¿Qué medida es más sensible a valores extremos?", [
        "Media", "Moda", "Mediana", "Cuartil"
    ], 0));

    out.push(q("Matemáticas", "4.6", "Probabilidad condicionada", "P(A|B) significa:", [
        "P(A) + P(B)",
        "Probabilidad de A dado B",
        "Probabilidad de B dado A",
        "Probabilidad total"
    ], 1));

    out.push(q("Matemáticas", "4.7", "Teorema de Bayes", "Bayes se usa para:", [
        "Actualizar probabilidades con evidencia nueva",
        "Derivar funciones",
        "Calcular distancias",
        "Calcular percentiles"
    ], 0));

    out.push(q("Matemáticas", "4.8", "Probabilidad total", "El teorema de probabilidad total se aplica cuando:", [
        "Se tiene una partición de eventos y se quiere P(A)",
        "Se tiene una derivada",
        "Se tiene una recta",
        "Se tiene un vector"
    ], 0));

    out.push(q("Matemáticas", "4.9", "Probabilidad experimental", "Probabilidad experimental se obtiene con:", [
        "Frecuencia relativa en ensayos repetidos",
        "Axiomas sin experimentar",
        "Siempre 1/2",
        "Producto de medias"
    ], 0));

    out.push(q("Matemáticas", "4.10", "Probabilidad axiomática", "Se cumple que:", [
        "P(A) puede ser negativa",
        "0 ≤ P(A) ≤ 1",
        "P(Ω)=0",
        "P(A)=2 siempre"
    ], 1));
    return out;
}

function genSistemas() {
    const out = [];
    // 5.1 2 variables (muchas variaciones)
    for (const x of [-3, -2, -1, 0, 1, 2, 3]) {
        for (const y of [-3, -1, 2, 4]) {
            const a1 = 2, b1 = 3, c1 = a1 * x + b1 * y;
            const a2 = 1, b2 = -2, c2 = a2 * x + b2 * y;
            const correct = `(${x},${y})`;
            const opts = unique4(correct, [`(${x + 1},${y})`, `(${x},${y + 1})`, `(${x - 1},${y - 1})`]);
            out.push(q("Matemáticas", "5.1", "Sistemas 2 variables",
                `Resuelve el sistema:\n(1) ${a1}x + ${b1}y = ${c1}\n(2) ${a2}x - 2y = ${c2}\nLa solución (x,y) es:`,
                opts, opts.indexOf(correct)
            ));
        }
    }

    out.push(q("Matemáticas", "5.2", "Sistemas 3 variables", "Un sistema 3×3 puede tener:", [
        "Una solución, infinitas o ninguna",
        "Solo una solución siempre",
        "Nunca tiene solución",
        "Solo infinitas soluciones"
    ], 0));

    out.push(q("Matemáticas", "5.3", "Sistemas por gráfica", "Si dos rectas se cruzan en un punto, el sistema tiene:", [
        "Ninguna solución", "Una única solución", "Infinitas soluciones", "Dos soluciones"
    ], 1));

    out.push(q("Matemáticas", "5.4", "Tipos de solución", "Un sistema incompatible es aquel que tiene:", [
        "Una solución", "Infinitas soluciones", "Ninguna solución", "Dos soluciones"
    ], 2));
    out.push(q("Matemáticas", "5.4", "Tipos de solución", "Un sistema compatible indeterminado tiene:", [
        "Una solución", "Infinitas soluciones", "Ninguna solución", "Siempre dos soluciones"
    ], 1));

    out.push(q("Matemáticas", "5.5", "Características según solución", "Si dos ecuaciones representan la MISMA recta, el sistema es:", [
        "Compatible determinado", "Compatible indeterminado", "Incompatible", "No clasificable"
    ], 1));
    return out;
}

/* -------- Lenguaje (1..31) -------- */
function genLenguaje() {
    const out = [];
    // 1
    out.push(q("Lenguaje", "1", "Homonimia", "Homonimia: palabras que:", [
        "Tienen significados relacionados (polisemia)",
        "Suenan o se escriben igual pero significan distinto",
        "Son préstamos de otro idioma",
        "Son abreviaturas"
    ], 1));
    out.push(q("Lenguaje", "1", "Polisemia", "Polisemia: una palabra que:", [
        "Tiene varios significados relacionados",
        "Tiene un solo significado",
        "Se escribe distinto pero suena igual",
        "No existe en el diccionario"
    ], 0));
    out.push(q("Lenguaje", "1", "Paronimia", "Paronimia: palabras que:", [
        "Se parecen en escritura o pronunciación pero significan distinto",
        "Se escriben igual y significan lo mismo",
        "Son extranjerismos",
        "No se pueden usar"
    ], 0));
    // 2
    out.push(q("Lenguaje", "2", "Ensayo argumentativo", "Un ensayo argumentativo se sostiene en:", [
        "Tesis + argumentos", "Solo descripción", "Solo diálogo", "Solo enumeraciones sin postura"
    ], 0));
    // 3
    out.push(q("Lenguaje", "3", "Texto expositivo", "El texto expositivo busca:", [
        "Convencer", "Informar y explicar", "Crear suspenso", "Narrar ficción"
    ], 1));
    // 4
    out.push(q("Lenguaje", "4", "Género épico", "El género épico se caracteriza por:", [
        "Yo lírico subjetivo", "Narración de hechos y acciones", "Diálogo teatral", "Instrucciones"
    ], 1));
    // 5
    out.push(q("Lenguaje", "5", "Resumen", "En un resumen, lo correcto es:", [
        "Copiar párrafos completos",
        "Mantener idea principal y secundarias sin opiniones personales",
        "Agregar info que no aparece",
        "Cambiar el sentido"
    ], 1));
    // 6
    out.push(q("Lenguaje", "6", "Entrevista", "Una entrevista se caracteriza por:", [
        "Ser siempre ficticia",
        "Diálogo de preguntas y respuestas",
        "Ser un poema",
        "Ser una ecuación"
    ], 1));
    // 7
    out.push(q("Lenguaje", "7", "Neologismos y préstamos", "Un neologismo es:", [
        "Una palabra antigua",
        "Una palabra nueva incorporada al idioma",
        "Un error ortográfico",
        "Una palabra prohibida"
    ], 1));
    out.push(q("Lenguaje", "7", "Extranjerismos", "Un extranjerismo es:", [
        "Una palabra tomada de otro idioma",
        "Un sinónimo",
        "Un prefijo",
        "Un tipo de rima"
    ], 0));
    // 8 (internet/publicidad/referencias)
    out.push(q("Lenguaje", "8", "Internet", "Una fuente confiable para una investigación suele tener:", [
        "Sin autor ni fecha",
        "Autor, fecha y referencias",
        "Solo memes",
        "Solo comentarios"
    ], 1));
    out.push(q("Lenguaje", "8", "Textos publicitarios", "Un texto publicitario busca:", [
        "Persuadir", "Resolver ecuaciones", "Explicar derivadas", "Hacer un poema"
    ], 0));
    out.push(q("Lenguaje", "8", "Referencias bibliográficas", "Una referencia bibliográfica sirve para:", [
        "Ocultar la fuente", "Citar y ubicar la fuente usada", "Cambiar el tema", "Aumentar páginas"
    ], 1));
    // 9
    out.push(q("Lenguaje", "9", "Crónica", "La crónica se distingue por:", [
        "Ser siempre fantástica",
        "Relatar hechos con orden y mirada del cronista",
        "Ser una receta",
        "Ser solo poesía"
    ], 1));
    // 10
    out.push(q("Lenguaje", "10", "Prefijos y sufijos", "Prefijo y sufijo:", [
        "Ambos van al final",
        "Prefijo al inicio; sufijo al final",
        "Prefijo es una oración",
        "Sufijo va al inicio"
    ], 1));
    // 11
    out.push(q("Lenguaje", "11", "Bibliografía", "La bibliografía sirve para:", [
        "Listar fuentes consultadas",
        "Evitar citar",
        "Poner solo opiniones",
        "Repetir el texto"
    ], 0));
    // 12 cómic (ya en FIXED también)
    out.push(q("Lenguaje", "12", "El cómic", "Una onomatopeya es:", [
        "Una palabra que imita un sonido",
        "Una viñeta",
        "Una referencia",
        "Un prefijo"
    ], 0));
    // 13
    out.push(q("Lenguaje", "13", "Monografía", "La “lluvia de ideas” se usa para:", [
        "Generar ideas sin juzgarlas al inicio",
        "Eliminar ideas antes de empezar",
        "Copiar internet",
        "Reducir todo a una palabra"
    ], 0));
    // 14
    out.push(q("Lenguaje", "14", "Libro electrónico", "Un libro electrónico es:", [
        "Un formato digital (PDF/ePub)",
        "Solo audio",
        "Solo papel",
        "Un chat"
    ], 0));
    // 15 autores: preguntas “de lista”
    const distract = ["Pablo Neruda", "Cervantes", "Borges", "Isabel Allende", "Octavio Paz", "Mario Vargas Llosa"];
    for (let i = 0; i < 40; i++) {
        const correct = AUTORES_LISTA[i % AUTORES_LISTA.length];
        const w1 = distract[(i + 1) % distract.length];
        const w2 = distract[(i + 2) % distract.length];
        const w3 = distract[(i + 3) % distract.length];
        const opts = shuffle([correct, w1, w2, w3]);
        out.push(q("Lenguaje", "15", "Autores (lista)", "¿Cuál de estos autores está en la lista de “autores que debes estudiar”?", opts, opts.indexOf(correct)));
    }
    // 16
    out.push(q("Lenguaje", "16", "Falacias", "Una falacia es:", [
        "Un razonamiento incorrecto que parece correcto",
        "Una prueba matemática",
        "Una cita textual",
        "Un dato experimental"
    ], 0));
    // 17
    out.push(q("Lenguaje", "17", "Debate", "El moderador en un debate:", [
        "Impone su opinión",
        "Ordena turnos y mantiene reglas/tiempos",
        "Responde por todos",
        "Cambia el tema al azar"
    ], 1));
    // 18
    out.push(q("Lenguaje", "18", "Blog", "Un blog es:", [
        "Un espacio web con entradas periódicas",
        "Un diccionario impreso",
        "Una hoja de cálculo",
        "Una llamada telefónica"
    ], 0));
    // 19 metaplasmos (clasificación general)
    out.push(q("Lenguaje", "19", "Metaplasmos", "Los metaplasmos son cambios en la palabra por:", [
        "Adición, supresión, permutación o sustitución",
        "Solo traducción",
        "Solo rima",
        "Solo puntuación"
    ], 0));
    // 20 diversidad lingüística
    out.push(q("Lenguaje", "20", "Diversidad lingüística", "La diversidad lingüística se refiere a:", [
        "Una sola lengua",
        "Coexistencia de lenguas/variedades",
        "Solo ortografía",
        "Solo poesía"
    ], 1));
    // 21 declamación
    out.push(q("Lenguaje", "21", "Declamación", "La declamación es:", [
        "Lectura expresiva cuidando voz y entonación",
        "Un resumen numérico",
        "Una ecuación",
        "Un dibujo"
    ], 0));
    // 22/23
    out.push(q("Lenguaje", "22", "Generación de los 30", "En literatura, una “generación” suele ser:", [
        "Grupo de autores con época y rasgos comunes",
        "Una fórmula matemática",
        "Una ley física",
        "Un tipo de vector"
    ], 0));
    out.push(q("Lenguaje", "23", "Generación decapitada", "La “Generación decapitada” se estudia como:", [
        "Una agrupación literaria",
        "Una ley de Newton",
        "Una operación vectorial",
        "Un teorema de probabilidad"
    ], 0));
    // 24 variedades
    out.push(q("Lenguaje", "24", "Variedades lingüísticas", "Las variedades diafásicas dependen de:", [
        "La situación comunicativa (registro)",
        "La región geográfica",
        "La clase social únicamente",
        "El clima"
    ], 0));
    out.push(q("Lenguaje", "24", "Variedades lingüísticas", "Las variedades diastráticas dependen de:", [
        "El grupo social",
        "Solo la región",
        "Solo la edad",
        "Solo el ruido"
    ], 0));
    out.push(q("Lenguaje", "24", "Variedades lingüísticas", "Las variedades diatópicas dependen de:", [
        "La región geográfica",
        "El registro formal",
        "El género literario",
        "La velocidad"
    ], 0));
    // 25
    out.push(q("Lenguaje", "25", "Contraargumentos", "Un contraargumento es:", [
        "Una idea que apoya la tesis",
        "Una objeción o respuesta a un argumento previo",
        "Un sinónimo",
        "Un tipo de viñeta"
    ], 1));
    // 26
    out.push(q("Lenguaje", "26", "Diccionarios electrónicos", "Un limitante de un diccionario electrónico puede ser:", [
        "No siempre ofrece contexto completo de uso",
        "No puede contener palabras",
        "Solo funciona en papel",
        "No se actualiza jamás"
    ], 0));
    // 27
    out.push(q("Lenguaje", "27", "Análisis de poema", "En el análisis de un poema se suele identificar:", [
        "Tema, tono, figuras literarias y estructura",
        "Solo precio del libro",
        "Solo fecha del autor",
        "Solo números"
    ], 0));
    // 28
    out.push(q("Lenguaje", "28", "Mapa conceptual", "Un mapa conceptual sirve para:", [
        "Organizar y relacionar conceptos con conectores",
        "Resolver integrales",
        "Calcular fuerzas",
        "Medir distancias"
    ], 0));
    // 29
    out.push(q("Lenguaje", "29", "Conversatorio", "Un conversatorio es:", [
        "Diálogo grupal para discutir un tema",
        "Un examen de opción múltiple",
        "Una ecuación",
        "Un texto publicitario"
    ], 0));
    // 30 diglosia causas / ejemplo Ecuador
    out.push(q("Lenguaje", "30", "Diglosia", "Una causa común de diglosia es:", [
        "Desigual prestigio social entre lenguas",
        "Que todas las lenguas valen lo mismo socialmente",
        "Que nadie aprende idiomas",
        "Que solo hay una lengua"
    ], 0));
    out.push(q("Lenguaje", "30", "Diglosia", "El ejemplo de diglosia en Ecuador en el temario es:", [
        "Quechua y español",
        "Inglés y francés",
        "Portugués y alemán",
        "Japonés y chino"
    ], 0));
    // 31 temas último examen
    const falsos = ["Ecuaciones diferenciales", "Estructura del átomo", "Fotosíntesis", "Geometría esférica", "Tabla periódica"];
    for (let i = 0; i < 20; i++) {
        const correct = TEMAS_ULTIMO_EXAMEN[i % TEMAS_ULTIMO_EXAMEN.length];
        const w1 = falsos[(i + 1) % falsos.length];
        const w2 = falsos[(i + 2) % falsos.length];
        const w3 = falsos[(i + 3) % falsos.length];
        const opts = shuffle([correct, w1, w2, w3]);
        out.push(q("Lenguaje", "31", "Temas del último examen", "¿Cuál de estos aparece como “tema del último examen” en el temario?", opts, opts.indexOf(correct)));
    }
    return out;
}

/* -------- Física (1..21) -------- */
function genFisica() {
    const out = [];
    // 1-3 Newton
    out.push(q("Física", "1", "Primera ley Newton", "Primera ley de Newton (inercia):", [
        "F=ma",
        "A toda acción corresponde una reacción",
        "Si la fuerza neta es cero, mantiene reposo o MRU",
        "La energía interna siempre aumenta"
    ], 2));
    out.push(q("Física", "2", "Segunda ley Newton", "Segunda ley de Newton:", [
        "F=ma", "v=d/t", "W=F·d", "p=m·v"
    ], 0));
    out.push(q("Física", "3", "Tercera ley Newton", "Tercera ley de Newton:", [
        "Todo cuerpo cae igual",
        "A toda acción corresponde una reacción igual y opuesta",
        "La aceleración siempre es cero",
        "La fuerza depende del área"
    ], 1));
    // 4 movimiento
    out.push(q("Física", "4", "Movimiento", "Desplazamiento es:", [
        "Distancia total recorrida",
        "Cambio de posición (vector) entre inicio y fin",
        "Rapidez",
        "Tiempo total"
    ], 1));
    // 5 velocidad
    out.push(q("Física", "5", "Velocidad", "Velocidad media se define como:", [
        "Distancia/tiempo siempre",
        "Desplazamiento/tiempo",
        "Aceleración/tiempo",
        "Fuerza/masa"
    ], 1));
    // 6 fuerzas
    out.push(q("Física", "6", "Fuerzas", "La fuerza normal es:", [
        "La fuerza perpendicular que ejerce una superficie",
        "La fuerza gravitatoria siempre",
        "La fuerza eléctrica",
        "La fuerza de un motor"
    ], 0));
    // 7 peso (varias)
    for (const m of [2, 5, 10, 15, 20]) {
        const g = 9.8;
        const p = (m * g).toFixed(1);
        const correct = `${p} N`;
        const opts = unique4(correct, [`${(m * 10).toFixed(1)} N`, `${(m * 9).toFixed(1)} N`, `${(m * 9.8 + 9.8).toFixed(1)} N`]);
        out.push(q("Física", "7", "Peso", `El peso de un cuerpo de masa ${m} kg (g≈9.8 m/s²) es:`, opts, opts.indexOf(correct)));
    }
    // 8 MRU/MRUV/MCU
    out.push(q("Física", "8", "MRU/MRUV/MCU", "En MRU se cumple:", [
        "Velocidad constante y aceleración cero",
        "Aceleración constante distinta de cero",
        "Trayectoria circular siempre",
        "Velocidad siempre cero"
    ], 0));
    out.push(q("Física", "8", "MRU/MRUV/MCU", "En MRUV se cumple:", [
        "Aceleración constante",
        "Aceleración cero siempre",
        "Velocidad constante",
        "No existe el tiempo"
    ], 0));
    out.push(q("Física", "8", "MRU/MRUV/MCU", "En MCU la rapidez suele ser:", [
        "Constante (si es MCU)",
        "Siempre cero",
        "Siempre infinita",
        "Siempre negativa"
    ], 0));
    // MRUV ejercicios
    for (const v0 of [0, 3, 6, 9, 12]) {
        for (const a of [-2, -1, 1, 2, 3]) {
            for (const t of [1, 2, 3, 4, 5, 6, 7]) {
                const v = v0 + a * t;
                const correct = `${v} m/s`;
                const opts = unique4(correct, [`${v + 1} m/s`, `${v - 1} m/s`, `${v + 2} m/s`]);
                out.push(q("Física", "8", "MRUV", `MRUV: v0=${v0} m/s, a=${a} m/s², t=${t} s. v =`, opts, opts.indexOf(correct)));
            }
        }
    }
    // 9 Hooke
    for (const k of [50, 100, 200, 300]) {
        for (const x of [0.04, 0.06, 0.08, 0.10, 0.12]) {
            const F = (k * x).toFixed(2);
            const correct = `${F} N`;
            const opts = unique4(correct, [`${(k * (x + 0.01)).toFixed(2)} N`, `${(k * (x - 0.01)).toFixed(2)} N`, `${(Number(F) + 5).toFixed(2)} N`]);
            out.push(q("Física", "9", "Ley de Hooke", `Si k=${k} N/m y x=${x.toFixed(2)} m, la fuerza elástica |F| es:`, opts, opts.indexOf(correct)));
        }
    }
    // 10 gravitación / 13 gravitación universal
    out.push(q("Física", "10", "Fuerza gravitatoria", "La fuerza gravitatoria entre dos masas:", [
        "Aumenta si aumenta la distancia",
        "Disminuye si aumenta la distancia",
        "No depende de la distancia",
        "Solo existe en el agua"
    ], 1));
    out.push(q("Física", "13", "Gravitación universal", "La ley de gravitación universal involucra:", [
        "Masas y distancia entre ellas",
        "Cargas eléctricas solamente",
        "Temperatura y presión",
        "Solo velocidad"
    ], 0));
    // 11 modelos del universo
    out.push(q("Física", "11", "Modelos del universo", "Un “modelo del universo” es:", [
        "Explicación científica sobre estructura y evolución del universo",
        "Regla de ortografía",
        "Tipo de vector",
        "Sinónimo"
    ], 0));
    // 12 campo eléctrico / 15 Coulomb
    out.push(q("Física", "12", "Campo eléctrico", "El campo eléctrico se asocia a:", [
        "Cargas eléctricas",
        "Solo masas",
        "Solo calor",
        "Sonido"
    ], 0));
    out.push(q("Física", "15", "Ley de Coulomb", "La ley de Coulomb describe la fuerza entre:", [
        "Masas", "Cargas eléctricas", "Resortes", "Ondas sonoras"
    ], 1));
    out.push(q("Física", "15", "Fuerza eléctrica", "Si dos cargas tienen el mismo signo, la fuerza eléctrica es:", [
        "Atracción", "Repulsión", "No existe", "Siempre gravedad"
    ], 1));
    // 14 planetas/satélites (conceptual)
    out.push(q("Física", "14", "Planetas y satélites", "En movimientos orbitales, una idea clave es:", [
        "Interacción gravitatoria central",
        "No existe gravedad",
        "No hay aceleración",
        "La masa no importa nunca"
    ], 0));
    // 16 Faraday/Lenz/Maxwell
    out.push(q("Física", "16", "Faraday", "La ley de Faraday relaciona inducción con:", [
        "Cambio de flujo magnético", "Cambio de masa", "Cambio de distancia", "Cambio de presión"
    ], 0));
    out.push(q("Física", "16", "Lenz", "La ley de Lenz indica que la corriente inducida:", [
        "Se opone a la causa que la produce",
        "Siempre va a favor del cambio",
        "No depende del campo magnético",
        "Solo aparece en el vacío"
    ], 0));
    out.push(q("Física", "16", "Maxwell", "Las ecuaciones de Maxwell describen:", [
        "Electromagnetismo (campos E y B)",
        "Solo gravedad", "Solo mecánica", "Solo termodinámica"
    ], 0));
    // calor/temperatura/transferencia
    out.push(q("Física", "14", "Calor", "El calor es:", [
        "Energía en tránsito por diferencia de temperatura",
        "La masa de un cuerpo",
        "La fuerza de gravedad",
        "La velocidad"
    ], 0));
    out.push(q("Física", "14", "Transferencia de calor", "Formas de transferencia de calor:", [
        "Conducción, convección y radiación",
        "Solo radiación",
        "Solo conducción",
        "Derivación e integración"
    ], 0));
    // 15 campo magnético
    out.push(q("Física", "15", "Campo magnético", "El campo magnético se asocia típicamente con:", [
        "Imanes y corrientes eléctricas",
        "Solo temperatura",
        "Solo masa",
        "Solo sonido"
    ], 0));
    // 16 energía interna
    out.push(q("Física", "16", "Energía interna", "Energía interna está relacionada con:", [
        "Energía microscópica total del sistema",
        "Solo energía cinética macroscópica",
        "Solo gravedad",
        "Solo electricidad"
    ], 0));
    // 17 entropía
    out.push(q("Física", "17", "Entropía", "Entropía se asocia con:", [
        "Desorden/irreversibilidad",
        "Cantidad de masa",
        "Voltaje",
        "Pendiente"
    ], 0));
    // 18 primer principio
    out.push(q("Física", "18", "Primer principio termodinámica", "Primer principio se relaciona con:", [
        "Conservación de energía (calor, trabajo, energía interna)",
        "Solo entropía",
        "Solo gravedad",
        "Solo electricidad"
    ], 0));
    // 19 energía (concepto)
    out.push(q("Física", "19", "Energía", "La energía es:", [
        "Capacidad de realizar trabajo o producir cambios",
        "Una fuerza",
        "Una velocidad",
        "Un vector sin magnitud"
    ], 0));
    // 20 Joule
    out.push(q("Física", "20", "Efecto Joule", "Efecto Joule se refiere a:", [
        "Calentamiento por corriente eléctrica en un conductor",
        "Atracción gravitatoria",
        "Reflexión de la luz",
        "Movimiento circular"
    ], 0));
    // 21 segundo principio
    out.push(q("Física", "21", "Segundo principio termodinámica", "Segundo principio indica que:", [
        "No es posible una máquina térmica 100% eficiente",
        "La energía se destruye",
        "El calor fluye de frío a caliente espontáneamente",
        "La masa aumenta con el tiempo"
    ], 0));
    return out;
}

/* -------- Nuevos Temas -------- */
function genMatematicasNuevas() {
    const out = [];
    // Propiedades de los números reales
    out.push(q("Matemáticas", "N1", "Propiedades de los números reales", "La propiedad que establece que a + b = b + a se conoce como:", [
        "Propiedad asociativa",
        "Propiedad conmutativa",
        "Propiedad distributiva",
        "Elemento neutro"
    ], 1));
    out.push(q("Matemáticas", "N1", "Propiedades de los números reales", "La propiedad que establece que a(b + c) = ab + ac se llama:", [
        "Propiedad conmutativa",
        "Propiedad distributiva",
        "Propiedad asociativa",
        "Inverso multiplicativo"
    ], 1));
    out.push(q("Matemáticas", "N1", "Propiedades de los números reales", "El elemento neutro de la suma en los números reales es:", [
        "1", "0", "-1", "Ninguno"
    ], 1));

    // Función de variable real
    out.push(q("Matemáticas", "N2", "Función de variable real", "El conjunto de todos los valores posibles de entrada (x) para los cuales la función está definida se llama:", [
        "Rango", "Codominio", "Dominio", "Imagen"
    ], 2));
    out.push(q("Matemáticas", "N2", "Función de variable real", "El conjunto de todos los valores de salida (y) de una función se llama:", [
        "Dominio", "Rango o Imagen", "Abscisa", "Ordenada al origen"
    ], 1));

    // Matrices
    out.push(q("Matemáticas", "N3", "Matrices", "¿Qué es una matriz en matemáticas?", [
        "Un arreglo bidimensional de números ordenados en filas y columnas",
        "Un número real positivo",
        "Una función polinómica de tercer grado",
        "Un tipo de vector unidimensional"
    ], 0));
    out.push(q("Matemáticas", "N3", "Matrices", "Para poder sumar dos matrices, estas deben cumplir que:", [
        "Tengan el mismo número de filas y columnas (mismo orden)",
        "El número de columnas de la primera sea igual al de filas de la segunda",
        "Tengan determinante distinto de cero",
        "Ambas sean matrices cuadradas"
    ], 0));
    out.push(q("Matemáticas", "N3", "Matrices", "El determinante solo se puede calcular en matrices:", [
        "Rectangulares",
        "Cuadradas",
        "Fila",
        "Nulas"
    ], 1));

    // Inecuaciones
    out.push(q("Matemáticas", "N4", "Inecuaciones", "Al multiplicar o dividir ambos lados de una inecuación por un número negativo:", [
        "La inecuación no cambia",
        "Se invierte el sentido de la desigualdad",
        "La inecuación se convierte en igualdad",
        "Se elimina el número negativo"
    ], 1));
    out.push(q("Matemáticas", "N4", "Inecuaciones", "La solución de una inecuación lineal con una incógnita se representa generalmente como:", [
        "Un solo punto",
        "Un intervalo en la recta real",
        "Una matriz",
        "Un plano"
    ], 1));

    // Productos notables
    out.push(q("Matemáticas", "N5", "Productos notables", "El desarrollo del binomio al cuadrado (a + b)² es:", [
        "a² + b²",
        "a² + ab + b²",
        "a² + 2ab + b²",
        "a² - 2ab + b²"
    ], 2));
    out.push(q("Matemáticas", "N5", "Productos notables", "La expresión (a - b)(a + b) es el desarrollo de un producto notable conocido como:", [
        "Trinomio cuadrado perfecto",
        "Diferencia de cuadrados (a² - b²)",
        "Cubo de un binomio",
        "Suma de cubos"
    ], 1));
    return out;
}

function genLenguajeNuevas() {
    const out = [];
    // Ortografía
    out.push(q("Lenguaje", "N1", "Ortografía", "Las palabras agudas llevan tilde cuando:", [
        "Terminan en vocal, n o s",
        "Terminan en cualquier consonante menos n o s",
        "Siempre llevan tilde",
        "Terminan en vocal únicamente"
    ], 0));
    out.push(q("Lenguaje", "N1", "Ortografía", "Las palabras graves (o llanas) llevan tilde cuando:", [
        "Terminan en vocal, n o s",
        "Terminan en consonante que no sea n ni s",
        "Son excepcionales y siempre la llevan",
        "Tienen más de tres sílabas"
    ], 1));
    out.push(q("Lenguaje", "N1", "Ortografía", "Las palabras esdrújulas:", [
        "Llevan tilde solo si terminan en n o s",
        "Llevan tilde siempre",
        "Nunca llevan tilde",
        "Llevan tilde si son cortas"
    ], 1));

    // Obras literarias
    out.push(q("Lenguaje", "N2", "Obras literarias", "¿Qué es una obra literaria?", [
        "Un documento técnico sobre alguna ciencia",
        "Una creación artística expresada mediante el uso de la palabra",
        "Un manual de instrucciones de uso",
        "Un escrito meramente publicitario"
    ], 1));

    // Géneros literarios (son 3)
    out.push(q("Lenguaje", "N3", "Géneros literarios", "Los tres grandes géneros literarios clásicos son:", [
        "Novela, cuento y fábula",
        "Épico (o narrativo), lírico y dramático",
        "Comedia, tragedia y drama",
        "Noticia, crónica y reportaje"
    ], 1));
    out.push(q("Lenguaje", "N3", "Géneros literarios", "El género lírico se caracteriza principalmente por:", [
        "La narración de hazañas de héroes",
        "La representación en un escenario",
        "La expresión de sentimientos y emociones subjetivas",
        "La argumentación de ideas políticas"
    ], 2));
    out.push(q("Lenguaje", "N3", "Géneros literarios", "El género dramático está destinado a:", [
        "Ser cantado en coros",
        "Ser representado ante un público",
        "Ser leído en silencio",
        "Informar hechos reales"
    ], 1));

    // Tipos de versos
    out.push(q("Lenguaje", "N4", "Tipos de versos", "Según su medida, los versos se clasifican en:", [
        "Largos y cortos",
        "De arte menor (hasta 8 sílabas) y de arte mayor (9 o más)",
        "Rítmicos y arrítmicos",
        "De rima consonante y asonante"
    ], 1));

    // Partes de poema
    out.push(q("Lenguaje", "N5", "Partes de poema", "Un conjunto de versos agrupados según una medida y rima se denomina:", [
        "Párrafo", "Oración", "Estrofa", "Prosa"
    ], 2));

    // Elementos de la comunicación
    out.push(q("Lenguaje", "N6", "Elementos de la comunicación", "En el proceso de comunicación, el encargado de enviar el mensaje es el:", [
        "Receptor", "Canal", "Emisor", "Código"
    ], 2));
    out.push(q("Lenguaje", "N6", "Elementos de la comunicación", "El medio físico por el cual viaja el mensaje desde el emisor al receptor es el:", [
        "Código", "Canal", "Contexto", "Propósito"
    ], 1));
    out.push(q("Lenguaje", "N6", "Elementos de la comunicación", "El conjunto de signos y reglas que permiten formular el mensaje se llama:", [
        "Código", "Canal", "Referente", "Emisor"
    ], 0));

    // Tipos de textos
    out.push(q("Lenguaje", "N7", "Tipos de textos", "Un texto argumentativo tiene como propósito principal:", [
        "Relatar una serie de acciones",
        "Persuadir o convencer al receptor sobre una idea o tesis",
        "Describir las características de un objeto",
        "Explicar objetivamente un tema"
    ], 1));
    out.push(q("Lenguaje", "N7", "Tipos de textos", "Un texto descriptivo busca:", [
        "Presentar razones para defender una postura",
        "Contar una historia de personajes",
        "Mencionar las características de personas, animales o cosas",
        "Dar instrucciones a seguir"
    ], 2));
    return out;
}

function genFisicaNuevas() {
    const out = [];
    // Desplazamiento y distancia recorrida
    out.push(q("Física", "N1", "Desplazamiento y distancia", "La distancia es una magnitud:", [
        "Vectorial, depende de la dirección",
        "Escalar, es la longitud total de la trayectoria recorrida",
        "Que siempre es igual a cero",
        "Que puede ser negativa"
    ], 1));
    out.push(q("Física", "N1", "Desplazamiento y distancia", "El desplazamiento difiere de la distancia recorrida porque:", [
        "El desplazamiento es un vector que une el punto inicial con el final",
        "El desplazamiento siempre es mayor que la distancia",
        "El desplazamiento se mide en segundos",
        "No difieren, son exactamente lo mismo en cualquier caso"
    ], 0));

    // Trayectoria, posición
    out.push(q("Física", "N2", "Trayectoria y posición", "La trayectoria de un móvil es:", [
        "La velocidad con la que se mueve",
        "El vector que va del final al inicio",
        "La línea imaginaria que describe un cuerpo en su movimiento",
        "El tiempo que tarda en llegar"
    ], 2));
    out.push(q("Física", "N2", "Trayectoria y posición", "El vector posición determina:", [
        "La velocidad instantánea del objeto",
        "La ubicación de una partícula en el espacio con respecto a un origen de coordenadas",
        "El tipo de trayectoria que seguirá",
        "La aceleración de un objeto"
    ], 1));

    // Energía
    out.push(q("Física", "N3", "Energía", "La energía asociada al movimiento de un cuerpo es:", [
        "Energía potencial gravitatoria",
        "Energía térmica",
        "Energía cinética",
        "Energía elástica"
    ], 2));
    out.push(q("Física", "N3", "Energía", "La energía potencial gravitatoria depende principalmente de:", [
        "La velocidad del objeto",
        "La altura del objeto respecto a un nivel de referencia",
        "El tiempo del movimiento",
        "La temperatura del entorno"
    ], 1));

    // Fuerza como vector
    out.push(q("Física", "N4", "Fuerza como vector", "Como magnitud vectorial, toda fuerza debe tener:", [
        "Solo un valor numérico y unidad",
        "Módulo (magnitud), dirección, sentido y punto de aplicación",
        "Masa y aceleración",
        "Únicamente sentido"
    ], 1));

    // Sistemas de referencia
    out.push(q("Física", "N5", "Sistemas de referencia", "Un sistema de referencia inercial es aquel en el que:", [
        "Se cumple la primera ley de Newton (está en reposo o MRU)",
        "El sistema siempre tiene aceleración constante y distinta de cero",
        "La gravedad no existe",
        "No se puede usar en la Tierra"
    ], 0));
    out.push(q("Física", "N5", "Sistemas de referencia", "Un sistema de referencia es necesario para:", [
        "Calcular la masa de un objeto",
        "Describir la posición y movimiento de un objeto",
        "Eliminar la fricción",
        "Determinar su temperatura"
    ], 1));

    // Rapidez en el cambio de posición
    out.push(q("Física", "N6", "Rapidez en el cambio de posición", "La rapidez representa:", [
        "El vector cambio de velocidad respecto al tiempo",
        "El módulo o valor numérico de la velocidad (una magnitud escalar)",
        "El desplazamiento total dividido para el tiempo",
        "Una fuerza centrípeta"
    ], 1));
    return out;
}

/* =========================
   CONSTRUIR BANCO TOTAL (SIN LÍMITE)
========================= */
function buildFullBank() {
    const bank = [];
    bank.push(...FIXED);
    bank.push(...genDerivadas());
    bank.push(...genVectores());
    bank.push(...genPlano());
    bank.push(...genEstadisticaProb());
    bank.push(...genSistemas());
    bank.push(...genLenguaje());
    bank.push(...genFisica());
    bank.push(...genMatematicasNuevas());
    bank.push(...genLenguajeNuevas());
    bank.push(...genFisicaNuevas());

    // Quitar duplicados exactos
    const seen = new Set();
    const uniq = [];
    for (const item of bank) {
        const key = item.topic + "|" + item.code + "|" + item.subtema + "|" + item.text + "|" + item.options.join("||") + "|" + item.correct;
        if (!seen.has(key)) {
            seen.add(key);
            uniq.push(item);
        }
    }
    return uniq;
}

/* -------- Banco P-Z -------- */
function genPZQuimica() {
    const out = [];
    out.push(q("Química", "PZ-1", "Calor específico", "El calor específico de una sustancia es:", [
        "La temperatura a la cual la sustancia cambia de estado",
        "El cantidad total de calor en un cuerpo",
        "La cantidad de calor necesaria para elevar 1°C la temperatura de 1 gramo de masa",
        "La capacidad de conducir calor circularmente"
    ], 2));
    out.push(q("Química", "PZ-1", "Calor específico", "Si se suministra la misma cantidad de calor a masas iguales de agua y cobre, ¿cuál aumenta más su temperatura?", [
        "El agua, porque tiene mayor calor específico",
        "Ambos aumentan igual",
        "El cobre, porque tiene mayor densidad",
        "El cobre, porque tiene menor calor específico"
    ], 3));
    out.push(q("Química", "PZ-2", "Conversión de temperatura", "Para convertir grados Celsius a Kelvin, se debe:", [
        "Sumar 273.15",
        "Restar 273.15",
        "Multiplicar por 1.8 y sumar 32",
        "Dividir para 273.15"
    ], 0));
    out.push(q("Química", "PZ-2", "Conversión de temperatura", "El cero absoluto (0 K) corresponde en grados Celsius a aproximadamente:", [
        "0 °C",
        "-100 °C",
        "273.15 °C",
        "-273.15 °C"
    ], 3));
    out.push(q("Química", "PZ-2", "Conversión de temperatura", "25 °C equivalen a:", [
        "250 K",
        "298.15 K",
        "-248.15 K",
        "25 K"
    ], 1));
    out.push(q("Química", "PZ-3", "Reacciones químicas", "Al reaccionar hidrógeno y oxígeno gaseoso se forma:", [
        "Dióxido de carbono (CO2)",
        "Amoníaco (NH3)",
        "Agua (H2O)",
        "Peróxido de hidrógeno"
    ], 2));
    out.push(q("Química", "PZ-3", "Reacciones químicas", "La ecuación balanceada de la formación de agua es:", [
        "H2 + O2 -> H2O",
        "2H2 + O2 -> 2H2O",
        "H2 + 2O2 -> 2H2O",
        "2H + O -> H2O"
    ], 1));
    out.push(q("Química", "PZ-4", "Estequiometría", "De acuerdo con la ecuación 2H2 + O2 -> 2H2O, ¿cuántas moles de agua se forman a partir de 2 moles de oxígeno diatómico?", [
        "2 moles",
        "1 mol",
        "8 moles",
        "4 moles"
    ], 3));
    return out;
}

function genPZFisica() {
    const out = [];
    out.push(q("Física", "PZ-1", "MRU", "En el Movimiento Rectilíneo Uniforme (MRU):", [
        "La velocidad aumenta de forma constante",
        "La velocidad es constante y la aceleración es nula",
        "La aceleración es constante",
        "La trayectoria es circular"
    ], 1));
    out.push(q("Física", "PZ-2", "MRUV", "En el Movimiento Rectilíneo Uniformemente Variado (MRUV):", [
        "La aceleración es constante y distinta de cero",
        "La velocidad es siempre cero",
        "La aceleración varía con el tiempo",
        "La velocidad es constante"
    ], 0));
    out.push(q("Física", "PZ-3", "Movimiento Armónico Simple", "El Movimiento Armónico Simple (MAS) es un movimiento:", [
        "Que siempre se realiza en forma circular",
        "Oscilatorio o vibratorio, originado por una fuerza recuperadora",
        "De aceleración constante y nula",
        "Donde la velocidad nunca cambia"
    ], 1));
    out.push(q("Física", "PZ-4", "Péndulo simple", "En un péndulo simple, el periodo de oscilación depende de:", [
        "La masa de la partícula suspendida",
        "La amplitud inicial (si es pequeña)",
        "La longitud del hilo y la aceleración de la gravedad",
        "El material de la masa pequeña"
    ], 2));
    out.push(q("Física", "PZ-5", "Desintegración radiactiva", "El periodo de semidesintegración de un isótopo es:", [
        "El tiempo de vida promedio de un solo núcleo",
        "El tiempo en que la masa desaparece totalmente",
        "Siempre constante e igual a 1 año para todos los isótopos",
        "El tiempo necesario para que se desintegre la mitad de los núcleos radiactivos de una muestra"
    ], 3));
    return out;
}

function genPZMatematicas() {
    const out = [];
    out.push(q("Matemáticas", "PZ-1", "Ecuaciones paramétricas del plano", "Para determinar las ecuaciones paramétricas de un plano se necesitan:", [
        "Solo un vector director",
        "Un punto y dos vectores directores no paralelos",
        "Dos puntos únicamente",
        "Una matriz ortogonal"
    ], 1));
    out.push(q("Matemáticas", "PZ-2", "Media aritmética", "La media aritmética de un conjunto de datos se calcula:", [
        "Ordenando los datos y seleccionando el central",
        "Escogiendo el valor que más se repite",
        "Restando el menor al mayor",
        "Sumando todos los valores y dividiendo entre el número total de datos"
    ], 3));
    out.push(q("Matemáticas", "PZ-3", "Optimización cuadrática", "En una función cuadrática f(x) = ax² + bx + c, si a < 0, el vértice representa:", [
        "El valor máximo de la función",
        "El valor mínimo de la función",
        "Un punto de inflexión",
        "Una raíz no real"
    ], 0));
    out.push(q("Matemáticas", "PZ-4", "Integral indefinida", "La integral indefinida de una función f(x) es:", [
        "El área exacta bajo su curva",
        "Su derivada",
        "El conjunto de todas sus primitivas, representadas añadiendo una constante C",
        "El límite cuando x tiende a infinito"
    ], 2));
    out.push(q("Matemáticas", "PZ-5", "Ecuación de la elipse", "La ecuación general x²/a² + y²/b² = 1, si a > b, representa:", [
        "Una hipérbola",
        "Una elipse con eje focal sobre el eje X",
        "Una circunferencia",
        "Una parábola"
    ], 1));
    return out;
}

function buildPZBank() {
    const bank = [];
    bank.push(...genPZQuimica());
    bank.push(...genPZFisica());
    bank.push(...genPZMatematicas());

    const seen = new Set();
    const uniq = [];
    for (const item of bank) {
        const key = item.topic + "|" + item.code + "|" + item.subtema + "|" + item.text + "|" + item.options.join("||") + "|" + item.correct;
        if (!seen.has(key)) {
            seen.add(key);
            uniq.push(item);
        }
    }
    return uniq;
}

/* =========================
   EXAMEN: 40 aleatorias del banco total
========================= */
let BANK = [];
let EXAM = [];
let answers = new Array(EXAM_SIZE).fill(null);
let usedQuestionsIndices = new Set(); // Track used questions across attempts

/* =========================
   UI refs
========================= */
const timerEl = document.getElementById("timer");
const progEl = document.getElementById("prog");
const barEl = document.getElementById("bar");
const startBtn = document.getElementById("startBtn");
const finishBtn = document.getElementById("finishBtn");
const resetBtn = document.getElementById("resetBtn");

const hintEl = document.getElementById("hint");
const qArea = document.getElementById("qArea");
const qNum = document.getElementById("qNum");
const qText = document.getElementById("qText");
const qTopic = document.getElementById("qTopic");
const qSubMeta = document.getElementById("qSubMeta");
const qTag = document.getElementById("qTag");
const optsEl = document.getElementById("opts");
const bankInfo = document.getElementById("bankInfo");

const quizCard = document.getElementById("quizCard");
const resultCard = document.getElementById("resultCard");
const correctEl = document.getElementById("correct");
const wrongEl = document.getElementById("wrong");
const score1000El = document.getElementById("score1000");
const usedEl = document.getElementById("used");
const backBtn = document.getElementById("backBtn");

const schoolInp = document.getElementById("school");
const calcBtn = document.getElementById("calcBtn");
const calcBox = document.getElementById("calcBox");

const startModal = document.getElementById("startModal");
const normalStartBtn = document.getElementById("normalStartBtn");
const pzStartBtn = document.getElementById("pzStartBtn");
const cancelStartBtn = document.getElementById("cancelStartBtn");

/* =========================
   Estado
========================= */
let started = false, ended = false;
let idx = 0;
let timeLeft = TOTAL_TIME_SEC;
let tick = null;

function formatTime(sec) {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
}
function setTimer() {
    timerEl.textContent = formatTime(timeLeft);
    timerEl.style.color = (timeLeft <= 300) ? "var(--bad)" : "var(--accent)";
}
function updateProgress() {
    progEl.textContent = String(idx);
    barEl.style.width = `${Math.round((idx / EXAM_SIZE) * 100)}%`;
}
function lockOptions() {
    optsEl.querySelectorAll('input[type="radio"]').forEach(r => r.disabled = true);
    optsEl.querySelectorAll('.opt').forEach(l => l.classList.add("locked"));
}

function renderQuestion() {
    const item = EXAM[idx];
    qNum.textContent = `#${idx + 1}`;
    qText.textContent = item.text;

    // Mostrar: "Tema" + " (Código: X • Subtema: Y)"
    qTopic.textContent = item.topic;
    qSubMeta.textContent = `  (Código: ${item.code} • Subtema: ${item.subtema})`;

    // Tag arriba a la derecha: "Tema • Código"
    qTag.textContent = `${item.topic} • ${item.code}`;

    optsEl.innerHTML = "";
    item.options.forEach((opt, j) => {
        const label = document.createElement("label");
        label.className = "opt";
        label.innerHTML = `<input type="radio" name="q" value="${j}" /><span>${opt}</span>`;
        label.addEventListener("click", () => {
            if (!started || ended) return;
            if (answers[idx] !== null) return;

            answers[idx] = j;
            lockOptions();

            setTimeout(() => {
                idx++;
                updateProgress();
                if (idx >= EXAM_SIZE) finish(false);
                else renderQuestion();
            }, 220);
        });
        optsEl.appendChild(label);
    });
}

function computeScore() {
    let correct = 0;
    for (let i = 0; i < EXAM_SIZE; i++) {
        if (answers[i] === EXAM[i].correct) correct++;
    }
    const wrong = EXAM_SIZE - correct;
    const score1000 = Math.round((correct / EXAM_SIZE) * 1000);
    return { correct, wrong, score1000 };
}

function start() {
    if (started || ended) return;
    started = true;
    startBtn.disabled = true;
    finishBtn.disabled = false;

    hintEl.textContent = "Responde. No puedes retroceder y no puedes cambiar una respuesta.";
    qArea.classList.remove("hide");

    idx = 0;
    updateProgress();
    renderQuestion();

    tick = setInterval(() => {
        timeLeft--;
        if (timeLeft < 0) timeLeft = 0;
        setTimer();
        if (timeLeft === 0) finish(true);
    }, 1000);
}

function finish(auto) {
    if (ended) return;
    ended = true;
    if (tick) clearInterval(tick);
    finishBtn.disabled = true;

    const used = TOTAL_TIME_SEC - timeLeft;
    const { correct, wrong, score1000 } = computeScore();

    correctEl.textContent = correct;
    wrongEl.textContent = wrong;
    score1000El.textContent = score1000;
    usedEl.textContent = formatTime(used);

    calcBox.textContent = "";
    schoolInp.value = "";
    calcBtn.disabled = false;

    quizCard.classList.add("hide");
    resultCard.classList.remove("hide");
    resultCard.dataset.score1000 = String(score1000);
}

function newAttempt() {
    if (tick) clearInterval(tick);

    if (CURRENT_MODE === "P-Z") {
        BANK = buildPZBank();
    } else {
        if (BANK.length === 0 || (BANK.length > 0 && BANK[0].code.startsWith("PZ-"))) {
            BANK = buildFullBank();
        }
    }

    let maxExamSize = Math.min(EXAM_SIZE, BANK.length);

    // Available questions filtering
    let availableIndices = [];
    for (let i = 0; i < BANK.length; i++) {
        if (!usedQuestionsIndices.has(i)) availableIndices.push(i);
    }

    // Reset history if we don't have enough questions left for an exam
    if (availableIndices.length < maxExamSize) {
        usedQuestionsIndices.clear();
        availableIndices = [];
        for (let i = 0; i < BANK.length; i++) availableIndices.push(i);
    }

    shuffle(availableIndices);
    const chosenIndices = availableIndices.slice(0, maxExamSize);
    chosenIndices.forEach(val => usedQuestionsIndices.add(val));
    EXAM = chosenIndices.map(i => BANK[i]);

    answers = new Array(EXAM.length).fill(null);

    started = false;
    ended = false;
    idx = 0;
    timeLeft = TOTAL_TIME_SEC;

    setTimer();
    updateProgress();

    startBtn.disabled = false;
    finishBtn.disabled = true;

    hintEl.textContent = `Presiona “Iniciar”. (Preguntas usadas: ${usedQuestionsIndices.size}/${BANK.length})`;
    qArea.classList.add("hide");

    quizCard.classList.remove("hide");
    resultCard.classList.add("hide");

    // Info banco + cobertura por tema
    const by = { Matemáticas: 0, Lenguaje: 0, Física: 0, Química: 0 };
    for (const it of BANK) if (by[it.topic] !== undefined) by[it.topic]++;
    bankInfo.textContent =
        `Banco total cargado: ${BANK.length} preguntas (Usadas: ${usedQuestionsIndices.size}).\n` +
        `Matemáticas: ${by.Matemáticas} • Lenguaje: ${by.Lenguaje} • Física: ${by.Física} • Química: ${by.Química}\n` +
        `No se repetirán hasta agotar el banco de preguntas.`;
}

calcBtn.addEventListener("click", () => {
    const score1000 = Number(resultCard.dataset.score1000 || "0");
    const school = Number(schoolInp.value);

    if (!Number.isFinite(school) || school < 0 || school > 10) {
        calcBox.textContent = "Ingresa una nota válida del colegio entre 0.00 y 10.00.";
        return;
    }

    const colegioParte = (school / 10) * 500;
    const examenParte = (score1000 / 1000) * 500;
    const final = colegioParte + examenParte;

    const line1 = `Nota colegio: ${school.toFixed(2)} → (nota/10)×500 = (${school.toFixed(2)}/10)×500 = ${colegioParte.toFixed(2)}`;
    const line2 = `Puntaje simulacro: ${score1000} → (puntaje/1000)×500 = (${score1000}/1000)×500 = ${examenParte.toFixed(2)}`;
    const line3 = `NOTA FINAL = ${colegioParte.toFixed(2)} + ${examenParte.toFixed(2)} = ${final.toFixed(2)}`;

    calcBox.textContent = `${line1}\n${line2}\n\n${line3}`;
    calcBtn.disabled = true;
});

backBtn.addEventListener("click", () => {
    resultCard.classList.add("hide");
    quizCard.classList.remove("hide");
    hintEl.textContent = "El simulacro ya terminó. Usa “Reiniciar” para un nuevo intento (40 aleatorias).";
    qArea.classList.add("hide");
});

startBtn.addEventListener("click", () => {
    if (started || ended) return;
    startModal.classList.add("show");
});

normalStartBtn.addEventListener("click", () => {
    startModal.classList.remove("show");
    CURRENT_MODE = "NORMAL";
    newAttempt();
    start();
});

pzStartBtn.addEventListener("click", () => {
    startModal.classList.remove("show");
    CURRENT_MODE = "P-Z";
    newAttempt();
    start();
});

cancelStartBtn.addEventListener("click", () => {
    startModal.classList.remove("show");
});

finishBtn.addEventListener("click", () => finish(false));
resetBtn.addEventListener("click", newAttempt);

// Arranque
newAttempt();