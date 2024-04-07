//grab user loc
async function getCoords(){
    pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    return [pos.coords.latitude, pos.coords.longitude]

}



//add map
async function renderMap(){
    let userLocation = await getCoords()
        const myMap = L.map('map', {
        center: userLocation,
        zoom: 12,
    });
// coords[0], coords[1]
//add tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: '15',
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
    
    buisnessType.addEventListener('change', async (event) => {
        let userChoice = event.target.value;
        try {
            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'fsq3AHNPmBmv2HanWgrO3TEgwuGXQQ/MNjCiK/VgOndLOjk='
                }
            };
            let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${userChoice}%20type&ll=${userLocation}&limit=5`, options);
            let data = await response.json();
            console.log("response data ", data);
        } catch (error) {
            console.log("fetch error", error);
        }
    });
}
search()
//get the forsquare api info for nearby buisness
    // let response = await fetch(`https://api.foursquare.com/v3/places/search?query=${locations}%20type&ll=${userLocation}&limit=5`, options)






