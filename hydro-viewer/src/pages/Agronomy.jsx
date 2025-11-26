import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Plus, Sprout, Clock, Beaker, X, Save, Calendar, Droplet } from 'lucide-react';
import './Agronomy.css';

const Agronomy = () => {
    const [activeModal, setActiveModal] = useState(null); // 'new', 'recipe', null
    const [selectedCrop, setSelectedCrop] = useState(null);
    const [crops, setCrops] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recipe, setRecipe] = useState(null);
    const [recipeLoading, setRecipeLoading] = useState(false);

    useEffect(() => {
        const loadCrops = async () => {
            try {
                setLoading(true);
                const data = await api.getCultivos();
                setCrops(data);
            } catch (error) {
                console.error("Error loading crops:", error);
            } finally {
                setLoading(false);
            }
        };

        loadCrops();
    }, []);

    const handleOpenRecipe = async (crop) => {
        setSelectedCrop(crop);
        setActiveModal('recipe');
        setRecipe(null);
        
        if (crop.variedades && crop.variedades.length > 0) {
            try {
                setRecipeLoading(true);
                // Cargar receta de la primera variedad por defecto
                const recipeData = await api.getRecetaNutricional(crop.id, crop.variedades[0].id);
                setRecipe(recipeData);
            } catch (error) {
                console.error("Error loading recipe:", error);
            } finally {
                setRecipeLoading(false);
            }
        }
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setSelectedCrop(null);
        setRecipe(null);
    };

    const handleCreateCrop = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const newCropData = {
            nombre: formData.get('nombre'),
            variedad_nombre: formData.get('variedad'),
            dias_estimados: parseInt(formData.get('dias')) || 45,
            ec_objetivo: formData.get('ec') || "1.2 - 1.5",
            descripcion: "Nuevo cultivo registrado",
            nombre_cientifico: "",
        };

        try {
            await api.createCultivo(newCropData);
            // Recargar la lista de cultivos
            const data = await api.getCultivos();
            setCrops(data);
            handleCloseModal();
        } catch (error) {
            console.error("Error creating crop:", error);
            alert("Error al crear el cultivo. Revisa la consola.");
        }
    };

    return (
        <div className="agronomy-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>Biblioteca Agronómica</h1>
                    <p>Gestión de cultivos, variedades y recetas nutricionales</p>
                </div>
                <button
                    className="btn btn-primary"
                    onClick={() => setActiveModal('new')}
                >
                    <Plus size={18} />
                    Nuevo Cultivo
                </button>
            </div>

            <div className="crops-grid">
                {loading ? (
                    <div className="loading-state">Cargando cultivos...</div>
                ) : (
                    crops.map(crop => {
                        // Usar la primera variedad para mostrar en la tarjeta, o datos genéricos
                        const displayVariety = crop.variedades && crop.variedades.length > 0 
                            ? crop.variedades[0].nombre 
                            : "Estándar";
                        
                        // Usar imagen si existe, o un placeholder
                        const imageStyle = crop.image 
                            ? { backgroundImage: `url(${crop.image})` }
                            : { backgroundColor: '#e2e8f0' };

                        return (
                            <div key={crop.id} className="crop-card">
                                <div className="crop-image" style={imageStyle}>
                                    <div className="crop-overlay">
                                        <span className="crop-variety">{displayVariety}</span>
                                    </div>
                                </div>
                                <div className="crop-content">
                                    <h3>{crop.nombre}</h3>

                                    <div className="crop-stats">
                                        <div className="stat">
                                            <Clock size={16} />
                                            <span>45 días</span>
                                        </div>
                                        <div className="stat">
                                            <Beaker size={16} />
                                            <span>EC 1.2-1.8</span>
                                        </div>
                                    </div>

                                    <div className="crop-phases">
                                        <div className="phase-line"></div>
                                        <div className="phase-dot active" title="Germinación"></div>
                                        <div className="phase-dot" title="Crecimiento"></div>
                                        <div className="phase-dot" title="Cosecha"></div>
                                    </div>

                                    <button
                                        className="btn btn-outline full-width"
                                        onClick={() => handleOpenRecipe(crop)}
                                        disabled={!crop.variedades || crop.variedades.length === 0}
                                    >
                                        Ver Receta
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Modals */}
            {activeModal && (
                <div className="modal-overlay" onClick={handleCloseModal}>
                    <div className="modal-content" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={handleCloseModal}>
                            <X size={20} />
                        </button>

                        {activeModal === 'new' && (
                            <div className="modal-body">
                                <h2>Nuevo Cultivo</h2>
                                <p className="modal-subtitle">Registra una nueva variedad en el sistema</p>

                                <form className="crop-form" onSubmit={handleCreateCrop}>
                                    <div className="form-group">
                                        <label>Nombre del Cultivo</label>
                                        <input name="nombre" type="text" placeholder="Ej. Rúcula" className="form-input" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Variedad</label>
                                        <input name="variedad" type="text" placeholder="Ej. Selvática" className="form-input" required />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Días Estimados</label>
                                            <input name="dias" type="number" placeholder="45" className="form-input" />
                                        </div>
                                        <div className="form-group">
                                            <label>EC Objetivo</label>
                                            <input name="ec" type="text" placeholder="1.2 - 1.5" className="form-input" />
                                        </div>
                                    </div>
                                    <div className="form-actions">
                                        <button type="button" className="btn btn-outline" onClick={handleCloseModal}>Cancelar</button>
                                        <button type="submit" className="btn btn-primary">
                                            <Save size={18} />
                                            Guardar Cultivo
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {activeModal === 'recipe' && selectedCrop && (
                            <div className="modal-body">
                                <div className="recipe-header">
                                    <h2>Receta Nutricional</h2>
                                    <span className="recipe-crop">{selectedCrop.nombre}</span>
                                </div>

                                {recipeLoading ? (
                                    <div className="loading-state">Cargando receta...</div>
                                ) : recipe ? (
                                    <div className="timeline-container">
                                        {recipe.fases.map((fase, index) => (
                                            <div key={fase.id} className="timeline-item">
                                                <div className="timeline-marker">{index + 1}</div>
                                                <div className="timeline-content">
                                                    <h4>{fase.nombre}</h4>
                                                    <span className="duration">Días {fase.duracion_dias}</span>
                                                    
                                                    {fase.nutrientes.map(nutriente => (
                                                        <div key={nutriente.id} className="nutrient-card">
                                                            <Droplet size={14} className="icon-water" />
                                                            <span>{nutriente.nombre} ({nutriente.cantidad} {nutriente.unidad_medida})</span>
                                                        </div>
                                                    ))}
                                                    {fase.nutrientes.length === 0 && (
                                                        <div className="nutrient-card empty">
                                                            <span>Sin nutrientes específicos</span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="empty-state">No hay receta disponible</div>
                                )}

                                <div className="form-actions">
                                    <button className="btn btn-primary full-width" onClick={handleCloseModal}>Entendido</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Agronomy;
