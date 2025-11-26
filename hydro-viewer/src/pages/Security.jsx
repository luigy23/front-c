import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Shield, UserCheck, Clock, MapPin } from 'lucide-react';
import './Security.css';

const Security = () => {
    const [accessLogs, setAccessLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAccesos = async () => {
            try {
                setLoading(true);
                const logs = await api.getAccesos();
                setAccessLogs(logs);
            } catch (error) {
                console.error("Error loading access logs:", error);
            } finally {
                setLoading(false);
            }
        };

        loadAccesos();
    }, []);

    return (
        <div className="security-container">
            <div className="page-header">
                <h1>Centro de Seguridad</h1>
                <p>Control de acceso y monitoreo de personal</p>
            </div>

            <div className="security-stats">
                <div className="sec-stat-card">
                    <div className="sec-icon success">
                        <UserCheck size={24} />
                    </div>
                    <div className="sec-info">
                        <span className="sec-value">142</span>
                        <span className="sec-label">Usuarios Activos</span>
                    </div>
                </div>
                <div className="sec-stat-card">
                    <div className="sec-icon warning">
                        <Shield size={24} />
                    </div>
                    <div className="sec-info">
                        <span className="sec-value">3</span>
                        <span className="sec-label">Intentos Fallidos</span>
                    </div>
                </div>
            </div>

            <div className="logs-section">
                <h3>Bitácora de Accesos Recientes</h3>
                {loading ? (
                    <div className="loading-state">Cargando bitácora...</div>
                ) : (
                    <div className="table-responsive">
                        <table className="logs-table">
                            <thead>
                                <tr>
                                    <th>Usuario</th>
                                    <th>Ubicación</th>
                                    <th>Hora</th>
                                    <th>Método</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {accessLogs.map(log => (
                                    <tr key={log.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="user-avatar">{log.user.charAt(0)}</div>
                                                <div className="user-details">
                                                    <span className="user-name">{log.user}</span>
                                                    <span className="user-role">{log.role || '-'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="location-cell">
                                                <MapPin size={14} />
                                                {log.location}
                                            </div>
                                        </td>
                                        <td>
                                            <div className="time-cell">
                                                <Clock size={14} />
                                                {log.time}
                                            </div>
                                        </td>
                                        <td>
                                            <span className="method-badge">{log.method}</span>
                                        </td>
                                        <td>
                                            <span className={`status-pill ${log.status}`}>
                                                {log.status === 'success' ? 'Autorizado' : 'Denegado'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {accessLogs.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="empty-table">No hay registros recientes</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Security;
