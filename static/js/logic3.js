// Create the tile layer that will be the background of our map
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "streets-v11", //"light-v10",
    accessToken: API_KEY
  });
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });
  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  });

  // Initialize all of the LayerGroups we'll be using
  var layers = {
    EARTHQUAKES_CIRCLE: new L.LayerGroup(),
    EARTHQUAKES_MARKERS: new L.LayerGroup(),
    TECTONIC_PLATES: new L.LayerGroup()
  };
  
  // Create the map with our layers
  var map = L.map("map-id", {
    center: [39.8097343, -98.5556199],
    zoom: 3,
    layers: [
      layers.EARTHQUAKES_CIRCLE
    ]
  });

  // Create an overlays object to add to the layer control
  var overlays = {
    "EARTHQUAKES CIRCLES": layers.EARTHQUAKES_CIRCLE,
    "EARTHQUAKES_MARKERS": layers.EARTHQUAKES_MARKERS,
    "TECTONIC PLATES": layers.TECTONIC_PLATES
  };
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(layers["EARTHQUAKES_MARKERS"]);
  
  // Add our 'lightmap' tile layer to the map
  streetmap.addTo(layers["EARTHQUAKES_CIRCLE"]);
  
  // Add our 'lightmap' tile layer to the map
  darkmap.addTo(layers["TECTONIC_PLATES"]);
  
  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays).addTo(map);

  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  
  // Initialize an object containing icons for each layer group
  var icons = {
    EARTHQUAKES_MARKERS: L.ExtraMarkers.icon({
      icon: "ion-settings",
      iconColor: "white",
      markerColor: "darkred",
      shape: "circle"
    })
  };

  