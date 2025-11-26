import React from 'react';
import { mockCrops } from '../utils/mockData';
import { Plus, Sprout, Clock, Beaker } from 'lucide-react';
import './Agronomy.css';

const Agronomy = () => {
    return (
        <div className="agronomy-container">
            <div className="page-header">
                <div className="header-content">
                    <h1>Biblioteca Agronómica</h1>
                    <p>Gestión de cultivos, variedades y recetas nutricionales</p>
                </div>
                <button className="btn btn-primary">
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

                            <button className="btn btn-outline full-width">Ver Receta</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Agronomy;
