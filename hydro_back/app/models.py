from sqlalchemy import Column, Integer, String, Float, Boolean, ForeignKey, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


# Modelos base
class Empresa(Base):
    __tablename__ = "empresa"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(150), nullable=False)
    nit = Column(String(50))
    activo = Column(Boolean, default=True)
    
    sedes = relationship("Sede", back_populates="empresa")
    usuarios = relationship("Usuario", back_populates="empresa")


class Persona(Base):
    __tablename__ = "persona"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    apellido = Column(String(100), nullable=False)
    documento = Column(String(50))
    email = Column(String(150))
    telefono = Column(String(20))
    activo = Column(Boolean, default=True)
    
    usuarios = relationship("Usuario", back_populates="persona")
    sedes_responsable = relationship("Sede", back_populates="responsable")


class Sede(Base):
    __tablename__ = "sede"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    empresa_id = Column(Integer, ForeignKey("empresa.id"), nullable=False)
    nombre = Column(String(150), nullable=False)
    direccion = Column(String(200))
    latitud = Column(Float)
    longitud = Column(Float)
    responsable_id = Column(Integer, ForeignKey("persona.id"))
    
    empresa = relationship("Empresa", back_populates="sedes")
    responsable = relationship("Persona", back_populates="sedes_responsable")
    bloques = relationship("Bloque", back_populates="sede", cascade="all, delete-orphan")


class Bloque(Base):
    __tablename__ = "bloque"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    sede_id = Column(Integer, ForeignKey("sede.id"), nullable=False)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    
    sede = relationship("Sede", back_populates="bloques")
    espacios = relationship("Espacio", back_populates="bloque", cascade="all, delete-orphan")


class TipoEspacio(Base):
    __tablename__ = "tipo_espacio"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    
    espacios = relationship("Espacio", back_populates="tipo_espacio")


class Espacio(Base):
    __tablename__ = "espacio"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    bloque_id = Column(Integer, ForeignKey("bloque.id"), nullable=False)
    tipo_espacio_id = Column(Integer, ForeignKey("tipo_espacio.id"))
    nombre = Column(String(100), nullable=False)
    capacidad = Column(Integer)
    ancho = Column(Float)
    largo = Column(Float)
    alto = Column(Float)
    ubicacion = Column(String(200))
    
    bloque = relationship("Bloque", back_populates="espacios")
    tipo_espacio = relationship("TipoEspacio", back_populates="espacios")
    estructuras = relationship("Estructura", back_populates="espacio", cascade="all, delete-orphan")
    accesos = relationship("AccesoEspacio", back_populates="espacio")


class TipoEstructura(Base):
    __tablename__ = "tipo_estructura"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    
    estructuras = relationship("Estructura", back_populates="tipo_estructura")


class Estructura(Base):
    __tablename__ = "estructura"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    espacio_id = Column(Integer, ForeignKey("espacio.id"), nullable=False)
    tipo_estructura_id = Column(Integer, ForeignKey("tipo_estructura.id"))
    codigo = Column(String(50), nullable=False)
    nombre = Column(String(100))
    capacidad = Column(Integer)
    ancho = Column(Float)
    largo = Column(Float)
    posicion_x = Column(Float)
    posicion_y = Column(Float)
    
    espacio = relationship("Espacio", back_populates="estructuras")
    tipo_estructura = relationship("TipoEstructura", back_populates="estructuras")


# Modelos de usuarios y seguridad
class Usuario(Base):
    __tablename__ = "usuario"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    persona_id = Column(Integer, ForeignKey("persona.id"), nullable=False)
    empresa_id = Column(Integer, ForeignKey("empresa.id"), nullable=False)
    username = Column(String(50), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)
    auto_registro = Column(Boolean, default=False)
    fecha_creacion = Column(DateTime(timezone=True), server_default=func.now())
    ultimo_cambio_clave = Column(DateTime(timezone=True))
    
    persona = relationship("Persona", back_populates="usuarios")
    empresa = relationship("Empresa", back_populates="usuarios")
    accesos = relationship("AccesoEspacio", back_populates="usuario")


class AccesoEspacio(Base):
    __tablename__ = "acceso_espacio"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    usuario_id = Column(Integer, ForeignKey("usuario.id"), nullable=False)
    espacio_id = Column(Integer, ForeignKey("espacio.id"), nullable=False)
    fecha_acceso = Column(DateTime(timezone=True), server_default=func.now())
    metodo_acceso = Column(String(50))
    
    usuario = relationship("Usuario", back_populates="accesos")
    espacio = relationship("Espacio", back_populates="accesos")


# Modelos de cultivos
class TipoCultivo(Base):
    __tablename__ = "tipo_cultivo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    
    cultivos = relationship("Cultivo", back_populates="tipo_cultivo")


class Cultivo(Base):
    __tablename__ = "cultivo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    tipo_cultivo_id = Column(Integer, ForeignKey("tipo_cultivo.id"))
    nombre = Column(String(100), nullable=False)
    nombre_cientifico = Column(String(150))
    descripcion = Column(String(255))
    
    tipo_cultivo = relationship("TipoCultivo", back_populates="cultivos")
    variedades = relationship("VariedadCultivo", back_populates="cultivo", cascade="all, delete-orphan")


class VariedadCultivo(Base):
    __tablename__ = "variedad_cultivo"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    cultivo_id = Column(Integer, ForeignKey("cultivo.id"), nullable=False)
    nombre = Column(String(100), nullable=False)
    descripcion = Column(String(255))
    caracteristicas = Column(String(500))
    
    cultivo = relationship("Cultivo", back_populates="variedades")
    fases = relationship("CultivoFase", back_populates="variedad_cultivo", cascade="all, delete-orphan")


class FaseProduccion(Base):
    __tablename__ = "fase_produccion"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    duracion_estimada_dias = Column(Integer)
    descripcion = Column(String(255))
    
    cultivo_fases = relationship("CultivoFase", back_populates="fase_produccion")


class CultivoFase(Base):
    __tablename__ = "cultivo_fase"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    variedad_cultivo_id = Column(Integer, ForeignKey("variedad_cultivo.id"), nullable=False)
    fase_produccion_id = Column(Integer, ForeignKey("fase_produccion.id"), nullable=False)
    orden = Column(Integer, nullable=False)
    duracion_dias = Column(Integer)
    
    variedad_cultivo = relationship("VariedadCultivo", back_populates="fases")
    fase_produccion = relationship("FaseProduccion", back_populates="cultivo_fases")
    nutrientes = relationship("FaseNutriente", back_populates="cultivo_fase", cascade="all, delete-orphan")


class Nutriente(Base):
    __tablename__ = "nutriente"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    formula_quimica = Column(String(100))
    descripcion = Column(String(255))
    
    fase_nutrientes = relationship("FaseNutriente", back_populates="nutriente")


class FaseNutriente(Base):
    __tablename__ = "fase_nutriente"
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    cultivo_fase_id = Column(Integer, ForeignKey("cultivo_fase.id"), nullable=False)
    nutriente_id = Column(Integer, ForeignKey("nutriente.id"), nullable=False)
    cantidad = Column(Float, nullable=False)
    unidad_medida = Column(String(20))
    frecuencia = Column(String(50))
    
    cultivo_fase = relationship("CultivoFase", back_populates="nutrientes")
    nutriente = relationship("Nutriente", back_populates="fase_nutrientes")

