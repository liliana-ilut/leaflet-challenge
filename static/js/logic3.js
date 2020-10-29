var map = L.map("mapid", {
    center: [31.57, -99.58],
    zoom: 3,
    
  });
  
  var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  }).addTo(map);
  
  // call the url--I chose all week eartquakes
  var url_query ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  d3.json(url_query, function(data){
    // check if any data is displayed using console.log
    console.log(data);
    function markerInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        fillColor:markerColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
  
    function getRadius(magnitude) {
      if(magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
  
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: markerInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          "Magnitude: " + feature.properties.mag + "<br>Depth: " + feature.geometry.coordinates[2]
        );
      }
    }).addTo(map)
  
  
  function markerColor(mag) {
    if (mag <= 1) {
        return "#ADFF2F";
    } else if (mag <= 2) {
        return "#9ACD32";
    } else if (mag <= 3) {
        return "#FFFF00";
    } else if (mag <= 4) {
        return "#ffd700";
    } else if (mag <= 5) {
        return "#FFA500";
    } else {
        return "#FF0000";
    };
};

    var legend = L.control({
      position: "bottomright"
    });
    // When the layer control is added, insert a div with the class of "legend"
    legend.onAdd = function() {
      var div = L.DomUtil.create("div", "legend");
  
      var grades = [0,1,2,3,4,5]
      var colors = ["#ADFF2F","#9ACD32","#FFFF00","#ffd700","#FFA500","#FF0000"]
      
      for (var i = 0; i < grades.length; i++) {
  
              div.innerHTML +=
                "<i style = 'background: " + colors[i] + "'></i> " +
                grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1] + "<br>" : "+");
             
          }
          
      return div;
  };
    // Add the info legend to the map
    legend.addTo(map);
    
    
  });