class LeafletMap {
    constructor(containerId, center, zoom) {
        this.map = L.map(containerId).setView(center, zoom);
        this.initTileLayer();
    }

    initTileLayer() {
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
    }

    addMarker(lat, lng, message) {
        const marker = L.marker([lat, lng]).addTo(this.map);
        marker.bindPopup(message);
    }

    loadMarkersFromJson(url) {
        fetch(url)
            .then(response => response.json())
            .then(data => {
                data.forEach(marker => {
                    this.addMarker(marker.latitude, marker.longitude, marker.message);
                });
            })
            .catch(error => console.error('Error loading markers:', error));
    }
}

const myMap = new LeafletMap('map', [8.360004, 124.868419], 9); 


const wildfireData = [
    { latitude: 8.25, longitude: 124.75, message: '<b>Mount Kitanglad Area</b><br>High wildfire risk.' },
    { latitude: 8.05, longitude: 124.95, message: '<b>Kalatungan Mountain Range</b><br>Dry conditions increase fire danger.' },
    { latitude: 8.35, longitude: 124.65, message: '<b>Pantaron Mountain Range</b><br>Remote area with limited access.' }
];


wildfireData.forEach(marker => {
    myMap.addMarker(marker.latitude, marker.longitude, marker.message);
});