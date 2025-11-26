# HydroTech Backend API

Backend FastAPI para el sistema de gestión hidropónica.

## Características

- FastAPI con SQLAlchemy ORM
- Base de datos PostgreSQL
- Dockerizado con docker-compose
- Endpoints para:
  - Infraestructura (Sedes, Bloques, Espacios, Estructuras)
  - Agronomía (Cultivos, Variedades, Recetas Nutricionales)
  - Seguridad (Control de Accesos)

## Instalación y Uso

### Con Docker (Recomendado)

```bash
# Construir y levantar servicios
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Detener servicios
docker-compose down
```

### Sin Docker

```bash
# Instalar dependencias
pip install -r requirements.txt

# Asegúrate de tener PostgreSQL corriendo
# Crear archivo .env con:
# DATABASE_URL=postgresql://www-admin:hello!@localhost:5432/hidroponico

# Ejecutar servidor
uvicorn app.main:app --reload
```

## Endpoints

### Infraestructura

- `GET /api/sedes` - Listar todas las sedes
- `GET /api/sedes/{sede_id}` - Obtener sede con bloques, espacios y estructuras

### Agronomía

- `GET /api/cultivos` - Listar todos los cultivos con variedades
- `GET /api/cultivos/{cultivo_id}/variedades/{variedad_id}/receta` - Obtener receta nutricional

### Seguridad

- `GET /api/accesos?limit=50` - Obtener bitácora de accesos recientes

## Inicializar Base de Datos con Datos de Ejemplo

```bash
# Con Docker
docker-compose exec api python -m scripts.init_db

# Sin Docker
python -m scripts.init_db
```

## Documentación

Una vez corriendo, accede a:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

