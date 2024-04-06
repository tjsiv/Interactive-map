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
}
renderMap()

/* 
target select element
add event listener
-event
-callback



*/
let locations = document.getElementById('buisness-finder')
locations.addEventListener('change', (event) =>{
    let userChoice = event.target.value;
    console.log(userChoice)
})






