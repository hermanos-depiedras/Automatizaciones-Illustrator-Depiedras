// Numerar mesas de trabajo en Illustrator usando:
// - Un textFrame PLANTILLA (posición + estilo tipográfico)
// - SOLO el tag "#oscuro" en el nombre del artboard para marcar fondos oscuros
//   Ej: "Portada", "Ficha #oscuro"
// Si NO tiene "#oscuro", se considera fondo claro.
//
// Al ejecutar, el script pregunta los colores para:
//  - Números sobre fondo CLARO
//  - Números sobre fondo OSCURO
// Puedes introducirlos como "R,G,B" (ej: 160,152,141) o como HEX (ej: #A0988D).

// ============= AJUSTES BÁSICOS =============

// Tag para artboards con fondo oscuro
var TAG_OSCURO = "#oscuro";  // si el fondo es oscuro → número claro

// SIN prefijo: solo el número
var PREFIJO_PAGINA = "";

// Número inicial (por si quieres empezar en 2, 3, etc.)
var NUMERO_INICIAL = 1;


// ============= FUNCIONES AUXILIARES =============

// Crear color RGB de Illustrator
function crearColorRGB(r, g, b) {
    var c = new RGBColor();
    c.red   = r;
    c.green = g;
    c.blue  = b;
    return c;
}

// Parsear entrada de color del usuario (RGB o HEX)
function parsearColorUsuario(mensaje, valorPorDefectoRGB) {
    var entrada = prompt(mensaje, valorPorDefectoRGB);

    if (!entrada) {
        // Si cancela o deja vacío → usamos el valor por defecto
        var partesDef = valorPorDefectoRGB.split(",");
        return crearColorRGB(
            parseInt(partesDef[0], 10),
            parseInt(partesDef[1], 10),
            parseInt(partesDef[2], 10)
        );
    }

    entrada = entrada.replace(/\s+/g, ""); // quitar espacios

    // Si parece RGB: "r,g,b"
    if (entrada.indexOf(",") !== -1) {
        var partes = entrada.split(",");
        if (partes.length === 3) {
            var r = parseInt(partes[0], 10);
            var g = parseInt(partes[1], 10);
            var b = parseInt(partes[2], 10);
            if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
                r = Math.max(0, Math.min(255, r));
                g = Math.max(0, Math.min(255, g));
                b = Math.max(0, Math.min(255, b));
                return crearColorRGB(r, g, b);
            }
        }
    }

    // Si parece HEX: "#RRGGBB" o "RRGGBB"
    var hex = entrada;
    if (hex.charAt(0) === "#") {
        hex = hex.substring(1);
    }
    if (hex.length === 6) {
        var rHex = parseInt(hex.substring(0, 2), 16);
        var gHex = parseInt(hex.substring(2, 4), 16);
        var bHex = parseInt(hex.substring(4, 6), 16);
        if (!isNaN(rHex) && !isNaN(gHex) && !isNaN(bHex)) {
            return crearColorRGB(rHex, gHex, bHex);
        }
    }

    // Si nada cuadra, usamos el valor por defecto
    var partesDef2 = valorPorDefectoRGB.split(",");
    return crearColorRGB(
        parseInt(partesDef2[0], 10),
        parseInt(partesDef2[1], 10),
        parseInt(partesDef2[2], 10)
    );
}


// ============= SCRIPT =============

if (app.documents.length === 0) {
    alert("No hay ningún documento abierto.");
} else {
    var doc = app.activeDocument;

    if (doc.selection.length !== 1 || !(doc.selection[0] instanceof TextFrame)) {
        alert("Selecciona exactamente un cuadro de texto que servirá como plantilla para el número de página.");
    } else {

        // 1) Preguntar colores al usuario
        // Valores por defecto en RGB (los tuyos originales)
        var COLOR_SOBRE_CLARO = parsearColorUsuario(
            "Color para números sobre fondo CLARO (RGB o HEX).\nEjemplo RGB: 160,152,141\nEjemplo HEX: A0988D o #A0988D",
            "160,152,141"
        );

        var COLOR_SOBRE_OSCURO = parsearColorUsuario(
            "Color para números sobre fondo OSCURO (RGB o HEX).\nEjemplo RGB: 246,246,244\nEjemplo HEX: F6F6F4 o #F6F6F4",
            "246,246,244"
        );

        var plantilla = doc.selection[0];
        var artboards = doc.artboards;

        // Posición base de la plantilla (en su artboard)
        var posBase = [plantilla.position[0], plantilla.position[1]];

        // Determinar en qué artboard está la plantilla
        var gb = plantilla.geometricBounds; // [izq, arriba, der, abajo]
        var centroX = (gb[0] + gb[2]) / 2;
        var centroY = (gb[1] + gb[3]) / 2;

        var indiceArtboardPlantilla = 0;
        for (var a = 0; a < artboards.length; a++) {
            var abRect = artboards[a].artboardRect; // [izq, arriba, der, abajo]
            var left   = abRect[0];
            var top    = abRect[1];
            var right  = abRect[2];
            var bottom = abRect[3];

            if (centroX >= left && centroX <= right && centroY <= top && centroY >= bottom) {
                indiceArtboardPlantilla = a;
                break;
            }
        }

        var abPlantillaRect = artboards[indiceArtboardPlantilla].artboardRect;
        var abPlantillaLeft = abPlantillaRect[0];
        var abPlantillaTop  = abPlantillaRect[1];

        // Decide color según si el nombre contiene TAG_OSCURO
        function colorParaArtboard(indiceAB) {
            var nombre = artboards[indiceAB].name;
            if (!nombre) nombre = "";
            var nombreLower = nombre.toLowerCase();

            if (nombreLower.indexOf(TAG_OSCURO.toLowerCase()) !== -1) {
                // Fondo oscuro → número claro
                return COLOR_SOBRE_OSCURO;
            }
            // Por defecto: fondo claro → número oscuro
            return COLOR_SOBRE_CLARO;
        }

        // --- Actualizar la propia plantilla (su artboard) ---
        var colorPlantilla = colorParaArtboard(indiceArtboardPlantilla);
        plantilla.contents = PREFIJO_PAGINA + (NUMERO_INICIAL + indiceArtboardPlantilla);
        plantilla.textRange.characterAttributes.fillColor = colorPlantilla;
        plantilla.zOrder(ZOrderMethod.BRINGTOFRONT);

        // --- Generar números para el resto de artboards ---
        var base = plantilla;

        for (var j = 0; j < artboards.length; j++) {
            if (j === indiceArtboardPlantilla) {
                continue; // ya hemos tratado la plantilla
            }

            var abRectJ = artboards[j].artboardRect;
            var abLeftJ = abRectJ[0];
            var abTopJ  = abRectJ[1];

            var dx = abLeftJ - abPlantillaLeft;
            var dy = abTopJ  - abPlantillaTop;

            var nuevaPos = [posBase[0] + dx, posBase[1] + dy];

            var nuevoTexto = base.duplicate();
            nuevoTexto.position = nuevaPos;
            nuevoTexto.contents = PREFIJO_PAGINA + (NUMERO_INICIAL + j);

            var colorNumero = colorParaArtboard(j);
            nuevoTexto.textRange.characterAttributes.fillColor = colorNumero;

            nuevoTexto.zOrder(ZOrderMethod.BRINGTOFRONT);
        }

        alert("Numeración aplicada a " + artboards.length + " mesas de trabajo.");
    }
}
