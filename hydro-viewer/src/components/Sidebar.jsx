import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Map,
    Sprout,
    ShieldCheck,
    Settings,
    LogOut
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = () => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
        { icon: Map, label: 'Infraestructura', path: '/infrastructure' },
        { icon: Sprout, label: 'Agronomía', path: '/agronomy' },
        { icon: ShieldCheck, label: 'Seguridad', path: '/security' },
    ];

    return (
        <aside className="main-sidebar">
            <div className="sidebar-brand">
                <div className="brand-logo">
                    <Sprout size={24} color="var(--accent-secondary)" />
                </div>
                <div className="brand-text">
                    <span className="brand-name">Hydro<span className="text-accent">Tech</span></span>
                    <span className="brand-version">v2.0</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        <item.icon size={20} />
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <button className="nav-item logout-btn">
                    <Settings size={20} />
                    <span>Configuración</span>
                </button>
                <button className="nav-item logout-btn">
                    <LogOut size={20} />
                    <span>Salir</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
