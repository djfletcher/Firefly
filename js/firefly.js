import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { domesticCodes, internationalCodes } from './routes';
import { fetchCoords } from './geocoding_api';

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-97.0000, 38.0000],
    zoom: 3.7,
    scrollZoom: true
  });

  const getAirports = codes => {
    let airports = [];
    codes.forEach(code => fetchCoords(code, airports));
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

  const drawAirports = airports => {
    map.addLayer({
      "id": "domestic-airport-names",
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
        "text-color": "#4666FF"
      }
    });

    map.addLayer({
      "id": "domestic-airports",
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
        "circle-color": "#4666FF",
        "circle-blur": 0.2
      }
    });

    return airports;
  };

  const drawRoutes = routes => {
    map.addLayer({
      "id": "domestic-routes",
      "type": "line",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": routes
        }
      },
      "paint": {
        "line-color": "#4666FF",
        "line-width": {
          "stops": [[3, 1], [10, 2], [16, 4]]
        }
      }
    });

    return routes;
  };

  map.on("load", () => {
    sanitizeMap(map);
    let domestic = getAirports(domesticCodes);
    // let international = getAirports(internationalCodes);
    window.setTimeout(() => {
      drawAirports(domestic);
      // drawAirports(international);
      let domesticRoutes = getRoutes(domestic);
      // let internationalRoutes = getRoutes(international);
      drawRoutes(domesticRoutes);
      // drawRoutes(internationalRoutes);
    }, 2000);
  });

  window.map = map;

  // map.addLayer({
  //   id: 'terrain-data',
  //   type: 'line',
  //   source: {
  //     type: 'vector',
  //     url: 'mapbox://mapbox.mapbox-terrain-v2'
  //   },
  //   'source-layer': 'contour',
  //   "paint": {
  //     "line-color": "#32cd32"
  //   }
  // });
  // //   map.setPaintProperty('water', 'fill-color', '#D4AF37');
  // //   map.setPaintProperty('sand', 'fill-color', '#00FFFF');
  // //   map.setPaintProperty('building', 'fill-color', '#FF9933');
  // //   map.setPaintProperty("road-primary", 'line-color', '#FF9933');

  // //   let style = map.getStyle();
  // //   let layers = style.layers;
  // //   // debugger;
  // //   // console.log(layers.map(layer => [layer.id, layer.type]));
  // // });
});

const sanitizeMap = map => {
  map.removeLayer("airport-label");
  map.removeLayer("place-town");
  map.removeLayer("place-city-sm");
  map.removeLayer("place-city-md-s");
  map.removeLayer("place-city-md-n");
  map.removeLayer("place-city-lg-s");
  map.removeLayer("place-city-lg-n");
  map.removeLayer("state-label-sm");
  map.removeLayer("state-label-md");
  map.removeLayer("state-label-lg");
  map.removeLayer("country-label-sm");
  map.removeLayer("country-label-md");
  map.removeLayer("country-label-lg");
};

const sfo = [-122.3790, 37.6213];
