# Scripts para Adobe Illustrator
Dos scripts en `.jsx` para automatizar tareas en documentos con múltiples mesas de trabajo: numeración coherente y creación de índices basados en secciones.

---

## 📄 1. Numerar_paginas-color_personalizado.jsx
Numera automáticamente todas las mesas de trabajo usando un **Cuadro de Texto plantilla** para mantener posición, estilo y coherencia tipográfica.

### ✔ Requisitos previos
1. Crea un Cuadro de Texto con el estilo del número de página.  
2. Colócalo en la posición exacta donde quieras que aparezca en todas las páginas.  
3. Selecciona ese Cuadro de Texto antes de ejecutar el script.

### ✔ El tag `#oscuro`
Añade `#oscuro` al nombre de una mesa de trabajo para indicar que su fondo es oscuro.  
El script aplicará automáticamente un color claro para la numeración:

Ejemplos:
- `Portada` → fondo claro → número oscuro  
- `Ficha técnica #oscuro` → fondo oscuro → número claro  
- `Capítulo @sec: Introducción #oscuro` → funciona igual

### ✔ Qué hace el script
- Pregunta dos colores:  
  - **Color para números sobre fondo claro**  
  - **Color para números sobre fondo oscuro**  
- Detecta en qué artboard está la plantilla.  
- Duplica el número en el resto de mesas de trabajo manteniendo:  
  - Posición exacta  
  - Tipografía y estilo  
  - Orden correlativo  
  - Color adecuado según `#oscuro`

---

## 📄 2. Generar_indice.jsx
Genera un índice automáticamente a partir del nombre de las mesas de trabajo que definan una sección.

### ✔ Cómo deben nombrarse las mesas de trabajo
Incluye el tag **`@sec:`** para marcar una sección.

Ejemplos:
- `@sec: Introducción`  
- `Página 04 @sec: Resultados`  
- `Resumen @sec: Datos clave #oscuro`

> Nota: El tag **`#oscuro`** no afecta al índice; simplemente se ignora al extraer el título.

### ✔ Cómo usar el script
1. Selecciona un **Cuadro de Texto vacío** donde quieras que se genere el índice.  
2. Ejecuta el script desde:  
   **Archivo → Secuencias de comandos → Otros secuencias de comandos…**  
3. Detectará todas las mesas de trabajo con `@sec:` y generará líneas como:  
   `Título de sección · Nº`

El número corresponde al **índice real del artboard** (empezando desde 0).

---

## 🛠 Instalación rápida (usar al instante)
1. Descarga los `.jsx`.  
2. En Illustrator:  
   **Archivo → Secuencias de comandos → Otros secuencias de comandos…**  
3. Selecciona el script deseado.

---

## 📌 Instalación recomendada (acceso directo en el menú)
Copia los scripts en la carpeta de comandos de Illustrator:

### Windows  
`C:\Program Files\Adobe\Adobe Illustrator\Presets\es_ES\Scripts`

### macOS  
`/Applications/Adobe Illustrator/Presets/es_ES/Scripts`

➡️ *Reinicia Illustrator*  
Ahora aparecerán en:  
**Archivo → Secuencias de comandos**

---

## 📬 Contacto
Para sugerencias o mejoras, abre un Issue o Pull Request.

