

// // Creating map object
var myMap = L.map("map", {
  center: [39.87, -105.021],
  zoom: 11,
  });



// Adding tile layers to the map
var colorMap= L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: API_KEY
}).addTo(myMap);

var dark = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.dark",
  accessToken: API_KEY
});

// setting variable for baseMap
var baseMaps = {
  Color: colorMap,
  Light: graymap,
  Dark: dark
}


// Grab the data with d3
d3.csv("static/data/IncidentLocations.csv", function(response) {
  // console.log(response)

  // Create a new marker cluster group
  // var markers = L.markerClusterGroup();
  var parentGroup = L.markerClusterGroup();

  var emsGroup = L.featureGroup.subGroup(parentGroup,emsGroup)
  var otherGroup = L.featureGroup.subGroup(parentGroup,otherGroup)

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // console.log(response[i].Year)
    if (response[i].Year == 2019 && response[i]['Basic Type Of Alarm (FD1.50)'] == "EMS Call"){

    // Set the data location property to a variable
    var lat = response[i].Latitude;
    var long = response[i].Longitude;
    // console.log((lat,long))

    // Add a new marker to the cluster group and bind a pop-up
    emsGroup.addLayer(L.marker([lat, long]).bindPopup(response[i].typeCode));
    }

  }

  // Add marker cluster layer to the map
  // myMap.addLayer(parentGroup);
  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // console.log(response[i].Year)
    if (response[i].Year == 2019 && response[i]['Basic Type Of Alarm (FD1.50)'] == "Other Call"){

    // Set the data location property to a variable
    var lat = response[i].Latitude;
    var long = response[i].Longitude;
    // console.log((lat,long))

    // Add a new marker to the cluster group and bind a pop-up
    otherGroup.addLayer(L.marker([lat, long]).bindPopup(response[i].typeCode));
    }

  }
  // Create a new marker cluster group
  var fireGroup = L.featureGroup.subGroup(parentGroup, fireGroup)

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // console.log(response[i].Year)
    if (response[i].Year == 2019 && response[i]['Basic Type Of Alarm (FD1.50)'] == "Fire Call"){

    // Set the data location property to a variable
    var lat = response[i].Latitude;
    var long = response[i].Longitude;
    // console.log((lat,long))

    // Add a new marker to the cluster group and bind a pop-up
    fireGroup.addLayer(L.marker([lat, long]).bindPopup(response[i].typeCode));
    }

  }

  // Add marker cluster layer to the map
  // myMap.addLayer(fmarkers);
  parentGroup.addTo(myMap);
  // mySubGroup.addTo(myMap);

  var overlays = {
    "EMS Calls": emsGroup,
    "Fire Calls": fireGroup,
    "Other Calls": otherGroup
  }

  L.control.layers(baseMaps, overlays).addTo(myMap);
});

