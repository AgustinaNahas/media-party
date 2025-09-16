// Inicialización del mapa cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeMap();
    updateStatistics();
});

// Función para inicializar el mapa
function initializeMap() {
    // Crear el mapa centrado en Argentina
    const map = L.map('map').setView([-38.4161, -63.6167], 4);

    // Agregar capa de tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18
    }).addTo(map);

    // Agregar marcadores para cada provincia
    provinciasData.forEach(provincia => {
        const color = getColorByPercentage(provincia.porcentaje);
        const customIcon = createCustomIcon(color);
        
        // Crear marcador
        const marker = L.marker(provincia.coordenadas, { icon: customIcon })
            .addTo(map);

        // Crear contenido del popup
        const popupContent = `
            <div class="popup-content">
                <h3 class="popup-title">${provincia.nombre}</h3>
                <div class="popup-stats">
                    <div style="
                        width: 16px;
                        height: 16px;
                        background-color: ${color};
                        border-radius: 50%;
                        display: inline-block;
                        margin-right: 8px;
                    "></div>
                    <span class="popup-percentage" style="color: ${color};">${provincia.porcentaje}%</span>
                </div>
                <p class="popup-source">Fuente: INDEC - Datos estimados</p>
            </div>
        `;

        // Agregar popup al marcador
        marker.bindPopup(popupContent);

        // Agregar tooltip al marcador
        marker.bindTooltip(`
            <div style="text-align: center;">
                <div style="font-weight: bold;">${provincia.nombre}</div>
                <div style="font-size: 0.9em;">${provincia.porcentaje}%</div>
            </div>
        `, {
            direction: 'top',
            offset: [0, -10],
            opacity: 0.9
        });
    });

    // Ajustar la vista para mostrar todas las provincias
    const group = new L.featureGroup(map._layers);
    map.fitBounds(group.getBounds().pad(0.1));
}

// Función para actualizar las estadísticas en el panel lateral
function updateStatistics() {
    const stats = calculateStatistics();
    
    // Actualizar estadísticas principales
    document.getElementById('promedio').textContent = `${stats.promedio.toFixed(1)}%`;
    document.getElementById('maximo').textContent = `${stats.maximo}% - ${stats.provinciaMaxima.nombre}`;
    document.getElementById('minimo').textContent = `${stats.minimo}% - ${stats.provinciaMinima.nombre}`;
    document.getElementById('total').textContent = stats.totalProvincias;
    
    // Actualizar distribución por rangos
    document.getElementById('alto').textContent = `${stats.provinciasAlto} provincias`;
    document.getElementById('medio').textContent = `${stats.provinciasMedio} provincias`;
    document.getElementById('bajo').textContent = `${stats.provinciasBajo} provincias`;
}

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Invalidar el tamaño del mapa para que se ajuste correctamente
    setTimeout(() => {
        if (window.map) {
            window.map.invalidateSize();
        }
    }, 100);
});

// Función para agregar interactividad adicional
function addMapInteractivity() {
    // Agregar control de capas (opcional)
    const baseMaps = {
        "OpenStreetMap": L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }),
        "Satélite": L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '&copy; <a href="https://www.esri.com/">Esri</a>'
        })
    };
    
    // Agregar control de capas al mapa (comentado por simplicidad)
    // L.control.layers(baseMaps).addTo(map);
}

// Función para exportar datos (opcional)
function exportData() {
    const dataToExport = {
        fecha: new Date().toISOString(),
        datos: provinciasData,
        estadisticas: calculateStatistics()
    };
    
    const dataStr = JSON.stringify(dataToExport, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = 'mujeres-jefas-hogar-argentina.json';
    link.click();
}

// Función para mostrar información detallada de una provincia
function showProvinceDetails(provincia) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close">&times;</span>
            <h2>${provincia.nombre}</h2>
            <div class="modal-stats">
                <div class="stat-item">
                    <h3>Porcentaje de mujeres jefas de hogar</h3>
                    <p class="stat-value">${provincia.porcentaje}%</p>
                </div>
                <div class="stat-item">
                    <h3>Coordenadas</h3>
                    <p>Lat: ${provincia.coordenadas[0]}, Lng: ${provincia.coordenadas[1]}</p>
                </div>
            </div>
            <p class="modal-source">Fuente: Instituto Nacional de Estadística y Censos (INDEC)</p>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Cerrar modal al hacer clic en X
    modal.querySelector('.close').onclick = function() {
        document.body.removeChild(modal);
    };
    
    // Cerrar modal al hacer clic fuera
    modal.onclick = function(event) {
        if (event.target === modal) {
            document.body.removeChild(modal);
        }
    };
}

// Agregar estilos para el modal (si se usa)
const modalStyles = `
    .modal {
        display: none;
        position: fixed;
        z-index: 1000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.5);
    }
    
    .modal-content {
        background-color: white;
        margin: 15% auto;
        padding: 2rem;
        border-radius: 0.5rem;
        width: 80%;
        max-width: 500px;
        position: relative;
    }
    
    .close {
        color: #aaa;
        float: right;
        font-size: 28px;
        font-weight: bold;
        cursor: pointer;
        position: absolute;
        right: 1rem;
        top: 1rem;
    }
    
    .close:hover {
        color: black;
    }
    
    .modal-stats {
        margin: 1rem 0;
    }
    
    .modal-source {
        font-size: 0.875rem;
        color: #6b7280;
        margin-top: 1rem;
    }
`;

// Agregar estilos del modal al head
const styleSheet = document.createElement('style');
styleSheet.textContent = modalStyles;
document.head.appendChild(styleSheet);
