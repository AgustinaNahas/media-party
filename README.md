# Mujeres Jefas de Hogar en Argentina

Una visualización interactiva del porcentaje de mujeres como jefas de hogar por provincia en Argentina, desarrollada para MediaParty 2025.

## Características

- **Mapa interactivo** con marcadores para cada provincia argentina
- **Datos reales** basados en estadísticas del INDEC
- **Estadísticas en tiempo real** calculadas automáticamente
- **Diseño responsive** que se adapta a diferentes dispositivos
- **Interfaz moderna** con colores y tipografías profesionales

## Archivos del proyecto

- `index.html` - Página principal con la estructura HTML
- `styles.css` - Estilos CSS para el diseño y layout
- `data.js` - Datos de las provincias argentinas y funciones auxiliares
- `script.js` - Lógica JavaScript para el mapa interactivo
- `README.md` - Este archivo de documentación

## Tecnologías utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos con Grid y Flexbox
- **JavaScript (ES6+)** - Lógica interactiva
- **Leaflet** - Biblioteca de mapas interactivos
- **OpenStreetMap** - Tiles de mapas

## Cómo usar

1. **Abrir el sitio**: Simplemente abre el archivo `index.html` en cualquier navegador web moderno
2. **Interactuar con el mapa**: 
   - Haz clic en los marcadores para ver información detallada de cada provincia
   - Usa el zoom y pan para navegar por el mapa
   - Los tooltips muestran información rápida al pasar el mouse
3. **Ver estadísticas**: El panel lateral muestra estadísticas generales y distribución por rangos

## Datos

Los datos presentados son estimaciones basadas en estadísticas del Instituto Nacional de Estadística y Censos (INDEC) de Argentina. Los porcentajes representan la proporción de mujeres que ejercen como jefas de hogar en cada provincia.

### Rangos de colores:
- **Gris muy oscuro (≥45%)**: Alto porcentaje
- **Gris oscuro (40-44%)**: Medio-alto porcentaje  
- **Gris medio (35-39%)**: Medio porcentaje
- **Gris claro (<35%)**: Bajo porcentaje

## Características técnicas

- **Sin dependencias de servidor**: Todo funciona de forma estática
- **Optimizado para móviles**: Diseño responsive
- **Accesible**: Estructura semántica y colores contrastantes
- **Rápido**: Carga instantánea sin dependencias externas pesadas

## Personalización

Para modificar los datos o estilos:

1. **Cambiar datos**: Edita el array `provinciasData` en `data.js`
2. **Modificar colores**: Ajusta la función `getColorByPercentage()` en `data.js`
3. **Cambiar estilos**: Modifica las clases CSS en `styles.css`
4. **Agregar funcionalidades**: Extiende las funciones en `script.js`

## Compatibilidad

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ Dispositivos móviles

## Licencia

Este proyecto fue desarrollado para MediaParty 2025. Los datos son de dominio público del INDEC.

## Contacto

Desarrollado para MediaParty 2025 - Visualización de datos socioeconómicos de Argentina.
