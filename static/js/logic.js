// store the url

const url= "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
// define the sizes and colors for markers based on magnitude
function markerSize(mag) {
    return mag*30000;
};

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

// call the url
d3.json(url, function(response) {
    // verify if the url is working
    console.log(response);
    // get the feature data from the url
    var createFeatures= response.features;
    // check if it's printing
    console.log(createFeatures);
});
