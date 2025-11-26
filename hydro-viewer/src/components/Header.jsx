import React from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import './Header.css';

const Header = () => {
    return (
        <header className="main-header">
            <div className="header-left">
                <div className="sede-selector">
                    <span className="label">Sede:</span>
                    <button className="selector-btn">
                        Sede Principal - Bogotá
                        <ChevronDown size={16} />
                    </button>
                </div>
            </div>

            <div className="header-right">
                <div className="search-bar">
                    <Search size={18} className="search-icon" />
                    <input type="text" placeholder="Buscar..." />
                </div>

                <button className="icon-btn">
                    <Bell size={20} />
                    <span className="badge-dot"></span>
                </button>

                <div className="user-profile">
                    <div className="avatar">
                        <User size={20} />
                    </div>
                    <div className="user-info">
                        <span className="name">Admin User</span>
                        <span className="role">Administrador</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
