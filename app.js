// Initialize the map
const map = L.map('map').setView([40.7128, -74.0060], 13); // Default view of "Metropolis City"

// Add the base map layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Define pollution zones data
const pollutionZones = [
    {
        name: "Industrial District",
        center: [40.7228, -74.0160],
        radius: 500,
        level: 180, // High pollution
        type: "source",
        icon: "🏭"
    },
    {
        name: "Highway Junction",
        center: [40.7028, -74.0060],
        radius: 400,
        level: 150, // High pollution
        type: "source",
        icon: "🚗"
    },
    {
        name: "Downtown",
        center: [40.7128, -73.9960],
        radius: 600,
        level: 100, // Medium pollution
        type: "mixed"
    },
    {
        name: "Residential Area",
        center: [40.7228, -73.9860],
        radius: 700,
        level: 50, // Low pollution
        type: "affected"
    },
    {
        name: "Central Park",
        center: [40.7328, -73.9960],
        radius: 800,
        level: 30, // Low pollution
        type: "affected"
    },
    {
        name: "Riverside",
        center: [40.7128, -74.0260],
        radius: 500,
        level: 40, // Low pollution
        type: "affected"
    }
];

// Store circles for later reference
const pollutionCircles = [];
let windArrows = [];
let affectedZoneMarkers = [];

// Add pollution zones to the map
function addPollutionZones() {
    pollutionZones.forEach(zone => {
        const color = getPollutionColor(zone.level);
        const circle = L.circle(zone.center, {
            radius: zone.radius,
            color: color,
            fillColor: color,
            fillOpacity: 0.5,
            weight: 1
        }).addTo(map);
        
        circle.bindTooltip(`${zone.name}<br>Index: ${zone.level} - ${getPollutionLabel(zone.level)}`);
        
        // Store the circle and its data
        pollutionCircles.push({
            circle: circle,
            data: zone
        });
    });
}

// Get color based on pollution level
function getPollutionColor(level) {
    if (level >= 150) return '#ff5252'; // Red for high pollution
    if (level >= 100) return '#ffa726'; // Orange for medium pollution
    return '#66bb6a'; // Green for low pollution
}

// Get label based on pollution level
function getPollutionLabel(level) {
    if (level >= 150) return 'Harmful';
    if (level >= 100) return 'Moderate';
    return 'Good';
}

// Initialize the map with pollution zones
addPollutionZones();

// Handle tooltip display on mousemove
const tooltip = document.getElementById('tooltip');
const tooltipText = document.getElementById('tooltip-text');

map.on('mousemove', function(e) {
    let isOverZone = false;
    
    pollutionCircles.forEach(item => {
        const distance = map.distance(e.latlng, item.data.center);
        if (distance <= item.data.radius) {
            isOverZone = true;
            tooltip.style.left = e.containerPoint.x + 15 + 'px';
            tooltip.style.top = e.containerPoint.y + 'px';
            tooltipText.innerHTML = `${item.data.name}<br>Index: ${item.data.level} - ${getPollutionLabel(item.data.level)}`;
            tooltip.classList.remove('hidden');
        }
    });
    
    if (!isOverZone) {
        tooltip.classList.add('hidden');
    }
});

// Calculate Trees Button Functionality
const calculateTreesBtn = document.getElementById('calculate-trees');
const modal = document.getElementById('modal');
const closeButton = document.querySelector('.close-button');
const treesResult = document.getElementById('trees-result');

calculateTreesBtn.addEventListener('click', function() {
    // Calculate average pollution level
    let totalLevel = 0;
    pollutionZones.forEach(zone => {
        totalLevel += zone.level;
    });
    
    const averageLevel = Math.round(totalLevel / pollutionZones.length);
    const treesNeeded = Math.ceil(averageLevel / 10);
    
    // Display result in modal
    treesResult.innerHTML = `To offset the current pollution in this area, it is estimated that you would need to plant an average of <strong>${treesNeeded} trees</strong>. Your action matters!`;
    modal.classList.remove('hidden');
});

closeButton.addEventListener('click', function() {
    modal.classList.add('hidden');
});

// Close modal when clicking outside
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});

// Reveal Affected Zones Button Functionality
const revealZonesBtn = document.getElementById('reveal-zones');
const infoPanel = document.getElementById('info-panel');
let affectedZonesMode = false;

