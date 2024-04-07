let myMap; //mymap is global for search and render to access
let markers = []
//grab user loc
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]

}

// create red pin marker
const redPin = L.icon({
    iconUrl: 'assets/red-pin.png',
    iconSize:     [38, 38], // size of the icon
    iconAnchor:   [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -38] // point from which the popup should open relative to the iconAnchor
});


//add map
async function renderMap(){
    let userLocation = await getCoords()
        myMap = L.map('map', {
        center: userLocation,
        zoom: 14,
    });
// coords[0], coords[1]
//add tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '6',
    }).addTo(myMap)
    const marker = L.marker(userLocation)
    marker.addTo(myMap).bindPopup('<p1><b>My Location</b></p1>').openPopup()
    
}
renderMap()

/* 
target select element
add event listener
-event
-callback



*/



async function search() {
        let userLocation = await getCoords();
        let buisnessType = document.getElementById('buisness-finder');
        
        buisnessType.addEventListener('change', async (event) => { //listens to the html select for what to search using 4⏹️ api
            // Remove previous markers if they exist from previous selecct choice
    
            markers.forEach(marker => myMap.removeLayer(marker));
            markers = []; // Clear the markers array
            
            let userChoice = event.target.value; //gotten from select
            try {
                const options = {
                    method: 'GET',
                    headers: {
                        accept: 'application/json',
                        Authorization: 'fsq3AHNPmBmv2HanWgrO3TEgwuGXQQ/MNjCiK/VgOndLOjk='
                    }
                };
                let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}%20type&ll=${userLocation}&limit=5`, options); //this is the 4⏹️ call
                let data = await response.json();
                
                // Extract location coordinates and names
                let locations = data.results.map(result => ({
                    name: result.name, //buisiness name
                    latlng: [result.geocodes.main.latitude, result.geocodes.main.longitude] //buisiness location
                }));
                
                // Log the extracted locations
                console.log("Locations:", locations);
                
                // Add markers to the map
                locations.forEach(location => {
                    if (location.latlng[0] !== undefined && location.latlng[1] !== undefined) { //make sure the coords are actually correct
                        let marker = L.marker(location.latlng, {icon: redPin}) //create different icon from user for readability
                        .addTo(myMap)
                        .bindPopup(`<b>${location.name}</b>`)
                        
                        
                        markers.push(marker); // Add marker reference to markers array
                    }
                });
            } catch (error) {
                console.log("Fetch Error:", error);
            }
        });
    }
search()






