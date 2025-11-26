import React, { createContext, useState, useContext, useEffect } from 'react';
import { api } from '../services/api';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentSede, setCurrentSede] = useState(null);
    const [allSedes, setAllSedes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Cargar sedes iniciales
    useEffect(() => {
        const loadSedes = async () => {
            try {
                setLoading(true);
                const sedes = await api.getSedes();
                setAllSedes(sedes);
                
                if (sedes.length > 0) {
                    // Cargar detalle de la primera sede
                    await changeSede(sedes[0].id);
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        loadSedes();
    }, []);

    const changeSede = async (sedeId) => {
        try {
            const sedeDetail = await api.getSedeDetail(sedeId);
            setCurrentSede(sedeDetail);
        } catch (err) {
            console.error("Error loading sede details:", err);
            // Mantener la sede actual o mostrar error
        }
    };

    return (
        <AppContext.Provider value={{ currentSede, changeSede, allSedes, loading, error }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
