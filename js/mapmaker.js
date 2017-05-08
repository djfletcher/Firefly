export const geocodeAirports = (codes, fetchCoords, draw, map) => {
  let airports = [];
  codes.forEach(code => fetchCoords(code, airports, draw, map));
  return airports;
};

export const geocodeRoutes = airports => {
  let routes = [];
  airports.forEach(a => {
    let geoJson = {};
    geoJson['type'] = 'Feature';
    geoJson['geometry'] = {
      "type": "LineString",
      "coordinates": [
        sfo, a.geometry.coordinates
      ]
    };
    routes.push(geoJson);
  });

  return routes;
};

export const drawAirports = (airports, domicile, map) => {
  map.addLayer({
    "id": `${domicile}-airport-names`,
    "type": "symbol",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": airports
      }
    },
    "layout": {
      "text-field": {
        "stops": [[3, "{id}"], [6, "{name}"]]
      },
      "text-size": {
        "stops": [[3, 14], [8, 20], [16, 30]]
      },
      "text-offset": {
        "stops": [[3, [0, 1]], [12, [0, 2]], [20, [0, 4]]]
      }
    },
    "paint": {
      "text-color": `${domicile === "domestic" ? "#00E5EE" : "#DD0048"}`
    }
  });

  map.addLayer({
    "id": `${domicile}-airports`,
    "type": "circle",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": airports
      }
    },
    "paint": {
      'circle-radius': {
        'stops': [[4, 4], [10, 15]]
      },
      "circle-color": `${domicile === "domestic" ? "#00E5EE" : "#DD0048"}`,
      "circle-blur": 0.2
    }
  });

  return airports;
};

export const drawRoutes = (routes, domicile, map) => {
  map.addLayer({
    "id": `${domicile}-routes`,
    "type": "line",
    "source": {
      "type": "geojson",
      "data": {
        "type": "FeatureCollection",
        "features": routes
      }
    },
    "paint": {
      "line-color": `${domicile === "domestic" ? "#00E5EE" : "#DD0048"}`,
      "line-width": {
        "stops": [[3, 1], [10, 2], [16, 4]]
      }
    }
  });

  return routes;
};

export const draw = (airports, domicile, map) => {
  drawAirports(airports, domicile, map);
  let routes = geocodeRoutes(airports);
  drawRoutes(routes, domicile, map);
};

// Coordinates for SFO airport
const sfo = [-122.3790, 37.6213];
