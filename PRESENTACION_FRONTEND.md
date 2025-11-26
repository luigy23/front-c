# 🖥️ Guion de Presentación Extendido: HydroTech Digital Twin

Guía completa para tu exposición, incluyendo qué mostrar, qué decir y cómo defender tu proyecto.

---

## 🎯 Diapositiva 1: Título

### 🎨 Contenido Visual (Slide)
*   **Título Grande:** HydroTech Digital Twin
*   **Subtítulo:** Plataforma de Gestión Hidropónica & Visualización de Datos
*   **Imagen de Fondo:** Captura de pantalla del Dashboard o del Mapa del invernadero difuminada.
*   **Datos:** Tu Nombre | Materia: Electiva de Software

### 🗣️ Guion del Orador
"Buenos días a todos.
Hoy les presento **HydroTech Digital Twin**, una solución de software full-stack que hemos desarrollado para modernizar la agricultura de precisión.
Este proyecto no es solo una página web; es una herramienta de gestión que transforma datos crudos y complejos en una experiencia visual intuitiva para el control de cultivos hidropónicos.
El objetivo fue tomar un modelo de datos teórico y convertirlo en una aplicación funcional que permite a los operarios visualizar su infraestructura, gestionar sus cultivos y monitorear la seguridad en tiempo real."

---

## 💡 Diapositiva 2: El Desafío (Del JSON a la Realidad)

### 🎨 Contenido Visual (Slide)
*   **Izquierda:** Icono de archivo JSON 📄 con un fragmento (`"class": "estructura", "posicion_x": 10...`).
*   **Flecha:** ➡️ "Interpretación de Datos"
*   **Derecha:** Captura del Mapa Interactivo 🗺️ con las mesas dibujadas.

### 📂 Archivos Clave
*   `modelo_hidroponico_v2.json` (La fuente de la verdad).
*   `hydro_back/app/models.py` (Cómo se tradujo a Python/SQL).

### 🗣️ Guion del Orador
"Todo este desarrollo nace de un desafío técnico específico: teníamos el archivo `modelo_hidroponico_v2.json`.
Este JSON define teóricamente toda la estructura de una empresa agrícola: sus sedes, sus bloques, sus naves y hasta la posición exacta de cada mesa de cultivo. Pero en ese formato, es ilegible para un humano.
Mi misión fue crear un sistema que pudiera leer esa estructura jerárquica y 'darle vida'.
No queríamos una tabla de Excel aburrida. Queríamos un **Gemelo Digital**: si la base de datos dice que hay una mesa de lechugas en la coordenada X:10, Y:5, el sistema debe dibujarla exactamente ahí.
El reto fue conectar ese modelo de datos estático con una interfaz dinámica que el usuario pudiera entender y manipular."

---

## 🛠️ Diapositiva 3: Stack Tecnológico

### 🎨 Contenido Visual (Slide)
*   **Frontend:** **React** ⚛️ + **Vite** ⚡ (Logos grandes).
*   **Estilos:** **CSS Puro** 🎨 + **Lucide Icons** 🖌️.
*   **Navegación:** **React Router**.
*   **Backend:** **FastAPI** 🐍 + **PostgreSQL** 🐘 + **Docker** 🐳.

### 📂 Archivos Clave
*   `hydro-viewer/package.json` (Dependencias Frontend).
*   `hydro_back/docker-compose.yml` (Orquestación de servicios).

### 🗣️ Guion del Orador
"Para construir una solución robusta y escalable, seleccionamos un stack tecnológico moderno:
En el **Frontend**, el protagonista es **React** ejecutándose sobre **Vite**. Esta combinación nos ofrece una velocidad de desarrollo superior y una experiencia de usuario muy fluida al ser una SPA (Single Page Application).
Para el diseño, tomé una decisión consciente de usar **CSS puro con variables** en lugar de librerías pesadas como Bootstrap. Esto mantiene el proyecto ligero y nos da control total sobre la identidad visual.
Aunque mi foco hoy es el frontend, es vital mencionar que todo esto se apoya en un **Backend real** construido con **FastAPI y PostgreSQL**, todo orquestado en contenedores **Docker**. Esto garantiza que los datos sean persistentes y el entorno de desarrollo sea replicable en cualquier máquina."

---

## 🏗️ Diapositiva 4: Arquitectura del Frontend

