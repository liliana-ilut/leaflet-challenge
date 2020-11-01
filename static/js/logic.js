var map = L.map("map-id", {
    center: [31.57, -99.58],
    zoom: 3,
    
  });
  
  // var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  //   attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  //   maxZoom: 18,
  //   id: "light-v10",
  //   accessToken: API_KEY
  // }).addTo(map);

  var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "satellite-v9",
    accessToken: API_KEY
  }).addTo(map);

  
  
  // call the url--I chose all week eartquakes
  var url_query ="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
  d3.json(url_query, function(data){
    // check if any data is displayed using console.log
    console.log(data);
    // create the marker info 
    function markerInfo(feature) {
      return {
        opacity: 1,
        fillOpacity: 1,
        // fillColor:markerColor(feature.geometry.coordinates[2]),
        fillColor:markerColor(feature.properties.mag),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
      };
    }
    // the radius will be based on the magnitude value
    function getRadius(magnitude) {
      if(magnitude === 0) {
        return 1;
      }
      return magnitude * 4;
    }
// add the popup to the map
    L.geoJson(data, {
      pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
      },
      style: markerInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup(
          "<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" + "<p>Richter magnitude scale: " + feature.properties.mag + "</p>"
        );
      }
    }).addTo(map)
  
  // create color scheme for the circles
  function markerColor(mag) {
    if (mag <= 1.0) {
        return "#ADFF2F";
    } else if (mag <= 2.0 && mag > 1.0) {
        return "#9ACD32";
    } else if (mag <= 3.0 && mag > 2.0) {
        return "#FFFF00";
    } else if (mag <= 4.0 && mag > 3.0) {
        return "#ffd700";
    } else if (mag <= 5.0 && mag > 4.0) {
        return "#FFA500";
    } else {
        return "#FF0000";
    };
};
// create legend
  //   var legend = L.control({
  //     position: "bottomleft"
  //   });
  
  //   legend.onAdd = function() {
  //     var div = L.DomUtil.create("div", "legend");
  
  //     var grades = [0,1,2,3,4,5]
  //     var colors = ["#ADFF2F","#9ACD32","#FFFF00","#ffd700","#FFA500","#FF0000"]
      
      
  //     for (var i = 0; i < grades.length; i++) {
  
  //             div.innerHTML +=
  //               "<i style = 'background: " + colors[i] + "'></i> " +
  //               grades[i] + (grades[i+1] ? "&ndash;" + grades[i+1] + "<br>" : "+");
             
  //         }
          
  //     return div;
  // };
  var legend = L.control({position: 'bottomleft'});  
    legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0,1,2,3,4,5],
        colors = ["#ADFF2F","#9ACD32","#FFFF00","#ffd700","#FFA500","#FF0000"],
        labels = ['<strong> RICHTER SCALE </strong>'],
        from, to;

    for (var i = 0; i < grades.length; i++) {
        from = grades [i];
        to = grades[i+1];

    labels.push(
        '<i style="background:' + colors[i] + '"></i> ' +
        from + (to ? '&ndash;' + to : '+'));
        }
        div.innerHTML = labels.join('<br>');
        return div;


        };


    // Add the info legend to the map
    legend.addTo(map);
    
    
  });