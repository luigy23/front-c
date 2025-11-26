import React from 'react';
import { Shield, UserCheck, Clock, MapPin } from 'lucide-react';
import './Security.css';

const accessLogs = [
    { id: 1, user: "Juan Pérez", role: "Operario", location: "Bloque A - Germinación", time: "Hace 5 min", method: "Huella", status: "success" },
    { id: 2, user: "Maria Lopez", role: "Agrónomo", location: "Laboratorio", time: "Hace 12 min", method: "Facial", status: "success" },
    { id: 3, user: "Desconocido", role: "-", location: "Bodega Químicos", time: "Hace 45 min", method: "RFID", status: "denied" },
    { id: 4, user: "Carlos Ruiz", role: "Admin", location: "Sede Principal", time: "Hace 1 hora", method: "Huella", status: "success" },
];

const Security = () => {
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
                                                <span className="user-role">{log.role}</span>
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Security;
