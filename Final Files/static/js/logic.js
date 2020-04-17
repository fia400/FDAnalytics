// // Creating map object

var myMap = L.map("map", {
  center: [39.87, -105.021],
  zoom: 11
});

console.log(API_KEY)

var graymap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href='https://www.openstreetmap.org/'>OpenStreetMap</a> contributors, <a href='https://creativecommons.org/licenses/by-sa/2.0/'>CC-BY-SA</a>, Imagery © <a href='https://www.mapbox.com/'>Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  accessToken: "pk.eyJ1IjoiY2Q3MjEwIiwiYSI6ImNrOGRxZ25pbDB3dmgzbXFjeDgwMTNlemcifQ.LdK6QhaB7djt-DHnm_0Ypw"
}).addTo(myMap);


// Grab the data with d3
d3.csv("static/data/IncidentLocations.csv", function(response) {
  // console.log(response)

  // Create a new marker cluster group
  var markers = L.markerClusterGroup();

  // Loop through data
  for (var i = 0; i < response.length; i++) {
    // console.log(response[i].Year)
    if (response[i].Year == 2019){

  
    // Set the data location property to a variable
    var lat = response[i].Latitude;
    var long = response[i].Longitude;
      // console.log((lat,long))
    // Check for location property
    

      // Add a new marker to the cluster group and bind a pop-up
      markers.addLayer(L.marker([lat, long])
        .bindPopup(response[i].typeCode));
    }

  }

  // Add our marker cluster layer to the map
  myMap.addLayer(markers);

});
