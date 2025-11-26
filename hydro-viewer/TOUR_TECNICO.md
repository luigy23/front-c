# 🗺️ Tour Técnico: Del JSON al Frontend

Este documento explica cómo cada píxel de la interfaz **HydroTech Digital Twin** nace directamente de las definiciones de tu archivo `Modelo Hidroponico v2.json`.

---

## 1. El Concepto: Gemelo Digital (Digital Twin)
El JSON describe un sistema jerárquico físico (`Sede -> Bloque -> Espacio -> Estructura`) con coordenadas precisas. Esto nos permitió crear no solo un "CRUD" (tablas de datos), sino una **representación visual exacta** del invernadero.

---

## 2. Desglose por Módulos

### 📍 A. Módulo de Infraestructura (El Mapa)
**Lo que ves:** Un mapa interactivo donde puedes ver las mesas dibujadas a escala.
**De dónde viene (JSON):**

1.  **El Árbol de Navegación (Sidebar Izquierdo):**
    *   Se construye recorriendo las tablas `sede`, `bloque` y `espacio`.
    *   *Relación:* Un `bloque` tiene `sede_id`, un `espacio` tiene `bloque_id`.

2.  **El Plano Visual (Canvas):**
    *   Aquí es donde tu modelo brilla. Usamos la tabla **`estructura`** (líneas 417-523 del JSON).
    *   **Dibujo:** Usamos `ancho` y `largo` para el tamaño del rectángulo.
    *   **Ubicación:** Usamos `posicion_x` y `posicion_y` para colocarlo en el mapa SVG.
    *   **Identificación:** El código que aparece sobre la mesa (ej. "M-01") viene del campo `codigo`.

> **La Magia:** Al tener coordenadas X/Y en la base de datos, el frontend puede renderizar el mapa automáticamente sin necesidad de dibujar imágenes estáticas. Si mueves una mesa en la BD, se mueve en el mapa.

---

### 🌱 B. Módulo de Agronomía (Biblioteca)
**Lo que ves:** Un catálogo de cultivos con sus tiempos y "recetas".
**De dónde viene (JSON):**

1.  **Tarjetas de Cultivo:**
    *   Datos base: Tabla **`cultivo`** (nombre, nombre científico) y **`variedad_cultivo`** (características).
    
2.  **Línea de Tiempo (Fases):**
    *   Visualizamos la tabla **`fase_produccion`** (Germinación, Crecimiento, etc.).
    *   La duración de cada punto en la línea viene de la tabla intermedia **`cultivo_fase`**, campo `duracion_dias`.

3.  **"Ver Receta":**
    *   Aunque no lo mostramos en detalle en la demo, este botón consultaría **`fase_nutriente`** y **`nutriente`** para decirte: *"En la fase de Crecimiento (ID 2), aplica Nitrato (ID 5) a 2ml/L"*.

---

### 🛡️ C. Módulo de Seguridad
**Lo que ves:** Una bitácora de quién entró y dónde.
**De dónde viene (JSON):**

1.  **Tabla de Logs:**
    *   Es una vista directa de la tabla **`acceso_espacio`** (líneas 751-800).
    *   **Quién:** Join con `usuario` -> `persona` (para mostrar el nombre "Juan Pérez" en lugar de `usuario_id: 45`).
    *   **Dónde:** Join con `espacio` (para mostrar "Laboratorio").
    *   **Cómo:** Campo `metodo_acceso` (Huella, Facial, RFID).
    *   **Cuándo:** Campo `fecha_acceso`.

---

### 📊 D. Dashboard General
**Lo que ves:** Métricas y selectores globales.
**De dónde viene (JSON):**

1.  **Selector de Sede (Header):**
    *   Tu modelo es **Multi-empresa** (tabla `empresa`) y Multi-sede. El dropdown del header permite filtrar toda la data por `sede_id`, cumpliendo con la arquitectura SaaS que definiste.

2.  **Métricas (KPIs):**
    *   *Nota:* Como hablamos, las métricas de sensores (Temperatura, pH) no tienen tabla en el JSON v2, pero son la extensión lógica para un sistema de este tipo.
    *   **Tareas:** Las tareas sugeridas ("Revisión de pH") se calculan cruzando las **fases** activas de los cultivos en las **estructuras**.

---

## Resumen de la Arquitectura

| Vista Frontend | Tablas JSON Principales | Tablas JSON de Apoyo |
| :--- | :--- | :--- |
| **Infraestructura** | `estructura`, `espacio` | `bloque`, `sede`, `tipo_estructura` |
| **Agronomía** | `cultivo`, `variedad_cultivo` | `fase_produccion`, `cultivo_fase`, `nutriente` |
| **Seguridad** | `acceso_espacio` | `usuario`, `persona`, `rol` |
| **Configuración** | `empresa`, `usuario` | `rol`, `usuario_rol` |

Este frontend es la "piel" que hace que tu modelo de datos relacional sea útil y comprensible para un humano operando el invernadero.
