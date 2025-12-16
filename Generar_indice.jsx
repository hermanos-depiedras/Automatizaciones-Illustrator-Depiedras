// Generar índice de secciones en Illustrator
// - Detecta mesas de trabajo cuyo nombre contenga "@sec:"
// - Usa lo que hay después de "@sec:" como título de sección
// - Ignora "#oscuro" si está presente al final del nombre
// - Escribe el índice en el TextFrame seleccionado
//
// Formato final de cada línea:
//   "Título sección · X"
// donde X es el número real del artboard (empezando en 0)

// ============= AJUSTES =============

var TAG_SECCION = "@sec:";   // Marca que este artboard define una sección
var TAG_OSCURO  = "#oscuro"; // Esto se omite del título si está presente

// Prefijo por si algún día quisieras colocar algo delante del número,
// ahora mismo no se usa:
var PREFIJO_PAGINA = ""; 


// ============= SCRIPT =============

if (app.documents.length === 0) {
    alert("No hay ningún documento abierto.");
} else {
    var doc = app.activeDocument;

    // Necesitamos que el usuario seleccione el cuadro de texto del índice
    if (doc.selection.length !== 1 || !(doc.selection[0] instanceof TextFrame)) {
        alert("Selecciona exactamente un cuadro de texto donde quieras que se escriba el índice.");
    } else {

        var indiceTextFrame = doc.selection[0];
        var artboards = doc.artboards;
        var secciones = [];

        // Recorremos todas las mesas de trabajo
        for (var i = 0; i < artboards.length; i++) {

            var ab = artboards[i];
            var nombre = ab.name;
            if (!nombre) continue;

            var idxSec = nombre.indexOf(TAG_SECCION);
            if (idxSec === -1) continue; // no es sección

            // Parte del texto que viene después de "@sec:"
            var titulo = nombre.substring(idxSec + TAG_SECCION.length);

            // Si aparece "#oscuro", cortamos ahí
            var idxOscuro = titulo.indexOf(TAG_OSCURO);
            if (idxOscuro !== -1) {
                titulo = titulo.substring(0, idxOscuro);
            }

            // Limpiar espacios sobrantes
            titulo = titulo.replace(/^\s+|\s+$/g, "");

            if (!titulo.length) continue;

            // Número de página = índice REAL del artboard (sin +1)
            var pagina =  i + 1;

            secciones.push({
                titulo: titulo,
                pagina: pagina
            });
        }

        if (secciones.length === 0) {
            alert(
                "No se encontró ninguna mesa de trabajo con el tag \"" + TAG_SECCION + "\".\n\n" +
                "Ejemplos válidos:\n" +
                "  @sec: Introducción\n" +
                "  @sec: Concepto general #oscuro"
            );
        } else {

            // Construimos las líneas con el formato pedido:
            // "Título sección · número"
            var lineas = [];
            for (var j = 0; j < secciones.length; j++) {
                var s = secciones[j];

                var linea = s.titulo + " · " + PREFIJO_PAGINA + s.pagina;
                lineas.push(linea);
            }

            // Escribimos todo en el textFrame seleccionado
            indiceTextFrame.contents = lineas.join("\r");

            alert("Índice actualizado con " + secciones.length + " secciones.");
        }
    }
}
