# DemoApp · SkyGuard

Demo interactiva de **SkyGuard**, desarrollada para el NASA Space Apps 2025: un panel que visualiza zonas de contaminación del aire sobre un mapa y calcula cuántos árboles se necesitan para compensarla.

## 1. Descripción

Aplicación web con un mapa interactivo (**Leaflet** + OpenStreetMap) que muestra zonas con distintos niveles de calidad del aire (AQI), fuentes de contaminación y su posible desplazamiento. Incluye un panel de condiciones meteorológicas y una calculadora de reforestación.

> Los datos de las ciudades (AQI, contaminantes, clima y parques para reforestar) están definidos dentro del código con fines de demostración; no provienen de una API en tiempo real.

## 2. Características

- Selector de ciudades (Los Angeles, New York, Madrid, Santo Domingo y Londres) que actualiza el panel y el mapa.
- Mapa interactivo con zonas de contaminación dibujadas como polígonos irregulares.
- Niveles de AQI clasificados (moderado, no saludable, etc.).
- Tarjetas con niveles de contaminación, zonas afectadas y árboles necesarios.
- Visualización del desplazamiento de la contaminación.
- **Reforestation Calculator** en una ventana modal, con sugerencia de parques donde plantar.
- Servidor estático en Node.js sin dependencias externas.

## 3. Tecnologías

- HTML · CSS · JavaScript
- [Leaflet](https://leafletjs.com/) 1.7.1 · OpenStreetMap
- Node.js (módulos `http`, `fs`, `path`)

## 4. Requisitos

- [Node.js](https://nodejs.org/) 16 o superior

## 5. Uso

```bash
node server.js
```

Abre `http://localhost:3000`. También puedes abrir `index.html` directamente en el navegador.

## 6. Estructura

```
DemoApp/
├── index.html
├── style.css
├── script.js      # Aplicación principal: datos por ciudad, mapa, panel y calculadora
├── app.js         # Versión anterior del mapa (no la carga index.html)
├── server.js      # Servidor estático (puerto 3000)
└── assets/        # Estilos y fuentes
```

## 7. Proyecto relacionado

La página de presentación del proyecto está en [`Data-Earth-II`](https://github.com/mxnueh/Data-Earth-II).