### 🎨 Contenido Visual (Slide)
*   Diagrama de árbol de carpetas:
    *   `src/`
        *   📂 `pages/` (Vistas: Infraestructura, Agronomía...)
        *   📂 `components/` (Piezas: Header, Sidebar...)
        *   📂 `context/` (Estado Global: AppContext)
        *   📂 `services/` (Comunicación: api.js)

### 📂 Archivos Clave
*   `src/context/AppContext.jsx` (Estado global).
*   `src/services/api.js` (Capa de servicio).

### 🗣️ Guion del Orador
"Un buen software se define por su estructura interna. Organicé el proyecto siguiendo patrones de diseño que facilitan el mantenimiento:
*   **Separación de Responsabilidades:**
    *   En **`pages`** tenemos las vistas principales como el Dashboard o el Mapa.
    *   En **`components`** están las piezas reutilizables como el menú lateral o los modales.
*   **Gestión de Estado:** Implementé **React Context** (`AppContext`). Esto es crucial: si cambio la 'Sede' en el menú superior, esa información viaja globalmente a todos los componentes sin tener que pasarla manualmente uno por uno ('prop drilling').
*   **Capa de Servicios:** Centralicé todas las llamadas al backend en `api.js`. Si mañana cambia la URL del servidor, solo tengo que editar un archivo, no 50."

---

## 🔌 Diapositiva 5: Integración y Endpoints

### 🎨 Contenido Visual (Slide)
*   Gráfico: **Frontend** ↔️ `fetch()` ↔️ **API REST**.
*   Lista de Endpoints:
    *   `GET /api/sedes` (Carga inicial)
    *   `GET /api/sedes/{id}` (Detalle profundo)
    *   `POST /api/cultivos` (Creación)
    *   `GET /api/accesos` (Logs)

### 📂 Archivos Clave
*   `src/services/api.js` (Definición de funciones fetch).
*   `hydro_back/app/routers/` (Donde viven los endpoints).

### 🗣️ Guion del Orador
"La aplicación está viva. No usamos datos falsos ('mock data') estáticos.
Conectamos el frontend con el backend mediante una API RESTful.
*   Al iniciar, hacemos un `GET` a `/sedes` para construir el menú de navegación.
*   Cuando el usuario selecciona una sede, traemos dinámicamente su estructura completa (bloques, espacios, mesas).
*   Lo más importante: tenemos capacidad de **escritura**. El endpoint `POST /cultivos` nos permite enviar datos desde un formulario en React y guardarlos permanentemente en PostgreSQL.
Manejamos asincronía con `async/await`, mostrando estados de carga ('Loading...') para que el usuario siempre sepa qué está pasando."

---

## 🗺️ Diapositiva 6: El Módulo de Infraestructura (SVG Dinámico)

### 🎨 Contenido Visual (Slide)
*   Captura grande del mapa con las mesas de cultivo.
*   Zoom a un rectángulo que diga "Mesa 1".
*   Texto: "Renderizado SVG basado en coordenadas".

### 📂 Archivos Clave
*   `src/pages/Infrastructure.jsx` (Lógica de renderizado).

### 🗣️ Guion del Orador
"Esta es la funcionalidad más compleja y potente del frontend: el visor de infraestructura.
Aquí no hay imágenes estáticas. **React está dibujando el mapa en tiempo real usando SVG**.
El backend nos envía: 'Hay una mesa de 2x10 metros en la posición X:5, Y:2'.
El componente `Infrastructure.jsx` toma esos números y renderiza un elemento `<rect>` escalado perfectamente en pantalla.
Esto significa que el sistema es infinitamente escalable. Podemos tener 10 mesas o 10,000, y el sistema las dibujará con precisión milimétrica. Además, cada elemento es interactivo: al pasar el mouse, mostramos un tooltip con el estado del cultivo y su progreso."

---

## 🌱 Diapositiva 7: Agronomía y Gestión (Formularios)

### 🎨 Contenido Visual (Slide)
*   Captura: Tarjetas de cultivos.
*   Captura superpuesta: El Modal con el formulario "Nuevo Cultivo".
*   Iconos: ✅ Validación, 💾 Persistencia.

### 📂 Archivos Clave
*   `src/pages/Agronomy.jsx` (Manejo de formularios y modales).

