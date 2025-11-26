import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Box, Maximize2, Info } from 'lucide-react';
import './Infrastructure.css';

const Infrastructure = () => {
    const { currentSede, changeSede, allSedes, loading, error } = useApp();
    const [selectedBloque, setSelectedBloque] = useState(null);
    const [selectedEspacio, setSelectedEspacio] = useState(null);
    const [hoveredStructure, setHoveredStructure] = useState(null);

    // Sync state when currentSede changes
    useEffect(() => {
        if (currentSede && currentSede.bloques && currentSede.bloques.length > 0) {
            const firstBloque = currentSede.bloques[0];
            setSelectedBloque(firstBloque);
            if (firstBloque.espacios && firstBloque.espacios.length > 0) {
                setSelectedEspacio(firstBloque.espacios[0]);
            } else {
                setSelectedEspacio(null);
            }
        } else {
            setSelectedBloque(null);
            setSelectedEspacio(null);
        }
    }, [currentSede]);

    if (loading) return <div className="loading-state">Cargando infraestructura...</div>;
    if (error) return <div className="error-state">Error: {error}</div>;

    // Scale factor for the map (pixels per meter)
    const SCALE = 20;

    return (
        <div className="infra-container">
            <div className="infra-sidebar">
                <div className="infra-header">
                    <h2>Explorador de Sede</h2>
                </div>

                <div className="tree-view">
                    {allSedes.map(sede => (
                        <div key={sede.id} className="tree-node sede-node">
                            <div
                                className={`node-label ${currentSede?.id === sede.id ? 'active' : ''}`}
                                onClick={() => changeSede(sede.id)}
                            >
                                <MapPin size={16} />
                                <span>{sede.nombre}</span>
                            </div>

                            {currentSede?.id === sede.id && currentSede.bloques && (
                                <div className="node-children">
                                    {currentSede.bloques.map(bloque => (
                                        <div key={bloque.id} className="tree-node bloque-node">
                                            <div
                                                className={`node-label ${selectedBloque?.id === bloque.id ? 'active' : ''}`}
                                                onClick={() => {
                                                    setSelectedBloque(bloque);
                                                    setSelectedEspacio(bloque.espacios && bloque.espacios.length > 0 ? bloque.espacios[0] : null);
                                                }}
                                            >
                                                <Box size={14} />
                                                <span>{bloque.nombre}</span>
                                            </div>

                                            {selectedBloque?.id === bloque.id && bloque.espacios && (
                                                <div className="node-children">
                                                    {bloque.espacios.map(espacio => (
                                                        <div
                                                            key={espacio.id}
                                                            className={`node-label espacio-label ${selectedEspacio?.id === espacio.id ? 'active' : ''}`}
                                                            onClick={() => setSelectedEspacio(espacio)}
                                                        >
                                                            <Maximize2 size={12} />
                                                            <span>{espacio.nombre}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="infra-content">
                {selectedEspacio ? (
                    <div className="digital-twin-viewer">
                        <div className="viewer-header">
                            <h3>{selectedEspacio.nombre} - Vista de Planta</h3>
                            <div className="legend">
                                <span className="legend-item"><span className="dot ok"></span> Normal</span>
                                <span className="legend-item"><span className="dot warning"></span> Atención</span>
                                <span className="legend-item"><span className="dot danger"></span> Crítico</span>
                            </div>
                        </div>

                        <div className="canvas-container">
                            <svg
                                width={selectedEspacio.ancho * SCALE}
                                height={selectedEspacio.largo * SCALE}
                                className="infra-map"
                            >
                                {/* Grid Background */}
                                <defs>
                                    <pattern id="grid" width={SCALE} height={SCALE} patternUnits="userSpaceOnUse">
                                        <path d={`M ${SCALE} 0 L 0 0 0 ${SCALE}`} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                                    </pattern>
                                </defs>
                                <rect width="100%" height="100%" fill="url(#grid)" />

                                {/* Structures */}
                                {selectedEspacio.estructuras.map(struct => (
                                    <g
                                        key={struct.id}
                                        transform={`translate(${struct.x * SCALE}, ${struct.y * SCALE})`}
                                        onMouseEnter={() => setHoveredStructure(struct)}
                                        onMouseLeave={() => setHoveredStructure(null)}
                                        className="structure-group"
                                    >
                                        <rect
                                            width={struct.ancho * SCALE}
                                            height={struct.largo * SCALE}
                                            className={`structure-rect ${struct.estado || 'ok'}`}
                                            rx={4}
                                        />
                                        <text
                                            x={(struct.ancho * SCALE) / 2}
                                            y={(struct.largo * SCALE) / 2}
                                            textAnchor="middle"
                                            dominantBaseline="middle"
                                            className="structure-label"
                                        >
                                            {struct.codigo}
                                        </text>
                                    </g>
                                ))}
                            </svg>

                            {hoveredStructure && (
                                <div
                                    className="tooltip-card"
                                    style={{
                                        left: (hoveredStructure.x * SCALE) + (hoveredStructure.ancho * SCALE) + 20,
                                        top: (hoveredStructure.y * SCALE)
                                    }}
                                >
                                    <div className="tooltip-header">
                                        <h4>{hoveredStructure.nombre}</h4>
                                        <span className={`status-badge ${hoveredStructure.estado || 'ok'}`}>{hoveredStructure.estado || 'Normal'}</span>
                                    </div>
                                    <div className="tooltip-body">
                                        <div className="tooltip-row">
                                            <span className="label">Cultivo:</span>
                                            <span className="value">{hoveredStructure.cultivo || 'Sin asignar'}</span>
                                        </div>
                                        <div className="tooltip-row">
                                            <span className="label">Fase:</span>
                                            <span className="value">{hoveredStructure.fase || '-'}</span>
                                        </div>
                                        <div className="tooltip-row">
                                            <span className="label">Día:</span>
                                            <span className="value">{hoveredStructure.dias || 0} / 45</span>
                                        </div>
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${((hoveredStructure.dias || 0) / 45) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className="empty-state">
                        <Info size={48} />
                        <p>Selecciona un espacio para ver el plano digital</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Infrastructure;
