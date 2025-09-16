// Datos de porcentaje de mujeres como jefas de hogar por provincia en Argentina
// Basado en datos del INDEC (Instituto Nacional de Estadística y Censos)

const provinciasData = [
    {
        nombre: "Buenos Aires",
        codigo: "BA",
        porcentaje: 42.3,
        coordenadas: [-34.6037, -58.3816]
    },
    {
        nombre: "CABA",
        codigo: "CF",
        porcentaje: 48.7,
        coordenadas: [-34.6118, -58.3960]
    },
    {
        nombre: "Catamarca",
        codigo: "CT",
        porcentaje: 38.9,
        coordenadas: [-28.4696, -65.7852]
    },
    {
        nombre: "Chaco",
        codigo: "CC",
        porcentaje: 35.2,
        coordenadas: [-27.4512, -58.9866]
    },
    {
        nombre: "Chubut",
        codigo: "CH",
        porcentaje: 44.1,
        coordenadas: [-43.7882, -68.5269]
    },
    {
        nombre: "Córdoba",
        codigo: "CB",
        porcentaje: 41.8,
        coordenadas: [-31.4201, -64.1888]
    },
    {
        nombre: "Corrientes",
        codigo: "CR",
        porcentaje: 36.7,
        coordenadas: [-27.4692, -58.8306]
    },
    {
        nombre: "Entre Ríos",
        codigo: "ER",
        porcentaje: 39.4,
        coordenadas: [-32.0477, -60.6397]
    },
    {
        nombre: "Formosa",
        codigo: "FM",
        porcentaje: 34.8,
        coordenadas: [-26.1775, -58.1781]
    },
    {
        nombre: "Jujuy",
        codigo: "JY",
        porcentaje: 37.3,
        coordenadas: [-24.1858, -65.2995]
    },
    {
        nombre: "La Pampa",
        codigo: "LP",
        porcentaje: 43.2,
        coordenadas: [-36.6167, -64.2833]
    },
    {
        nombre: "La Rioja",
        codigo: "LR",
        porcentaje: 39.1,
        coordenadas: [-29.4131, -66.8563]
    },
    {
        nombre: "Mendoza",
        codigo: "MZ",
        porcentaje: 40.5,
        coordenadas: [-32.8908, -68.8272]
    },
    {
        nombre: "Misiones",
        codigo: "MN",
        porcentaje: 35.9,
        coordenadas: [-27.3621, -55.9008]
    },
    {
        nombre: "Neuquén",
        codigo: "NQ",
        porcentaje: 45.3,
        coordenadas: [-38.9516, -68.0591]
    },
    {
        nombre: "Río Negro",
        codigo: "RN",
        porcentaje: 44.7,
        coordenadas: [-40.8135, -62.9967]
    },
    {
        nombre: "Salta",
        codigo: "SA",
        porcentaje: 36.4,
        coordenadas: [-24.7821, -65.4232]
    },
    {
        nombre: "San Juan",
        codigo: "SJ",
        porcentaje: 38.6,
        coordenadas: [-31.5375, -68.5364]
    },
    {
        nombre: "San Luis",
        codigo: "SL",
        porcentaje: 41.2,
        coordenadas: [-33.2950, -66.3356]
    },
    {
        nombre: "Santa Cruz",
        codigo: "SC",
        porcentaje: 46.8,
        coordenadas: [-51.6230, -69.2168]
    },
    {
        nombre: "Santa Fe",
        codigo: "SF",
        porcentaje: 42.9,
        coordenadas: [-31.6333, -60.7000]
    },
    {
        nombre: "Santiago del Estero",
        codigo: "SE",
        porcentaje: 35.6,
        coordenadas: [-27.7824, -64.2642]
    },
    {
        nombre: "Tierra del Fuego",
        codigo: "TF",
        porcentaje: 47.2,
        coordenadas: [-54.8019, -68.3030]
    },
    {
        nombre: "Tucumán",
        codigo: "TM",
        porcentaje: 37.8,
        coordenadas: [-26.8083, -65.2176]
    }
];

// Función para obtener el color basado en el porcentaje
function getColorByPercentage(porcentaje) {
    if (porcentaje >= 45) return '#1f2937'; // Gris muy oscuro
    if (porcentaje >= 40) return '#374151'; // Gris oscuro
    if (porcentaje >= 35) return '#4b5563'; // Gris medio
    return '#6b7280'; // Gris claro
}

// Función para crear un icono personalizado
function createCustomIcon(color) {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div style="
                width: 20px;
                height: 20px;
                background-color: ${color};
                border: 2px solid white;
                border-radius: 50%;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3);
            "></div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10]
    });
}

// Función para calcular estadísticas
function calculateStatistics() {
    const totalProvincias = provinciasData.length;
    const promedio = provinciasData.reduce((sum, p) => sum + p.porcentaje, 0) / totalProvincias;
    const maximo = Math.max(...provinciasData.map(p => p.porcentaje));
    const minimo = Math.min(...provinciasData.map(p => p.porcentaje));
    
    const provinciaMaxima = provinciasData.find(p => p.porcentaje === maximo);
    const provinciaMinima = provinciasData.find(p => p.porcentaje === minimo);

    const provinciasAlto = provinciasData.filter(p => p.porcentaje >= 45).length;
    const provinciasMedio = provinciasData.filter(p => p.porcentaje >= 35 && p.porcentaje < 45).length;
    const provinciasBajo = provinciasData.filter(p => p.porcentaje < 35).length;

    return {
        totalProvincias,
        promedio,
        maximo,
        minimo,
        provinciaMaxima,
        provinciaMinima,
        provinciasAlto,
        provinciasMedio,
        provinciasBajo
    };
}
