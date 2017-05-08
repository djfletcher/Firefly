import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { domesticCodes, internationalCodes } from './routes';
import { fetchDomesticCoords, fetchIntlCoords } from './geocoding_api';

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/djfletcher/cj2f01l4s004j2sscj05ny5wb',
    center: [-97.0000, 38.0000],
    zoom: 3.7,
    scrollZoom: true
  });

  const getAirports = (codes, fetchCoords, draw) => {
    let airports = [];
    codes.forEach(code => fetchCoords(code, airports, draw));
    return airports;
  };

  const getRoutes = airports => {
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

  const drawAirports = (airports, domicile) => {
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

  const drawRoutes = (routes, domicile) => {
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

  const draw = (airports, domicile) => {
    drawAirports(airports, domicile);
    let routes = getRoutes(airports);
    drawRoutes(routes, domicile);
  };

  map.on("load", () => {
    // Need to pass #draw as a callback to geocoding api call so that airports
    // and routes can be drawn only after they are all fetched
    let domestic = getAirports(domesticCodes, fetchDomesticCoords, draw);
    let international = getAirports(internationalCodes, fetchIntlCoords, draw);
  });

  window.map = map;
});

const sfo = [-122.3790, 37.6213];
