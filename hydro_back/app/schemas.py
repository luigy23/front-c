from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


# Schemas para Infraestructura
class EstructuraBase(BaseModel):
    id: int
    codigo: str
    nombre: Optional[str] = None
    capacidad: Optional[int] = None
    ancho: Optional[float] = None
    largo: Optional[float] = None
    x: Optional[float] = None  # Mapeado desde posicion_x
    y: Optional[float] = None  # Mapeado desde posicion_y
    tipo: Optional[str] = None  # Mapeado desde tipo_estructura
    estado: Optional[str] = None  # "ok", "warning", "danger"
    cultivo: Optional[str] = None
    fase: Optional[str] = None
    dias: Optional[int] = None

    class Config:
        from_attributes = True


class EspacioBase(BaseModel):
    id: int
    nombre: str
    capacidad: Optional[int] = None
    ancho: Optional[float] = None
    largo: Optional[float] = None
    alto: Optional[float] = None
    ubicacion: Optional[str] = None
    estructuras: List[EstructuraBase] = []

    class Config:
        from_attributes = True


class BloqueBase(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str] = None
    espacios: List[EspacioBase] = []

    class Config:
        from_attributes = True


class SedeBase(BaseModel):
    id: int
    nombre: str
    direccion: Optional[str] = None
    latitud: Optional[float] = None
    longitud: Optional[float] = None

    class Config:
        from_attributes = True


class SedeDetail(SedeBase):
    bloques: List[BloqueBase] = []


# Schemas para Agronomía
class NutrienteBase(BaseModel):
    id: int
    nombre: str
    formula_quimica: Optional[str] = None
    cantidad: float
    unidad_medida: Optional[str] = None
    frecuencia: Optional[str] = None

    class Config:
        from_attributes = True


class FaseBase(BaseModel):
    id: int
    nombre: str
    duracion_dias: Optional[int] = None
    orden: int
    nutrientes: List[NutrienteBase] = []

    class Config:
        from_attributes = True


class VariedadBase(BaseModel):
    id: int
    nombre: str
    descripcion: Optional[str] = None
    caracteristicas: Optional[str] = None
    image: Optional[str] = None  # URL de imagen

    class Config:
        from_attributes = True


class CultivoBase(BaseModel):
    id: int
    nombre: str
    nombre_cientifico: Optional[str] = None
    descripcion: Optional[str] = None
    tipo_cultivo: Optional[str] = None
    image: Optional[str] = None  # URL de imagen

    class Config:
        from_attributes = True


class CultivoCreate(BaseModel):
    nombre: str
    nombre_cientifico: Optional[str] = None
    descripcion: Optional[str] = None
    tipo_cultivo_id: Optional[int] = None
    variedad_nombre: str  # Para crear una variedad inicial automáticamente
    dias_estimados: Optional[int] = 45  # Valor por defecto
    ec_objetivo: Optional[str] = "1.2 - 1.5"  # Valor por defecto


class CultivoDetail(CultivoBase):
    variedades: List[VariedadBase] = []


class RecetaNutricional(BaseModel):
    cultivo_id: int
    cultivo_nombre: str
    variedad_id: int
    variedad_nombre: str
    fases: List[FaseBase] = []

    class Config:
        from_attributes = True


# Schemas para Seguridad
class UsuarioAcceso(BaseModel):
    id: int
    nombre: str
    apellido: str
    email: Optional[str] = None

    class Config:
        from_attributes = True


class AccesoEspacioBase(BaseModel):
    id: int
    user: str  # Nombre completo concatenado
    role: Optional[str] = None  # Rol del usuario
    location: str  # Formato: "Bloque - Espacio"
    time: str  # Tiempo relativo formateado ("Hace X min")
    method: Optional[str] = None  # Mapeado desde metodo_acceso
    status: str = "success"  # "success" o "denied"

    class Config:
        from_attributes = True

