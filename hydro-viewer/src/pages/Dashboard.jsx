import React from 'react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area
} from 'recharts';
import { Activity, Droplets, Thermometer, Wind } from 'lucide-react';
import './Dashboard.css';

const data = [
    { name: 'Lun', ph: 6.2, ec: 1.2 },
    { name: 'Mar', ph: 6.1, ec: 1.3 },
    { name: 'Mie', ph: 6.3, ec: 1.2 },
    { name: 'Jue', ph: 6.0, ec: 1.4 },
    { name: 'Vie', ph: 6.2, ec: 1.3 },
    { name: 'Sab', ph: 6.4, ec: 1.2 },
    { name: 'Dom', ph: 6.3, ec: 1.3 },
];

const StatCard = ({ title, value, unit, icon: Icon, color, trend }) => (
    <div className="stat-card">
        <div className="stat-header">
            <div className="stat-icon" style={{ background: `rgba(${color}, 0.1)`, color: `rgb(${color})` }}>
                <Icon size={20} />
            </div>
            <span className="stat-trend positive">{trend}</span>
        </div>
        <div className="stat-content">
            <span className="stat-value">{value}</span>
            <span className="stat-unit">{unit}</span>
        </div>
        <span className="stat-title">{title}</span>
    </div>
);

const Dashboard = () => {
    return (
        <div className="dashboard-container">
            <div className="page-header">
                <h1>Dashboard General</h1>
                <p>Resumen de operaciones en tiempo real</p>
            </div>

            <div className="stats-grid">
                <StatCard
                    title="Temperatura Promedio"
                    value="24.5"
                    unit="°C"
                    icon={Thermometer}
                    color="248, 113, 113"
                    trend="+1.2%"
                />
                <StatCard
                    title="Humedad Relativa"
                    value="68"
                    unit="%"
                    icon={Droplets}
                    color="56, 189, 248"
                    trend="-0.5%"
                />
                <StatCard
                    title="Nivel de CO2"
                    value="450"
                    unit="ppm"
                    icon={Wind}
                    color="168, 85, 247"
                    trend="Normal"
                />
                <StatCard
                    title="Actividad de Riego"
                    value="Active"
                    unit=""
                    icon={Activity}
                    color="74, 222, 128"
                    trend="En curso"
                />
            </div>

            <div className="charts-section">
                <div className="chart-card">
                    <h3>Niveles de pH y Electroconductividad</h3>
                    <div className="chart-wrapper">
                        <ResponsiveContainer width="100%" height={300}>
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#38bdf8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                                <XAxis dataKey="name" stroke="#94a3b8" />
                                <YAxis stroke="#94a3b8" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
                                />
                                <Area type="monotone" dataKey="ph" stroke="#38bdf8" fillOpacity={1} fill="url(#colorPh)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="tasks-card">
                    <h3>Próximas Tareas</h3>
                    <ul className="task-list">
                        <li className="task-item urgent">
                            <div className="task-time">09:00</div>
                            <div className="task-info">
                                <span className="task-name">Revisión de pH - Bloque A</span>
                                <span className="task-assignee">Asignado a: Juan Pérez</span>
                            </div>
                            <span className="task-status">Pendiente</span>
                        </li>
                        <li className="task-item">
                            <div className="task-time">11:30</div>
                            <div className="task-info">
                                <span className="task-name">Aplicación Nutriente B</span>
                                <span className="task-assignee">Asignado a: Maria L.</span>
                            </div>
                            <span className="task-status">En espera</span>
                        </li>
                        <li className="task-item">
                            <div className="task-time">14:00</div>
                            <div className="task-info">
                                <span className="task-name">Cosecha Lechuga Romana</span>
                                <span className="task-assignee">Equipo 2</span>
                            </div>
                            <span className="task-status">Programado</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
