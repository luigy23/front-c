const API_URL = 'http://localhost:8000/api';

const fetchAPI = async (endpoint, options = {}) => {
    try {
        const response = await fetch(`${API_URL}${endpoint}`, {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers,
            },
            ...options,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        throw error;
    }
};

export const api = {
    // Infraestructura
    getSedes: () => fetchAPI('/sedes'),
    getSedeDetail: (id) => fetchAPI(`/sedes/${id}`),

    // Agronomía
    getCultivos: () => fetchAPI('/cultivos'),
    createCultivo: (data) => fetchAPI('/cultivos', {
        method: 'POST',
        body: JSON.stringify(data),
    }),
    getRecetaNutricional: (cultivoId, variedadId) => 
        fetchAPI(`/cultivos/${cultivoId}/variedades/${variedadId}/receta`),

    // Seguridad
    getAccesos: (limit = 50) => fetchAPI(`/accesos?limit=${limit}`),
};

