const socket = io("http://localhost:1337");

const map = L.map('map').setView([62.173276, 14.942265], 5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

let markers = {};

socket.on("message", (data) => {
    console.log(data)
    if (markers.hasOwnProperty(data.trainnumber)) {
        let marker = markers[data.trainnumber]

        marker.setLatLng(data.position);
    } else {
        let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);

        markers[data.trainnumber] = marker
    }
});
