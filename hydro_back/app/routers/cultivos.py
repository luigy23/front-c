from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session, joinedload
from app.database import get_db
from app.models import (
    Cultivo, VariedadCultivo, TipoCultivo,
    CultivoFase, FaseProduccion, FaseNutriente, Nutriente
)
from app.schemas import (
    CultivoBase, CultivoDetail, VariedadBase, RecetaNutricional, FaseBase, NutrienteBase,
    CultivoCreate
)

router = APIRouter()


@router.post("/cultivos", response_model=CultivoDetail)
async def create_cultivo(cultivo_in: CultivoCreate, db: Session = Depends(get_db)):
    """Crear nuevo cultivo con variedad inicial"""
    # 1. Verificar si existe tipo de cultivo por defecto o crear uno
    tipo_cultivo = db.query(TipoCultivo).filter(TipoCultivo.nombre == "General").first()
    if not tipo_cultivo:
        tipo_cultivo = TipoCultivo(nombre="General", descripcion="Tipo general")
        db.add(tipo_cultivo)
        db.flush()
    
    # 2. Crear Cultivo
    cultivo = Cultivo(
        nombre=cultivo_in.nombre,
        nombre_cientifico=cultivo_in.nombre_cientifico,
        descripcion=cultivo_in.descripcion,
        tipo_cultivo_id=cultivo_in.tipo_cultivo_id or tipo_cultivo.id
    )
    db.add(cultivo)
    db.flush()
    
    # 3. Crear Variedad inicial
    variedad = VariedadCultivo(
        cultivo_id=cultivo.id,
        nombre=cultivo_in.variedad_nombre,
        descripcion=f"Variedad inicial de {cultivo_in.nombre}",
        caracteristicas=f"EC Objetivo: {cultivo_in.ec_objetivo}"
    )
    db.add(variedad)
    db.flush()
    
    # 4. Crear fases básicas por defecto
    fases_default = [
        ("Germinación", 7),
        ("Crecimiento", 30),
        ("Cosecha", cultivo_in.dias_estimados - 37 if cultivo_in.dias_estimados > 37 else 8)
    ]
    
    for idx, (nombre, dias) in enumerate(fases_default):
        # Buscar o crear fase
        fase = db.query(FaseProduccion).filter(FaseProduccion.nombre == nombre).first()
        if not fase:
            fase = FaseProduccion(nombre=nombre, duracion_estimada_dias=dias)
            db.add(fase)
            db.flush()
            
        cultivo_fase = CultivoFase(
            variedad_cultivo_id=variedad.id,
            fase_produccion_id=fase.id,
            orden=idx + 1,
            duracion_dias=dias
        )
        db.add(cultivo_fase)
    
    db.commit()
    db.refresh(cultivo)
    
    # Construir respuesta
    variedades_data = [{
        "id": variedad.id,
        "nombre": variedad.nombre,
        "descripcion": variedad.descripcion,
        "caracteristicas": variedad.caracteristicas,
        "image": None
    }]
    
    return {
        "id": cultivo.id,
        "nombre": cultivo.nombre,
        "nombre_cientifico": cultivo.nombre_cientifico,
        "descripcion": cultivo.descripcion,
        "tipo_cultivo": tipo_cultivo.nombre,
        "image": None,
        "variedades": variedades_data
    }


@router.get("/cultivos", response_model=List[CultivoDetail])
async def get_cultivos(db: Session = Depends(get_db)):
    """Obtener todos los cultivos con sus variedades"""
    cultivos = (
        db.query(Cultivo)
        .options(joinedload(Cultivo.tipo_cultivo), joinedload(Cultivo.variedades))
        .all()
    )
    
    result = []
    for cultivo in cultivos:
        variedades_data = [
            {
                "id": v.id,
                "nombre": v.nombre,
                "descripcion": v.descripcion,
                "caracteristicas": v.caracteristicas,
                "image": None  # Por ahora null, se puede agregar campo en BD después
            }
            for v in cultivo.variedades
        ]
        
        result.append({
            "id": cultivo.id,
            "nombre": cultivo.nombre,
            "nombre_cientifico": cultivo.nombre_cientifico,
            "descripcion": cultivo.descripcion,
            "tipo_cultivo": cultivo.tipo_cultivo.nombre if cultivo.tipo_cultivo else None,
            "image": None,  # Por ahora null, se puede agregar campo en BD después
            "variedades": variedades_data
        })
    
    return result


@router.get("/cultivos/{cultivo_id}/variedades/{variedad_id}/receta", response_model=RecetaNutricional)
async def get_receta_nutricional(
    cultivo_id: int,
    variedad_id: int,
    db: Session = Depends(get_db)
):
    """Obtener receta nutricional de una variedad de cultivo"""
    # Verificar que la variedad pertenece al cultivo
    variedad = (
        db.query(VariedadCultivo)
        .filter(
            VariedadCultivo.id == variedad_id,
            VariedadCultivo.cultivo_id == cultivo_id
        )
        .first()
    )
    
    if not variedad:
        raise HTTPException(
            status_code=404,
            detail="Variedad no encontrada o no pertenece al cultivo especificado"
        )
    
    cultivo = db.query(Cultivo).filter(Cultivo.id == cultivo_id).first()
    if not cultivo:
        raise HTTPException(status_code=404, detail="Cultivo no encontrado")
    
    # Obtener fases ordenadas
    cultivo_fases = (
        db.query(CultivoFase)
        .filter(CultivoFase.variedad_cultivo_id == variedad_id)
        .options(
            joinedload(CultivoFase.fase_produccion),
            joinedload(CultivoFase.nutrientes).joinedload(FaseNutriente.nutriente)
        )
        .order_by(CultivoFase.orden)
        .all()
    )
    
    fases_data = []
    for cf in cultivo_fases:
        nutrientes_data = []
        for fn in cf.nutrientes:
            nutrientes_data.append({
                "id": fn.nutriente.id,
                "nombre": fn.nutriente.nombre,
                "formula_quimica": fn.nutriente.formula_quimica,
                "cantidad": fn.cantidad,
                "unidad_medida": fn.unidad_medida,
                "frecuencia": fn.frecuencia
            })
        
        fases_data.append({
            "id": cf.fase_produccion.id,
            "nombre": cf.fase_produccion.nombre,
            "duracion_dias": cf.duracion_dias or cf.fase_produccion.duracion_estimada_dias,
            "orden": cf.orden,
            "nutrientes": nutrientes_data
        })
    
    return {
        "cultivo_id": cultivo.id,
        "cultivo_nombre": cultivo.nombre,
        "variedad_id": variedad.id,
        "variedad_nombre": variedad.nombre,
        "fases": fases_data
    }

