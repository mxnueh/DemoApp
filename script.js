// Datos de ejemplo para las ciudades
const citiesData = {
    "Los Angeles, CA": {
        aqi: 112,
        aqiLevel: "moderate",
        pollutants: {
            no2: 45.2,
            o3: 68.5,
            pm25: 35.8,
            hcho: 12.3
        },
        weather: {
            wind: "12.5 km/h NE",
            humidity: "65%",
            pbl: "850 m",
            precipitation: "0 mm"
        },
        treesNeeded: 15000,
        affectedZones: ["Downtown", "East LA", "Pasadena"],
        treePlantingAreas: [
            { name: "Griffith Park", lat: 34.1381, lng: -118.2954, capacity: 6000 },
            { name: "Elysian Park", lat: 34.0837, lng: -118.2427, capacity: 4500 },
            { name: "Kenneth Hahn State Park", lat: 34.0112, lng: -118.3612, capacity: 4500 }
        ]
    },
    "New York, NY": {
        aqi: 85,
        aqiLevel: "moderate",
        pollutants: {
            no2: 52.1,
            o3: 48.7,
            pm25: 28.3,
            hcho: 9.8
        },
        weather: {
            wind: "18.2 km/h SW",
            humidity: "72%",
            pbl: "750 m",
            precipitation: "2 mm"
        },
        treesNeeded: 12000,
        affectedZones: ["Manhattan", "Brooklyn", "Queens"],
        treePlantingAreas: [
            { name: "Central Park", lat: 40.7812, lng: -73.9665, capacity: 5000 },
            { name: "Prospect Park", lat: 40.6602, lng: -73.9690, capacity: 4000 },
            { name: "Flushing Meadows", lat: 40.7408, lng: -73.8400, capacity: 3000 }
        ]
    },
    "Madrid, Spain": {
        aqi: 128,
        aqiLevel: "unhealthy",
        pollutants: {
            no2: 58.4,
            o3: 45.1,
            pm25: 62.7,
            hcho: 14.5
        },
        weather: {
            wind: "10.3 km/h NE",
            humidity: "52%",
            pbl: "720 m",
            precipitation: "0 mm"
        },
        treesNeeded: 12500,
        affectedZones: ["Centro", "Retiro", "Salamanca"],
        treePlantingAreas: [
            { name: "Casa de Campo", lat: 40.4146, lng: -3.7492, capacity: 5000 },
            { name: "Parque del Retiro", lat: 40.4153, lng: -3.6844, capacity: 3000 },
            { name: "Madrid Río", lat: 40.4053, lng: -3.7208, capacity: 2500 },
            { name: "Dehesa de la Villa", lat: 40.4583, lng: -3.7328, capacity: 2000 }
        ]
    },
    "Santo Domingo, DR": {
        aqi: 65,
        aqiLevel: "moderate",
        pollutants: {
            no2: 32.5,
            o3: 58.9,
            pm25: 22.4,
            hcho: 8.7
        },
        weather: {
            wind: "22.1 km/h E",
            humidity: "80%",
            pbl: "920 m",
            precipitation: "5 mm"
        },
        treesNeeded: 8000,
        affectedZones: ["Zona Colonial", "Gazcue", "Piantini"],
        treePlantingAreas: [
            { name: "Jardín Botánico", lat: 18.4945, lng: -69.9571, capacity: 3500 },
            { name: "Parque Mirador Sur", lat: 18.4472, lng: -69.9444, capacity: 2500 },
            { name: "Parque Independencia", lat: 18.4719, lng: -69.8923, capacity: 2000 }
        ]
    },
    "London, UK": {
        aqi: 72,
        aqiLevel: "moderate",
        pollutants: {
            no2: 48.6,
            o3: 39.2,
            pm25: 25.1,
            hcho: 7.9
        },
        weather: {
            wind: "15.8 km/h W",
            humidity: "78%",
            pbl: "680 m",
            precipitation: "3 mm"
        },
        treesNeeded: 10000,
        affectedZones: ["Westminster", "Camden", "Hackney"],
        treePlantingAreas: [
            { name: "Hyde Park", lat: 51.5073, lng: -0.1657, capacity: 4000 },
            { name: "Richmond Park", lat: 51.4463, lng: -0.2755, capacity: 3500 },
            { name: "Hampstead Heath", lat: 51.5608, lng: -0.1426, capacity: 2500 }
        ]
    }
};

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initMap();
    setupCityButtons();
    updateDashboard("Los Angeles, CA"); // Ciudad por defecto
});

