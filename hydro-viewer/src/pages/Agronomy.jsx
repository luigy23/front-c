import React, { useState } from 'react';
import { mockCrops } from '../utils/mockData';
import { Plus, Sprout, Clock, Beaker, X, Save, Calendar, Droplet } from 'lucide-react';
import './Agronomy.css';

const Agronomy = () => {
    const [activeModal, setActiveModal] = useState(null); // 'new', 'recipe', null
    const [selectedCrop, setSelectedCrop] = useState(null);

    const handleOpenRecipe = (crop) => {
        setSelectedCrop(crop);
        setActiveModal('recipe');
    };

    const handleCloseModal = () => {
        setActiveModal(null);
        setSelectedCrop(null);
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
                {mockCrops.map(crop => (
                    <div key={crop.id} className="crop-card">
                        <div className="crop-image" style={{ backgroundImage: `url(${crop.image})` }}>
                            <div className="crop-overlay">
                                <span className="crop-variety">{crop.variety}</span>
                            </div>
                        </div>
                        <div className="crop-content">
                            <h3>{crop.name}</h3>

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
                            >
                                Ver Receta
                            </button>
                        </div>
                    </div>
                ))}
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

                                <form className="crop-form" onSubmit={(e) => { e.preventDefault(); handleCloseModal(); }}>
                                    <div className="form-group">
                                        <label>Nombre del Cultivo</label>
                                        <input type="text" placeholder="Ej. Rúcula" className="form-input" />
                                    </div>
                                    <div className="form-group">
                                        <label>Variedad</label>
                                        <input type="text" placeholder="Ej. Selvática" className="form-input" />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Días Estimados</label>
                                            <input type="number" placeholder="45" className="form-input" />
                                        </div>
                                        <div className="form-group">
                                            <label>EC Objetivo</label>
                                            <input type="text" placeholder="1.2 - 1.5" className="form-input" />
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
                                    <span className="recipe-crop">{selectedCrop.name} - {selectedCrop.variety}</span>
                                </div>

                                <div className="timeline-container">
                                    <div className="timeline-item">
                                        <div className="timeline-marker">1</div>
                                        <div className="timeline-content">
                                            <h4>Germinación</h4>
                                            <span className="duration">Días 1-7</span>
                                            <div className="nutrient-card">
                                                <Droplet size={14} className="icon-water" />
                                                <span>Solución Start (0.8 EC)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-marker">2</div>
                                        <div className="timeline-content">
                                            <h4>Crecimiento Vegetativo</h4>
                                            <span className="duration">Días 8-30</span>
                                            <div className="nutrient-card">
                                                <Droplet size={14} className="icon-water" />
                                                <span>Solución Grow A+B (1.5 EC)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="timeline-item">
                                        <div className="timeline-marker">3</div>
                                        <div className="timeline-content">
                                            <h4>Cosecha</h4>
                                            <span className="duration">Días 31-45</span>
                                            <div className="nutrient-card">
                                                <Droplet size={14} className="icon-water" />
                                                <span>Lavado de Raíz (0.2 EC)</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

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
