"""
Script opcional para inicializar la base de datos con datos de ejemplo.
Ejecutar después de crear las tablas.
"""
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.models import (
    Empresa, Persona, Sede, Bloque, Espacio, TipoEspacio, Estructura, TipoEstructura,
    Usuario, AccesoEspacio, TipoCultivo, Cultivo, VariedadCultivo,
    FaseProduccion, CultivoFase, Nutriente, FaseNutriente
)
from datetime import datetime


def init_db():
    db: Session = SessionLocal()
    
    try:
        # Verificar si ya hay datos
        if db.query(Empresa).first():
            print("La base de datos ya tiene datos. Saltando inicialización.")
            return
        
        # 1. Empresa
        empresa = Empresa(nombre="HydroTech Colombia", nit="900123456-1", activo=True)
        db.add(empresa)
        db.flush()
        
        # 2. Personas
        persona1 = Persona(
            nombre="Juan", apellido="Pérez", documento="12345678",
            email="juan@hydrotech.com", telefono="3001234567", activo=True
        )
        persona2 = Persona(
            nombre="Maria", apellido="Lopez", documento="87654321",
            email="maria@hydrotech.com", telefono="3007654321", activo=True
        )
        db.add_all([persona1, persona2])
        db.flush()
        
        # 3. Sede
        sede = Sede(
            empresa_id=empresa.id,
            nombre="Sede Principal - Sabana",
            direccion="Km 15 Vía Cota",
            latitud=4.6097,
            longitud=-74.0817,
            responsable_id=persona1.id
        )
        db.add(sede)
        db.flush()
        
        # 4. Bloque
        bloque = Bloque(
            sede_id=sede.id,
            nombre="Bloque A - Germinación",
            descripcion="Bloque principal de germinación"
        )
        db.add(bloque)
        db.flush()
        
        # 5. Tipo Espacio
        tipo_espacio = TipoEspacio(
            nombre="Invernadero",
            descripcion="Espacio cerrado para cultivo controlado"
        )
        db.add(tipo_espacio)
        db.flush()
        
        # 6. Espacio
        espacio = Espacio(
            bloque_id=bloque.id,
            tipo_espacio_id=tipo_espacio.id,
            nombre="Nave 1",
            capacidad=1000,
            ancho=20.0,
            largo=40.0,
            alto=3.5
        )
        db.add(espacio)
        db.flush()
        
        # 7. Tipo Estructura
        tipo_estructura = TipoEstructura(
            nombre="Mesa",
            descripcion="Mesa de cultivo horizontal"
        )
        db.add(tipo_estructura)
        db.flush()
        
        # 8. Estructuras
        estructuras = [
            Estructura(
                espacio_id=espacio.id,
                tipo_estructura_id=tipo_estructura.id,
                codigo="M-01",
                nombre="Mesa 1",
                capacidad=200,
                ancho=2.0,
                largo=10.0,
                posicion_x=2.0,
                posicion_y=2.0
            ),
            Estructura(
                espacio_id=espacio.id,
                tipo_estructura_id=tipo_estructura.id,
                codigo="M-02",
                nombre="Mesa 2",
                capacidad=200,
                ancho=2.0,
                largo=10.0,
                posicion_x=6.0,
                posicion_y=2.0
            ),
        ]
        db.add_all(estructuras)
        db.flush()
        
        # 9. Usuario
        usuario = Usuario(
            persona_id=persona1.id,
            empresa_id=empresa.id,
            username="jperez",
            password_hash="hashed_password_here",  # En producción usar bcrypt
            auto_registro=False
        )
        db.add(usuario)
        db.flush()
        
        # 10. Acceso de ejemplo
        acceso = AccesoEspacio(
            usuario_id=usuario.id,
            espacio_id=espacio.id,
            fecha_acceso=datetime.now(),
            metodo_acceso="Huella"
        )
        db.add(acceso)
        
        # 11. Tipo Cultivo
        tipo_cultivo = TipoCultivo(
            nombre="Hoja Verde",
            descripcion="Cultivos de hojas verdes comestibles"
        )
        db.add(tipo_cultivo)
        db.flush()
        
        # 12. Cultivo
        cultivo = Cultivo(
            tipo_cultivo_id=tipo_cultivo.id,
            nombre="Lechuga",
            nombre_cientifico="Lactuca sativa",
            descripcion="Cultivo de lechuga"
        )
        db.add(cultivo)
        db.flush()
        
        # 13. Variedad
        variedad = VariedadCultivo(
            cultivo_id=cultivo.id,
            nombre="Crespa",
            descripcion="Lechuga crespa",
            caracteristicas="Hojas rizadas, textura crujiente"
        )
        db.add(variedad)
        db.flush()
        
        # 14. Fases
        fase1 = FaseProduccion(
            nombre="Germinación",
            duracion_estimada_dias=7,
            descripcion="Fase inicial de germinación"
        )
        fase2 = FaseProduccion(
            nombre="Crecimiento",
            duracion_estimada_dias=30,
            descripcion="Fase de crecimiento vegetativo"
        )
        fase3 = FaseProduccion(
            nombre="Cosecha",
            duracion_estimada_dias=8,
            descripcion="Fase final antes de cosecha"
        )
        db.add_all([fase1, fase2, fase3])
        db.flush()
        
        # 15. Cultivo Fases
        cultivo_fases = [
            CultivoFase(
                variedad_cultivo_id=variedad.id,
                fase_produccion_id=fase1.id,
                orden=1,
                duracion_dias=7
            ),
            CultivoFase(
                variedad_cultivo_id=variedad.id,
                fase_produccion_id=fase2.id,
                orden=2,
                duracion_dias=30
            ),
            CultivoFase(
                variedad_cultivo_id=variedad.id,
                fase_produccion_id=fase3.id,
                orden=3,
                duracion_dias=8
            ),
        ]
        db.add_all(cultivo_fases)
        db.flush()
        
        # 16. Nutrientes
        nutriente1 = Nutriente(
            nombre="Nitrato de Calcio",
            formula_quimica="Ca(NO3)2",
            descripcion="Fuente de calcio y nitrógeno"
        )
        nutriente2 = Nutriente(
            nombre="Fosfato Monopotásico",
            formula_quimica="KH2PO4",
            descripcion="Fuente de fósforo y potasio"
        )
        db.add_all([nutriente1, nutriente2])
        db.flush()
        
        # 17. Fase Nutrientes
        fase_nutriente = FaseNutriente(
            cultivo_fase_id=cultivo_fases[1].id,  # Fase de crecimiento
            nutriente_id=nutriente1.id,
            cantidad=2.0,
            unidad_medida="ml/L",
            frecuencia="Diaria"
        )
        db.add(fase_nutriente)
        
        db.commit()
        print("✅ Base de datos inicializada con datos de ejemplo")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error al inicializar: {e}")
        raise
    finally:
        db.close()


if __name__ == "__main__":
    init_db()

