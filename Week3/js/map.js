// create data  

    let data = [
    {
        
        'title':'Mexico City- Mexico',
        'description': 'My father, Jose Carlos, is from Mexico City, Mexico. He is the father of Adriana, Alex, Anastasia, and Fyodor.' ,
        'lat': 19.4326,
        'lon': -99.1332,
        'image': "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/175208579_5750272314983655_4061925301672126756_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=730e14&_nc_ohc=KI-6zLeiRfQAX8bV-OG&_nc_ht=scontent-lax3-1.xx&oh=7229fb5088e27d30b7513678af1068b7&oe=609E27A2"
	

    },

    {
        
        'title':'Santa Ana- El Salvador',
        'description': 'My mother, Maria, is from Santa Ana, El Salvador. She is the mother of Carlos, Adriana, and Alex.',
        'lat': 13.9778,
        'lon': -89.5639,
        'image': "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/174352458_5749220605088826_438561522904492558_n.jpg?_nc_cat=109&ccb=1-3&_nc_sid=730e14&_nc_ohc=IZbcsk--iEUAX9_EbUg&_nc_ht=scontent-lax3-1.xx&oh=23299180cac26b04ad0bc7e56d602a8c&oe=609DA813"
    },
    {
        'title':'El Triunfo de La Cruz- Honduras',
        'description': 'The ancestors of my brother Carlos are from El Trinunfo de La Cruz, Honduras.',
        'lat': 15.8108,
        'lon': -87.4133,
        'image': "https://scontent-lax3-2.xx.fbcdn.net/v/t1.6435-9/174391403_5750218824989004_5544583353774920242_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=730e14&_nc_ohc=s6UG_B3EL7QAX8StyRP&_nc_oc=AQmHsssRI1pfnHBF0wVPl2944xgjFNHfNvTYJsb9n5-657BhjC6ITuiwbB16jo3gGQE&_nc_ht=scontent-lax3-2.xx&oh=cc4e4e9460b5326250dbb6aa088c9ff2&oe=609D31ED"
    
    },

    {
        
        'title': 'Volgograd- Russia', 
        'description': 'The mother of my siblings Anastasia and Fyodor is from Volgograd, Russia.',
        'lat': 48.7080,
        'lon': 44.5133,
        'image': "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/174526736_5749219578422262_8389911872767486899_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=730e14&_nc_ohc=pxNRxFKnnk0AX9OEqgP&_nc_ht=scontent-lax3-1.xx&oh=bfe3458fabdead059ccd7613250ab846&oe=609F3185"
     },
    {
        
        'title':'Los Angeles- United States',
        'description': 'Carlos, Alex, Anastasia, Fyodor and I were all born and raised in the city of Los Angeles.', 
        'lat': 34.0522,
        'lon': -118.2437,
        'image': "https://scontent-lax3-1.xx.fbcdn.net/v/t1.6435-9/175683399_5763104103700476_8798245739685647351_n.jpg?_nc_cat=105&ccb=1-3&_nc_sid=730e14&_nc_ohc=5VTXMHjMZ_gAX8i23_L&_nc_ht=scontent-lax3-1.xx&oh=d3c26847d997f7e3808553cac45d8126&oe=60A32ED0"
    },
    ]

    let map = L.map('map').setView([0,0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);




// create a feature group
	let myMarkers = L.featureGroup();

// add new marker for each location


    var icon = L.icon({
        iconUrl: 'https://www.pngitem.com/pimgs/b/86-864981_star-pngs.png',
        iconSize: [30,30],


});


// loop through data
	data.forEach(function(item, index){
			let marker = L.marker([item.lat, item.lon], {icon:icon})
				.bindPopup(`<div><h3>${item.title}</h3></div><img src="${item.image}" width=165><br>${item.description}`)
			
                myMarkers.addLayer(marker)


			$('.sidebar').append(`<div class="sidebar-item" onclick="flyToIndex(${index})"><b>${item.title}</b></div>`)



    

    


	});
    




	myMarkers.addTo(map)


	// define layers 
	let layers = {
		"My Markers:": myMarkers
	}

	// add layer control box 
	L.control.layers(null,layers).addTo(map)

	map.fitBound(myMarkers.getBounds())

	function flyToIndex(index){
		map.flyTo([data[index].lat,data[index].lon],12)
		myMarkers.getLayers()[index].openPopup()


    }

    $.getJSON('world.geo.json', function (geojson) { // load file
        L.geoJson(geojson, { // initialize layer with data
            style: function (feature) { // Style option
                return {
                    'weight': 1,
                    'color': 'black',
                    'fillColor': 'yellow'
                }
            }
        }).addTo(map); // Add layer to map
    });

  