// Function to generate irregular polygon points for realistic pollution zones
function generateIrregularShape(centerLat, centerLng, minRadius, maxRadius, points) {
    const coords = [];
    
    for (let i = 0; i < points; i++) {
        // Calculate angle for this point
        const angle = (i * 2 * Math.PI / points);
        
        // Generate a random radius between min and max
        const radius = minRadius + Math.random() * (maxRadius - minRadius);
        
        // Add some randomness to the angle for more irregularity
        const randomAngle = angle + (Math.random() * 0.2 - 0.1);
        
        // Calculate coordinates
        const lat = centerLat + radius * Math.sin(randomAngle);
        const lng = centerLng + radius * Math.cos(randomAngle);
        
        coords.push([lat, lng]);
    }
    
    // Close the polygon by adding the first point again
    coords.push(coords[0]);
    
    return coords;
}

// Inicializar el mapa
function initMap() {
    // Aquí se implementaría la inicialización del mapa con Leaflet o Mapbox
    console.log("Mapa inicializado");
    
    // Código de ejemplo para inicializar un mapa de Leaflet
    if (typeof L !== 'undefined') {
        const map = L.map('map').setView([34.0522, -118.2437], 10); // Los Angeles por defecto
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        // Guardar la referencia del mapa para usarla más tarde
        window.skyguardMap = map;
    }
}

// Configurar los botones de selección de ciudad
function setupCityButtons() {
    const cityButtons = document.querySelectorAll('.city-button');
    
    cityButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remover la clase active de todos los botones
            cityButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir la clase active al botón seleccionado
            button.classList.add('active');
            
            // Actualizar el dashboard con los datos de la ciudad seleccionada
            const cityName = button.textContent.trim();
            updateDashboard(cityName);
        });
    });
    
    // Activar el botón de Los Angeles por defecto
    const defaultButton = document.querySelector('.city-button:first-child');
    if (defaultButton) {
        defaultButton.classList.add('active');
    }
}

// Update the dashboard with the selected city data
function updateDashboard(cityName) {
    const cityData = citiesData[cityName];
    
    if (!cityData) {
        console.error(`No data found for city: ${cityName}`);
        return;
    }
    
    // Update the city name
    const cityTitle = document.querySelector('.city-info h2');
    if (cityTitle) {
        cityTitle.textContent = cityName;
    }
    
    // Update the AQI
    const aqiNumber = document.querySelector('.aqi-number');
    const aqiLabel = document.querySelector('.aqi-label');
    
    if (aqiNumber) {
        aqiNumber.textContent = cityData.aqi;
    }
    
    if (aqiLabel) {
        aqiLabel.textContent = cityData.aqiLevel.charAt(0).toUpperCase() + cityData.aqiLevel.slice(1);
        
        // Remover todas las clases de nivel
        aqiLabel.classList.remove('good', 'moderate', 'unhealthy');
        
        // Añadir la clase correspondiente al nivel actual
        aqiLabel.classList.add(cityData.aqiLevel);
    }
    
    // Update pollutants
    updatePollutantValue('NO₂', cityData.pollutants.no2);
    updatePollutantValue('O₃', cityData.pollutants.o3);
    updatePollutantValue('PM₂.₅', cityData.pollutants.pm25);
    updatePollutantValue('HCHO', cityData.pollutants.hcho);
    
    // Update weather conditions
    updateWeatherValue('Wind', cityData.weather.wind);
    updateWeatherValue('Humidity', cityData.weather.humidity);
    updateWeatherValue('PBL', cityData.weather.pbl);
    updateWeatherValue('Precipitation', cityData.weather.precipitation);
    
    // Update the map for the selected city
    updateMapForCity(cityName, cityData);
}

// Update the value of a pollutant
function updatePollutantValue(pollutantName, value) {
    const pollutantItems = document.querySelectorAll('.pollutant-item');
    
    pollutantItems.forEach(item => {
        const nameElement = item.querySelector('.pollutant-name');
        
        if (nameElement && nameElement.textContent.includes(pollutantName)) {
            const valueElement = item.querySelector('.pollutant-value');
            
            if (valueElement) {
                valueElement.textContent = value;
            }
        }
    });
}

