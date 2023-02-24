const lat = document.querySelector('.lat');
const lon = document.querySelector('.lon');
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

const myIcon = L.icon({
 iconUrl : '/satellite (1).png', 
 iconSize : [50,50],
 iconAnchor : [16,16]
});
let marker = L.marker([0,0],{icon : myIcon}).addTo(map)
.bindPopup("ISS LOCATION")
.openPopup()
let t = 0
let firstTime = true
const  getIss = () => {
 fetch("http://api.open-notify.org/iss-now.json")
.then(response => response.json())
.then(function(data){
 const {latitude,longitude} = data.iss_position
 marker.setLatLng([latitude,longitude])
console.log("latitude : " + latitude)
lat.innerHTML = latitude
if(firstTime){
 map.setView([longitude, latitude],1)
 firstTime = false
} 
 lon.innerHTML = longitude
 t++
 

})
.catch(err => alert("Please check your internet connection and try again "))
}
function load(){
 setInterval( () => {getIss()} ,100)
}
load()