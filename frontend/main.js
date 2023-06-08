function renderMainView() {
    let container = document.getElementById("container");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.innerHTML = `<div class="delayed">
                <h1>Försenade tåg</h1>

                <div id="delayed-trains" class="delayed-trains"></div>
            </div>
            <div id="map" class="map"></div>`;

    const socket = io("http://localhost:1337");

    const map = L.map('map').setView([62.173276, 14.942265], 5);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let markers = {};

    socket.on("message", (data) => {
        if (markers.hasOwnProperty(data.trainnumber)) {
            let marker = markers[data.trainnumber]

            marker.setLatLng(data.position);
        } else {
            let marker = L.marker(data.position).bindPopup(data.trainnumber).addTo(map);

            markers[data.trainnumber] = marker
        }
    });

    let delayed = document.getElementById("delayed-trains");

    fetch("http://localhost:1337/delayed")
        .then((response) => response.json())
        .then(function(result) {
            return renderDelayedTable(result.data, delayed);
        });
}

function renderDelayedTable(data, table) {
    data.forEach((item) => {
        let element = document.createElement("div");

        element.innerHTML = `
            <div class="train-number">
                ${item.OperationalTrainNumber}
            </div>
            <div class="current-station">
                <div>${item.LocationSignature}</div>
                <div>${item.FromLocation ? item.FromLocation[0].LocationName + " -> " : ""} ${item.ToLocation ? item.ToLocation[0].LocationName : ""}</div>
            </div>
            <div class="delay">
                ${outputDelay(item)}
            </div>`;

        element.addEventListener("click", function() {
            renderTicketView(item);
        });

        table.appendChild(element);
    });
}

function outputDelay(item) {
    let advertised = new Date(item.AdvertisedTimeAtLocation);
    let estimated = new Date(item.EstimatedTimeAtLocation);

    const diff = Math.abs(estimated - advertised);

    return Math.floor(diff / (1000 * 60)) + " minuter";
}

function renderTicketView(item) {
    let container = document.getElementById("container");

    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    container.innerHTML = `<div class="ticket">
                <a href="" id="back"><- Tillbaka</a>
                <h1>Nytt ärende #<span id="new-ticket-id"></span></h1>
                <div id="ticket-information"></div>
            </div>
            <div class="old-tickets" id="old-tickets"></div>`;


    let backButton = document.getElementById("back");

    backButton.addEventListener("click", function(event) {
        event.preventDefault();

        renderMainView();
    });

    let oldTickets = document.getElementById("old-tickets");

    fetch("http://localhost:1337/tickets")
        .then((respons) => response.json())
        .then((result) => {
            result.data.forEach((ticket) => {
                let element = document.createElement("div");

                element.innerHTML = `${ticket.id} ${ticket.code}`;

                oldTickets.appendChild(element);
            });
        });

    console.log(item);
}

renderMainView();