revealZonesBtn.addEventListener('click', function() {
    affectedZonesMode = !affectedZonesMode;
    
    if (affectedZonesMode) {
        // Show affected zones view
        revealZonesBtn.textContent = '🌬️ Hide Affected Zones';
        showAffectedZones();
        infoPanel.classList.remove('hidden');
    } else {
        // Return to normal view
        revealZonesBtn.textContent = '🌬️ Reveal Affected Zones';
        hideAffectedZones();
        infoPanel.classList.add('hidden');
    }
});

// Show affected zones with animations
function showAffectedZones() {
    // Clear existing pollution circles
    pollutionCircles.forEach(item => {
        map.removeLayer(item.circle);
    });
    
    // Add pollution source markers
    pollutionZones.forEach(zone => {
        if (zone.type === 'source') {
            // Add source marker
            const sourceMarker = L.marker(zone.center, {
                icon: L.divIcon({
                    html: `<div style="font-size: 30px;">${zone.icon}</div>`,
                    className: 'pollution-source',
                    iconSize: [30, 30],
                    iconAnchor: [15, 15]
                })
            }).addTo(map);
            
            sourceMarker.bindTooltip(`Pollution Source: ${zone.name}`);
            affectedZoneMarkers.push(sourceMarker);
            
            // Find affected zones and draw arrows
            pollutionZones.forEach(affectedZone => {
                if (affectedZone.type === 'affected') {
                    // Draw affected zone with purple border
                    const affectedCircle = L.circle(affectedZone.center, {
                        radius: affectedZone.radius,
                        color: '#9c27b0',
                        fillColor: '#e1bee7',
                        fillOpacity: 0.3,
                        weight: 3,
                        dashArray: '5, 10',
                        className: 'affected-zone'
                    }).addTo(map);
                    
                    affectedCircle.bindTooltip(`Affected Zone: ${affectedZone.name}`);
                    affectedZoneMarkers.push(affectedCircle);
                    
                    // Create arrow from source to affected zone
                    createWindArrow(zone.center, affectedZone.center);
                }
            });
        }
    });
}

// Create animated wind arrow
function createWindArrow(from, to) {
    // Calculate midpoint for the arrow
    const midLat = (from[0] + to[0]) / 2;
    const midLng = (from[1] + to[1]) / 2;
    
    // Create arrow marker
    const arrowMarker = L.marker([midLat, midLng], {
        icon: L.divIcon({
            html: `<div style="font-size: 24px; transform: rotate(${getArrowRotation(from, to)}deg);">➡️</div>`,
            className: 'wind-arrow',
            iconSize: [24, 24],
            iconAnchor: [12, 12]
        })
    }).addTo(map);
    
    arrowMarker.bindTooltip('Pollution Flow');
    windArrows.push(arrowMarker);
    
    // Animate the arrow
    animateArrow(arrowMarker, from, to);
}

// Calculate arrow rotation angle
function getArrowRotation(from, to) {
    const deltaLat = to[0] - from[0];
    const deltaLng = to[1] - from[1];
    return Math.atan2(deltaLng, deltaLat) * 180 / Math.PI;
}

// Animate arrow movement
function animateArrow(arrow, from, to) {
    let progress = 0;
    const animationDuration = 3000; // 3 seconds
    const interval = 50; // Update every 50ms
    const steps = animationDuration / interval;
    
    const animation = setInterval(() => {
        progress += 1 / steps;
        
        if (progress >= 1) {
            progress = 0; // Reset for continuous animation
        }
        
        // Calculate current position
        const currentLat = from[0] + (to[0] - from[0]) * progress;
        const currentLng = from[1] + (to[1] - from[1]) * progress;
        
        // Update arrow position
        arrow.setLatLng([currentLat, currentLng]);
    }, interval);
    
    // Store animation interval for cleanup
    arrow.animationInterval = animation;
}

// Hide affected zones and return to normal view
function hideAffectedZones() {
    // Remove affected zone markers and arrows
    affectedZoneMarkers.forEach(marker => {
        map.removeLayer(marker);
    });
    
    windArrows.forEach(arrow => {
        clearInterval(arrow.animationInterval);
        map.removeLayer(arrow);
    });
    
    affectedZoneMarkers = [];
    windArrows = [];
    
    // Restore original pollution circles
    addPollutionZones();
}

// Responsive adjustments
function handleResize() {
    const mapContainer = document.getElementById('map-container');
    if (window.innerWidth <= 768) {
        mapContainer.style.height = '400px';
    } else {
        mapContainer.style.height = '500px';
    }
    map.invalidateSize();
}

window.addEventListener('resize', handleResize);
handleResize(); // Initial call