import React, { createContext, useState, useContext } from 'react';
import { mockSedes } from '../utils/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [currentSede, setCurrentSede] = useState(mockSedes[0]);

    const changeSede = (sedeId) => {
        const sede = mockSedes.find(s => s.id === sedeId);
        if (sede) {
            setCurrentSede(sede);
        }
    };

    return (
        <AppContext.Provider value={{ currentSede, changeSede, allSedes: mockSedes }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);