// Update the value of a weather condition
function updateWeatherValue(weatherName, value) {
    const weatherItems = document.querySelectorAll('.weather-item');
    
    weatherItems.forEach(item => {
        const labelElement = item.querySelector('.weather-label');
        
        if (labelElement && labelElement.textContent.includes(weatherName)) {
            const valueElement = item.querySelector('.weather-value');
            
            if (valueElement) {
                valueElement.textContent = value;
            }
        }
    });
}

// Update the map for the selected city
function updateMapForCity(cityName, cityData) {
    if (!window.skyguardMap) {
        console.error("Map is not initialized");
        return;
    }
    
    const map = window.skyguardMap;
    
    // City coordinates (example)
    const cityCoordinates = {
        "Los Angeles, CA": [34.0522, -118.2437],
        "New York, NY": [40.7128, -74.0060],
        "Madrid, Spain": [40.4168, -3.7038],
        "Santo Domingo, DR": [18.4861, -69.9312],
        "London, UK": [51.5074, -0.1278]
    };
    
    // Center the map on the selected city
    if (cityCoordinates[cityName]) {
        map.setView(cityCoordinates[cityName], 10);
    }
    
    // Clear existing layers
    map.eachLayer(layer => {
        if (layer instanceof L.Marker || layer instanceof L.Circle || layer instanceof L.Polygon) {
            map.removeLayer(layer);
        }
    });
    
    // Add pollution visualization with irregular shapes
    // Create more realistic pollution zones with irregular polygons
    
    // Define colors for different pollution levels
    const pollutionColors = {
        high: '#ff5252',
        medium: '#ffa726',
        low: '#66bb6a'
    };
    
    // Create irregular shapes for pollution zones
    if (cityCoordinates[cityName]) {
        const baseLat = cityCoordinates[cityName][0];
        const baseLng = cityCoordinates[cityName][1];
        
        // Create high pollution zone (irregular shape)
        const highPollutionPoints = generateIrregularShape(baseLat, baseLng, 0.04, 0.06, 8);
        L.polygon(highPollutionPoints, {
            color: pollutionColors.high,
            fillColor: pollutionColors.high,
            fillOpacity: 0.7,
            weight: 1
        }).addTo(map);
        
        // Create medium pollution zone (irregular shape)
        const mediumPollutionPoints = generateIrregularShape(baseLat, baseLng, 0.08, 0.12, 10);
        L.polygon(mediumPollutionPoints, {
            color: pollutionColors.medium,
            fillColor: pollutionColors.medium,
            fillOpacity: 0.5,
            weight: 1
        }).addTo(map);
        
        // Create low pollution zone (irregular shape)
        const lowPollutionPoints = generateIrregularShape(baseLat, baseLng, 0.15, 0.2, 12);
        L.polygon(lowPollutionPoints, {
            color: pollutionColors.low,
            fillColor: pollutionColors.low,
            fillOpacity: 0.3,
            weight: 1
        }).addTo(map);
        
        // Add blue striped affected zones like in the image
        const affectedZones = [
            // Southwest affected zone
            [
                [baseLat - 0.1, baseLng - 0.15],
                [baseLat - 0.05, baseLng - 0.15],
                [baseLat - 0.03, baseLng - 0.08],
                [baseLat - 0.08, baseLng - 0.05],
                [baseLat - 0.12, baseLng - 0.08]
            ],
            // Southeast affected zone
            [
                [baseLat - 0.02, baseLng + 0.1],
                [baseLat - 0.02, baseLng + 0.18],
                [baseLat - 0.08, baseLng + 0.15],
                [baseLat - 0.08, baseLng + 0.08]
            ],
            // East affected zone
            [
                [baseLat + 0.05, baseLng + 0.12],
                [baseLat + 0.05, baseLng + 0.2],
                [baseLat - 0.02, baseLng + 0.2],
                [baseLat - 0.02, baseLng + 0.12]
            ]
        ];
        
        // Add the affected zones with blue striped pattern
        affectedZones.forEach(zone => {
            L.polygon(zone, {
                color: '#4285F4',
                fillColor: '#4285F4',
                fillOpacity: 0.3,
                weight: 2,
                dashArray: '5, 5'
            }).addTo(map);
        });
    }
}

