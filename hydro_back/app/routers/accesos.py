from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session, joinedload
from sqlalchemy import desc
from datetime import datetime, timezone
from app.database import get_db
from app.models import AccesoEspacio, Usuario, Persona, Espacio, Bloque
from app.schemas import AccesoEspacioBase, UsuarioAcceso

router = APIRouter()


def format_relative_time(fecha: datetime) -> str:
    """Formatea una fecha a tiempo relativo (Hace X min/hora)"""
    if not fecha:
        return "Desconocido"
    
    now = datetime.now(timezone.utc)
    if fecha.tzinfo is None:
        fecha = fecha.replace(tzinfo=timezone.utc)
    
    diff = now - fecha
    
    if diff.total_seconds() < 60:
        return "Hace menos de 1 min"
    elif diff.total_seconds() < 3600:
        minutos = int(diff.total_seconds() / 60)
        return f"Hace {minutos} min"
    elif diff.total_seconds() < 86400:
        horas = int(diff.total_seconds() / 3600)
        return f"Hace {horas} hora{'s' if horas > 1 else ''}"
    else:
        dias = int(diff.total_seconds() / 86400)
        return f"Hace {dias} día{'s' if dias > 1 else ''}"


@router.get("/accesos", response_model=List[AccesoEspacioBase])
async def get_accesos(
    limit: int = Query(default=50, le=100),
    db: Session = Depends(get_db)
):
    """Obtener bitácora de accesos recientes"""
    accesos = (
        db.query(AccesoEspacio)
        .options(
            joinedload(AccesoEspacio.usuario).joinedload(Usuario.persona),
            joinedload(AccesoEspacio.espacio).joinedload(Espacio.bloque)
        )
        .order_by(desc(AccesoEspacio.fecha_acceso))
        .limit(limit)
        .all()
    )
    
    result = []
    for acceso in accesos:
        usuario = acceso.usuario.persona
        espacio = acceso.espacio
        bloque = espacio.bloque if espacio else None
        
        # Construir nombre completo
        nombre_completo = f"{usuario.nombre} {usuario.apellido}".strip()
        
        # Construir location
        if bloque and espacio:
            location = f"{bloque.nombre} - {espacio.nombre}"
        elif espacio:
            location = espacio.nombre
        else:
            location = "Ubicación desconocida"
        
        # Formatear tiempo relativo
        tiempo_relativo = format_relative_time(acceso.fecha_acceso)
        
        # Status: por defecto success, se puede mejorar con lógica adicional
        status = "success"
        
        result.append({
            "id": acceso.id,
            "user": nombre_completo,
            "role": None,  # Por ahora null, requiere consulta a usuario_rol
            "location": location,
            "time": tiempo_relativo,
            "method": acceso.metodo_acceso,
            "status": status
        })
    
    return result

