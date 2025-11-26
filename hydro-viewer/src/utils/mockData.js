export const mockSedes = [
    {
        id: 1,
        nombre: "Sede Principal - Sabana",
        direccion: "Km 15 Vía Cota",
        bloques: [
            {
                id: 101,
                nombre: "Bloque A - Germinación",
                espacios: [
                    {
                        id: 201,
                        nombre: "Nave 1",
                        ancho: 20,
                        largo: 40,
                        estructuras: [
                            { id: 301, codigo: "M-01", nombre: "Mesa 1", tipo: "Mesa", x: 2, y: 2, ancho: 2, largo: 10, estado: "ok", cultivo: "Lechuga Crespa", fase: "Crecimiento", dias: 15 },
                            { id: 302, codigo: "M-02", nombre: "Mesa 2", tipo: "Mesa", x: 6, y: 2, ancho: 2, largo: 10, estado: "warning", cultivo: "Lechuga Romana", fase: "Germinación", dias: 5 },
                            { id: 303, codigo: "M-03", nombre: "Mesa 3", tipo: "Mesa", x: 10, y: 2, ancho: 2, largo: 10, estado: "ok", cultivo: "Albahaca", fase: "Cosecha", dias: 44 },
                            { id: 304, codigo: "M-04", nombre: "Mesa 4", tipo: "Mesa", x: 14, y: 2, ancho: 2, largo: 10, estado: "danger", cultivo: "Espinaca", fase: "Crecimiento", dias: 20 },
                        ]
                    },
                    {
                        id: 202,
                        nombre: "Nave 2",
                        ancho: 20,
                        largo: 40,
                        estructuras: [
                            { id: 305, codigo: "T-01", nombre: "Torre 1", tipo: "Torre", x: 5, y: 5, ancho: 1, largo: 1, estado: "ok", cultivo: "Fresas", fase: "Floración", dias: 60 },
                            { id: 306, codigo: "T-02", nombre: "Torre 2", tipo: "Torre", x: 8, y: 5, ancho: 1, largo: 1, estado: "ok", cultivo: "Fresas", fase: "Floración", dias: 62 },
                        ]
                    }
                ]
            },
            {
                id: 102,
                nombre: "Bloque B - Producción",
                espacios: []
            }
        ]
    },
    {
        id: 2,
        nombre: "Sede Norte - Medellín",
        direccion: "Vía Rionegro Km 5",
        bloques: [
            {
                id: 103,
                nombre: "Bloque C - Hidroponía Vertical",
                espacios: [
                    {
                        id: 203,
                        nombre: "Invernadero Vertical 1",
                        ancho: 15,
                        largo: 25,
                        estructuras: [
                            { id: 310, codigo: "V-01", nombre: "Muro Verde 1", tipo: "Muro", x: 2, y: 2, ancho: 1, largo: 8, estado: "ok", cultivo: "Menta", fase: "Cosecha", dias: 40 },
                            { id: 311, codigo: "V-02", nombre: "Muro Verde 2", tipo: "Muro", x: 5, y: 2, ancho: 1, largo: 8, estado: "ok", cultivo: "Hierbabuena", fase: "Crecimiento", dias: 25 },
                            { id: 312, codigo: "V-03", nombre: "Muro Verde 3", tipo: "Muro", x: 8, y: 2, ancho: 1, largo: 8, estado: "danger", cultivo: "Cilantro", fase: "Germinación", dias: 8 },
                            { id: 313, codigo: "V-04", nombre: "Muro Verde 4", tipo: "Muro", x: 11, y: 2, ancho: 1, largo: 8, estado: "warning", cultivo: "Perejil", fase: "Crecimiento", dias: 18 }
                        ]
                    }
                ]
            }
        ]
    }
];

export const mockCrops = [
    { id: 1, name: "Lechuga Crespa", variety: "Lollo Bionda", image: "https://images.unsplash.com/photo-1622206151226-18ca2c9ab4a1?auto=format&fit=crop&q=80&w=300" },
    { id: 2, name: "Albahaca", variety: "Genovesa", image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&q=80&w=300" },
    { id: 3, name: "Tomate Cherry", variety: "Sweet 100", image: "https://images.unsplash.com/photo-1592841200221-a6898f307baa?auto=format&fit=crop&q=80&w=300" },
];
