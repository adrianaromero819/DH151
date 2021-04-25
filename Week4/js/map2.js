// Global variables
let map;
let lat = 0;
let long = 0;
let zl = 2;
let path = "data/1900s.csv";
let markers = L.featureGroup();


// initialize
$( document ).ready(function() {
	createMap(lat,long,zl);
    readCSV(path);
});

// create the map
function createMap(lat,long,zl){
	map = L.map('map').setView([lat,long], zl);

	L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);
}

// function to read csv data
function readCSV(path){
	Papa.parse(path, {
		header: true,
		download: true,
		complete: function(data) {
			console.log(data);
			
			// map the data
			mapCSV(data);

		}
	});
}

function mapCSV(data){

    let circleOptions = {
        radius: 8,
        weight: 1,
        color: 'white',
        fillColor: 'brown',
        fillOpacity: 1,
    }
	
	// loop through each entry
	data.data.forEach(function(item,index){
		// create marker
		let marker = L.circleMarker([item.Latitude,
            item.Longitude],circleOptions)
            .on('mouseover',function(){
                this.bindPopup(`<h3>${item.title}</h3><br><img src="${item.reference_url}" width="200pt"> <br> ${item.description}`).openPopup()
            })
    

		// add marker to featuregroup
		markers.addLayer(marker)

		//fly to location 

        // add entry to sidebar
		$('.sidebar').append(`<br><br><br><b><i>${item.title}</i></b><br>${item.date}<br><img src="${item.reference_url}" onmouseover="panToImage(${index})" width="200pt" >`)
	})

	// add featuregroup to map
	markers.addTo(map)

	// fit markers to map
	map.fitBounds(markers.getBounds())
}

function panToImage(index){
	map.setZoom(12);
	map.panTo(markers.getLayers()[index]._latlng);
}