### 🗣️ Guion del Orador
"En el módulo de Agronomía demostramos la gestión de datos.
Aquí listamos el catálogo de cultivos disponibles consumiendo la API. Pero fuimos un paso más allá: implementamos la creación de datos.
El botón 'Nuevo Cultivo' abre un modal con un formulario controlado. Al guardar:
1.  React captura los datos.
2.  Los envía al endpoint `POST`.
3.  Espera la confirmación del servidor.
4.  Y automáticamente actualiza la lista en pantalla sin necesidad de recargar la página.
Esto ofrece una experiencia de usuario (UX) fluida y moderna."

---

## 🛡️ Diapositiva 8: Seguridad (Formateo de Datos)

### 🎨 Contenido Visual (Slide)
*   Captura de la tabla de logs.
*   Destacar columna "Tiempo" ("Hace 5 min").
*   Destacar badges de estado (Verde/Rojo).

### 📂 Archivos Clave
*   `src/pages/Security.jsx` (Renderizado de tabla).
*   `hydro_back/app/routers/accesos.py` (Lógica de tiempo relativo).

### 🗣️ Guion del Orador
"Finalmente, en el módulo de seguridad, nos enfocamos en cómo presentamos la información.
Los datos crudos de una base de datos (fechas en formato ISO, códigos de estado) no son amigables para un humano.
En este módulo, transformamos esa data:
*   Convertimos fechas exactas en tiempo relativo ('Hace 10 minutos') para facilitar la lectura rápida.
*   Usamos renderizado condicional para asignar colores: verde para accesos autorizados, rojo para denegados.
Esto permite que el personal de seguridad entienda la situación del invernadero de un solo vistazo."

---

## ✅ Diapositiva 9: Conclusión

### 🎨 Contenido Visual (Slide)
*   Puntos clave:
    *   Arquitectura Escalable.
    *   Full Stack Real.
    *   UX/UI Intuitiva.
*   Frase: "Tecnología al servicio del campo".

### 🗣️ Guion del Orador
"Para concluir, **HydroTech** demuestra cómo una arquitectura de software bien planificada puede resolver problemas complejos del mundo real.
Logramos integrar un modelo de datos jerárquico en una interfaz visual, rápida y fácil de usar.
Hemos cubierto desde la base de datos hasta el píxel en la pantalla, aplicando buenas prácticas de desarrollo en cada capa.
Muchas gracias."

---

## ❓ Preguntas y Respuestas (Q&A)

Posibles preguntas del profesor o jurado y cómo responderlas técnicamente.

### 1. "¿Por qué usaste React Context y no Redux?"
*   **Respuesta:** "Para el alcance de esta aplicación, `Context API` es suficiente y más ligero. Redux añade mucha complejidad (boilerplate) que no era necesaria, ya que nuestro estado global es principalmente de lectura (usuario, sede actual) y no cambia con altísima frecuencia."

### 2. "¿Cómo maneja la aplicación si el Backend se cae?"
*   **Respuesta:** "Tenemos un manejo de errores básico en el servicio `api.js`. Si el `fetch` falla, capturamos la excepción (`catch`) y mostramos un estado de error en la interfaz en lugar de dejar la pantalla en blanco o que la aplicación colapse."

### 3. "¿El mapa SVG es responsivo (se adapta a móviles)?"
*   **Respuesta:** "Sí, el contenedor del SVG usa porcentajes o unidades flexibles (`viewBox`), lo que permite que el gráfico vectorial se escale sin perder calidad en diferentes tamaños de pantalla, a diferencia de un Canvas de HTML5 que pixelaría."

### 4. "¿Por qué FastAPI en el backend?"
*   **Respuesta:** "Por velocidad y tipado. FastAPI valida automáticamente los datos con Pydantic (que son los Schemas que definimos), lo que reduce drásticamente los errores de datos entre el front y el back, y además genera la documentación automática (Swagger) que facilitó mucho la integración."

### 5. "¿Cómo protegerías las rutas privadas?"
*   **Respuesta:** "Actualmente es un prototipo abierto, pero para producción implementaría JWT (JSON Web Tokens). El backend enviaría un token al hacer login, el frontend lo guardaría (en localStorage o Cookies) y lo enviaría en el header `Authorization` de cada petición en `api.js`."
