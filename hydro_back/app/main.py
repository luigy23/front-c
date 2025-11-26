from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import engine, Base
from app.routers import sedes, cultivos, accesos

# Crear tablas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HydroTech API",
    description="API para sistema de gestión hidropónica",
    version="2.0.0"
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(sedes.router, prefix="/api", tags=["Infraestructura"])
app.include_router(cultivos.router, prefix="/api", tags=["Agronomía"])
app.include_router(accesos.router, prefix="/api", tags=["Seguridad"])


@app.get("/")
async def root():
    return {"message": "HydroTech API v2.0", "status": "running"}


@app.get("/health")
async def health():
    return {"status": "healthy"}

