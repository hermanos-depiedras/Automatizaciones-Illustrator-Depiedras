# Scripts para Adobe Illustrator
Dos scripts en `.jsx` para automatizar tareas habituales en documentos con múltiples mesas de trabajo: generar índices y aplicar numeración consistente.

---

## 📄 Scripts incluidos

### **1. Generar_indice.jsx**
Crea un índice automático a partir de mesas de trabajo cuyo nombre contenga `@sec:`.  
- Extrae el título después del tag.  
- Ignora `#oscuro` si está presente.  
- Escribe el índice en el `TextFrame` seleccionado.

### **2. Numerar_paginas-color_personalizado.jsx**
Numera todas las mesas de trabajo usando la posición y estilo tipográfico de un `TextFrame` plantilla.  
- Detecta `#oscuro` para aplicar un color distinto.  
- Pregunta colores para fondos claros y oscuros.  
- Numera automáticamente cada artboard.

---

## 🛠 Uso rápido
1. Descarga los `.jsx`.  
2. En Illustrator: **Archivo → Secuencias de comandos → Otros secuencias de comandos…**  
3. Selecciona el script y sigue las instrucciones.

---

## 📌 Instalación opcional (para acceso directo)
Si quieres que los scripts aparezcan en el menú sin ir a “Otros…”:

1. Copia los archivos `.jsx` en la carpeta de Illustrator:  
   **Windows:**  
   `C:\Program Files\Adobe\Adobe Illustrator\Presets\es_ES\Scripts`  
   **macOS:**  
   `/Applications/Adobe Illustrator/Presets/es_ES/Scripts`  

2. Reinicia Illustrator.  
3. Los verás en: **Archivo → Secuencias de comandos**.

---

## 📬 Contacto
Para mejoras o sugerencias, abre un Issue o un Pull Request.