// Function to calculate needed trees (activated by clicking on the corresponding card)
function calculateTreesNeeded() {
    const activeCity = document.querySelector('.city-button.active');
    
    if (!activeCity) {
        console.error("No city selected");
        return;
    }
    
    const cityName = activeCity.textContent.trim();
    const cityData = citiesData[cityName];
    
    if (!cityData) {
        console.error(`No data found for city: ${cityName}`);
        return;
    }
    
    // Show modal with information
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('#modal-title');
    const treesResult = document.querySelector('#trees-result');
    
    if (modal && modalTitle && treesResult) {
        modalTitle.textContent = `Trees Needed - ${cityName}`;
        
        let treesHTML = `
            <p>Based on current pollution levels, it is estimated that <strong>${cityData.treesNeeded.toLocaleString()}</strong> additional trees are needed to help mitigate air pollution in ${cityName}.</p>
            <p>This estimate considers the levels of NO₂ (${cityData.pollutants.no2}), O₃ (${cityData.pollutants.o3}), and PM₂.₅ (${cityData.pollutants.pm25}).</p>
        `;
        
        // Add potential planting areas if available
        if (cityData.treePlantingAreas && cityData.treePlantingAreas.length > 0) {
            treesHTML += `<h4>Potential Tree Planting Areas:</h4><ul>`;
            
            cityData.treePlantingAreas.forEach(area => {
                treesHTML += `<li>${area.name} - Capacity for ${area.capacity.toLocaleString()} trees</li>`;
            });
            
            treesHTML += `</ul>`;
            
            // Show planting areas on the map
            showTreePlantingAreas(cityName, cityData.treePlantingAreas);
        }
        
        treesResult.innerHTML = treesHTML;
        modal.classList.remove('hidden');
    }
}

// Function to show tree planting areas on the map
function showTreePlantingAreas(cityName, plantingAreas) {
    if (!window.skyguardMap) {
        console.error("Map is not initialized");
        return;
    }
    
    const map = window.skyguardMap;
    
    // Add tree planting area markers
    plantingAreas.forEach(area => {
        // Create a tree icon
        const treeIcon = L.divIcon({
            html: '🌳',
            className: 'tree-planting-icon',
            iconSize: [30, 30]
        });
        
        // Add marker with popup
        L.marker([area.lat, area.lng], {icon: treeIcon})
            .addTo(map)
            .bindPopup(`
                <strong>${area.name}</strong><br>
                Capacity: ${area.capacity.toLocaleString()} trees<br>
                <button class="plant-here-btn" onclick="alert('Tree planting simulation started!')">Plant Here</button>
            `);
    });
}

// Function to show affected zones (activated by clicking on the corresponding card)
function showAffectedZones() {
    const activeCity = document.querySelector('.city-button.active');
    
    if (!activeCity) {
        console.error("No city selected");
        return;
    }
    
    const cityName = activeCity.textContent.trim();
    const cityData = citiesData[cityName];
    
    if (!cityData) {
        console.error(`No data found for city: ${cityName}`);
        return;
    }
    
    // Show modal with information
    const modal = document.querySelector('.modal');
    const modalTitle = document.querySelector('#modal-title');
    const treesResult = document.querySelector('#trees-result');
    
    if (modal && modalTitle && treesResult) {
        modalTitle.textContent = `Affected Zones - ${cityName}`;
        
        let zonesHTML = '<p>The following areas are receiving wind-transported pollution:</p><ul>';
        
        cityData.affectedZones.forEach(zone => {
            zonesHTML += `<li>${zone}</li>`;
        });
        
        zonesHTML += '</ul><p>These zones may appear clean, but they are being affected by pollution from nearby areas due to current wind patterns.</p>';
        
        treesResult.innerHTML = zonesHTML;
        
        modal.classList.remove('hidden');
    }
}

// Cerrar el modal
function closeModal() {
    const modal = document.querySelector('.modal');
    
    if (modal) {
        modal.classList.add('hidden');
    }
}

// Configure event listeners for action cards and close button
document.addEventListener('DOMContentLoaded', () => {
    // Trees Needed card
    const treesCard = document.querySelector('.action-card.trees');
    if (treesCard) {
        treesCard.addEventListener('click', calculateTreesNeeded);
    }
    
    // Affected Zones card
    const zonesCard = document.querySelector('.action-card.affected-zones');
    if (zonesCard) {
        zonesCard.addEventListener('click', showAffectedZones);
    }
    
    // Botón de cerrar modal
    const closeButton = document.querySelector('.close-button');
    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
    
    // Cerrar modal al hacer clic fuera del contenido
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.addEventListener('click', (event) => {
            if (event.target === modal) {
                closeModal();
            }
        });
    }
});