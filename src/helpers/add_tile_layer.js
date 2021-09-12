import L from 'leaflet';

export function addTileLayer(map) {
  L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiYmlvMTkiLCJhIjoiY2t0aGUzYnM2MGdyZDJxbXp5eWlpMWE3eSJ9.tX7JTKmWWiHOiWK21sM6lg', {
    attribution: 'Challenge by <a href="https://www.frontendmentor.io?ref=challenge" target="_blank">Frontend Mentor</a>. Coded by <a href="https://github.com/kuz-en">kuz-en</a>.',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
}).addTo(map);
}