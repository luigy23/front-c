import React, { useState } from 'react';
import { Bell, Search, User, ChevronDown } from 'lucide-react';
import { useApp } from '../context/AppContext';
import './Header.css';

const Header = () => {
    const { currentSede, changeSede, allSedes } = useApp();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    return (
        <header className="main-header">
            <div className="header-left">
                <div className="sede-selector">
                    <span className="label">Sede:</span>
                    <div className="dropdown-container">
                        <button
                            className="selector-btn"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        >
                            {currentSede.nombre}
                            <ChevronDown size={16} />
                        </button>

                        {isDropdownOpen && (
                            <div className="dropdown-menu">
                                {allSedes.map(sede => (
                                    <div
                                        key={sede.id}
                                        className={`dropdown-item ${currentSede.id === sede.id ? 'active' : ''}`}
                                        onClick={() => {
                                            changeSede(sede.id);
                                            setIsDropdownOpen(false);
                                        }}
                                    >
                                        {sede.nombre}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
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
