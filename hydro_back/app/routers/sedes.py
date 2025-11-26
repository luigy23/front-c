from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import Sede, Bloque, Espacio, Estructura, TipoEstructura
from app.schemas import SedeBase, SedeDetail, BloqueBase, EspacioBase, EstructuraBase

router = APIRouter()


@router.get("/sedes", response_model=List[SedeBase])
async def get_sedes(db: Session = Depends(get_db)):
    """Obtener todas las sedes"""
    sedes = db.query(Sede).all()
    return sedes


@router.get("/sedes/{sede_id}", response_model=SedeDetail)
async def get_sede_detail(sede_id: int, db: Session = Depends(get_db)):
    """Obtener sede con bloques, espacios y estructuras"""
    sede = db.query(Sede).filter(Sede.id == sede_id).first()
    
    if not sede:
        raise HTTPException(status_code=404, detail="Sede no encontrada")
    
    # Cargar bloques con espacios y estructuras
    bloques = (
        db.query(Bloque)
        .filter(Bloque.sede_id == sede_id)
        .options(
            joinedload(Bloque.espacios).joinedload(Espacio.estructuras).joinedload(Estructura.tipo_estructura)
        )
        .all()
    )
    
    # Construir respuesta con estructuras anidadas
    bloques_data = []
    for bloque in bloques:
        espacios_data = []
        for espacio in bloque.espacios:
            estructuras_data = []
            for estructura in espacio.estructuras:
                estructuras_data.append({
                    "id": estructura.id,
                    "codigo": estructura.codigo,
                    "nombre": estructura.nombre,
                    "capacidad": estructura.capacidad,
                    "ancho": estructura.ancho,
                    "largo": estructura.largo,
                    "x": estructura.posicion_x,  # Mapeado para frontend
                    "y": estructura.posicion_y,  # Mapeado para frontend
                    "tipo": estructura.tipo_estructura.nombre if estructura.tipo_estructura else None,
                    "estado": None,  # Por ahora null, se puede calcular después
                    "cultivo": None,  # Por ahora null, requiere relación adicional
                    "fase": None,  # Por ahora null, requiere relación adicional
                    "dias": None  # Por ahora null, requiere relación adicional
                })
            
            espacios_data.append({
                "id": espacio.id,
                "nombre": espacio.nombre,
                "capacidad": espacio.capacidad,
                "ancho": espacio.ancho,
                "largo": espacio.largo,
                "alto": espacio.alto,
                "ubicacion": espacio.ubicacion,
                "estructuras": estructuras_data
            })
        
        bloques_data.append({
            "id": bloque.id,
            "nombre": bloque.nombre,
            "descripcion": bloque.descripcion,
            "espacios": espacios_data
        })
    
    return {
        "id": sede.id,
        "nombre": sede.nombre,
        "direccion": sede.direccion,
        "latitud": sede.latitud,
        "longitud": sede.longitud,
        "bloques": bloques_data
    }

