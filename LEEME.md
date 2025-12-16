# Truquitos de Adobe Illustrator  
Automatizaciones para numerar páginas, generar índices automáticos y crear pies de página sincronizados.

Aquí tienes los **scripts descargables**, **un archivo de ejemplo en Illustrator** y **un 3º truco extra explicado paso a paso**.

---

## 🧭 Si nunca has usado GitHub (importante)

- Solo tienes que ir a el botón **Code** en verde.
- Ahí pulsa en **descargar archivo .zip**.

👉 La instalación se explica **al final del documento**, pero puedes volver cuando lo necesites.

---

## 📄 1. Numerar_paginas-color_personalizado.jsx
Script para numerar automáticamente todas las mesas de trabajo usando un **cuadro de texto plantilla**, manteniendo posición y tipografía.

### ✔ Preparación previa
1. Crea un **cuadro de texto** con el número de página.
2. Ajusta su tipografía, tamaño, color y posición.
3. Colócalo en una mesa de trabajo.
4. **Selecciona ese cuadro de texto** antes de ejecutar el script.

Ese cuadro actuará como **plantilla** para el resto de páginas.

### ✔ El tag `#oscuro`
Si una mesa de trabajo tiene fondo oscuro, añade `#oscuro` en su nombre.

Ejemplos:
- `Portada` → fondo claro → número oscuro  
- `Ficha técnica #oscuro` → fondo oscuro → número claro  

El script detecta automáticamente este tag y aplica el color correcto.

### ✔ Qué hace el script
Al ejecutarlo:
- Te pedirá:
  - Un color para números sobre fondo claro.
  - Un color para números sobre fondo oscuro.
- Detectará en qué mesa de trabajo está la plantilla.
- Copiará el número en todas las demás mesas de trabajo manteniendo:
  - La misma posición.
  - El mismo estilo tipográfico.
  - Numeración correlativa.
  - El color adecuado según `#oscuro`.

---

## 📄 2. Generar_indice_automatico.jsx
Script que genera un índice automáticamente a partir del nombre de las mesas de trabajo.

### ✔ Cómo nombrar las mesas de trabajo
Usa **`@sec:`** para indicar que una mesa de trabajo define una sección.

Ejemplos válidos:
- `@sec: Introducción`
- `Página 04 @sec: Resultados`
- `Resumen @sec: Datos clave #oscuro`

> El tag `#oscuro` se ignora para el índice; solo se usa para la numeración.

### ✔ Cómo usar el script
1. Crea y selecciona un **cuadro de texto vacío** donde quieras que aparezca el índice.
2. Ejecuta el script.
3. El índice se genera automáticamente con el formato:
   
   `Título de sección · Nº`

El número de página corresponde al **número real de la mesa de trabajo**.

---

## 📄 3. Truco extra: pie de página automático con Símbolos (sin scripts)
Este tercer recurso no es un archivo descargable, sino un **método nativo de Illustrator**.

### ✔ Qué permite
Crear un texto que:
- Aparece en varias mesas de trabajo.
- **Se actualiza en todas a la vez** cuando editas uno solo.
- Es ideal para pies de página, textos legales, fechas o títulos repetidos.

### ✔ Cómo hacerlo paso a paso
1. Crea un **cuadro de texto** con el contenido del pie de página.
2. Abre la ventana **Símbolos**.
3. Arrastra el cuadro de texto a la ventana de Símbolos.
4. Confirma cuando Illustrator te lo pida.
5. Ahora puedes arrastrar ese símbolo a cualquier mesa de trabajo.

➡️ Si editas uno de ellos, **se actualizan todos automáticamente**.

### ⚠️ Importante
- Si necesitas el mismo texto en **colores distintos**, debes crear **varios símbolos**, uno por color.
- Un único símbolo no permite variaciones de color independientes.

---

## 📦 Archivo Illustrator de ejemplo
El repositorio incluye un **archivo de Illustrator** con:
- La plantilla usada en el vídeo.
- Los nombres correctos de mesas de trabajo.
- Ejemplos reales de `@sec:` y `#oscuro`.
- La numeración y el índice ya aplicados.

Sirve como referencia directa para entender cómo está todo estructurado.

---

## 🛠 Instalación de los scripts (recomendado)
Para que los scripts aparezcan directamente en el menú de Illustrator:

### Windows
Copia los archivos `.jsx` en:
C:\Archivos de programa\Adobe\Adobe Illustrator 2025\Presets\es_ES\Secuencias de comandos

### macOS
Copia los archivos `.jsx` en:
/Aplicaciones/Adobe Illustrator 2025/Presets/es_ES/Secuencias de comandos

*(Sustituye “2025” por tu versión si es distinta)*

➡️ Reinicia Illustrator.  
Luego los encontrarás en:
**Archivo → Secuencias de comandos**

---

## 📬 Contacto
Si tienes sugerencias, dudas o mejoras, puedes abrir un Issue o un Pull Request.

