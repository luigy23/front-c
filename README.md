# HydroTech Digital Twin 🌱

Plataforma de gemelo digital para la gestión y monitoreo de cultivos hidropónicos. Permite visualizar infraestructura, gestionar cultivos y controlar accesos en tiempo real.

## 📋 Requisitos Previos

Asegúrate de tener instalado:
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (para el backend y base de datos)
- [Node.js](https://nodejs.org/) (v18+ recomendado, para el frontend)
- [Git](https://git-scm.com/)

## 🚀 Cómo Correr el Proyecto

### 1. Backend (API + Base de Datos)

El backend está dockerizado. Navega a la carpeta `hydro_back`:

```bash
cd hydro_back

# Levantar los servicios
docker-compose up -d --build

# Inicializar la base de datos con datos de prueba (solo la primera vez)
docker-compose exec api python -m scripts.init_db
```

### 2. Frontend (Visor Web)

El frontend corre localmente con Vite. Navega a la carpeta `hydro-viewer`:

```bash
# En una nueva terminal
cd hydro-viewer

# Instalar dependencias
npm install

# Correr el servidor de desarrollo
npm run dev
```

## 🔌 Puertos y Accesos

Una vez que todo esté corriendo:

| Servicio | URL | Descripción |
|----------|-----|-------------|
| **Frontend** | [http://localhost:5173](http://localhost:5173) | Interfaz de usuario principal |
| **Backend API** | [http://localhost:8000](http://localhost:8000) | API REST |
| **Documentación API** | [http://localhost:8000/docs](http://localhost:8000/docs) | Swagger UI (endpoints y pruebas) |
| **Base de Datos** | `localhost:5432` | PostgreSQL (User: `www-admin`, Pass: `hello!`, DB: `hidroponico`) |

## 🛠️ Estructura del Proyecto

- **`hydro_back/`**: Backend en Python (FastAPI) con PostgreSQL y SQLAlchemy.
- **`hydro-viewer/`**: Frontend en React + Vite.
- **`modelo_hidroponico_v2.json`**: Definición del modelo de datos original.

## ✨ Funcionalidades Principales

1.  **Infraestructura:** Visualización de mapa interactivo de sedes, bloques y espacios.
2.  **Agronomía:** Gestión de cultivos, variedades y recetas nutricionales.
3.  **Seguridad:** Bitácora de control de accesos.

---
> **Nota:** Si tienes problemas con la base de datos, puedes reiniciarla completamente con:
> `docker-compose down -v` (en la carpeta `hydro_back`) y luego volver al paso 1.

