import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { domestic } from './routes';
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

  const collectAirports = () => {
    let airports = [];
    window.airports = airports;
    domestic.forEach(a => fetchCoords(a, airports));
    window.setTimeout(() => drawAirports(airports), 2000);
  };

  const drawAirports = airports => {
    map.addLayer({
      "id": "points",
      "type": "symbol",
      "source": {
        "type": "geojson",
        "data": {
          "type": "FeatureCollection",
          "features": airports
        }
      },
      "layout": {
        "text-field": "{name} ({id})",
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top"
      }
    });

    return airports;
  };

  map.on("load", () => {
    sanitizeMap(map);
    collectAirports();
  });

  window.map = map;
  window.fetchCoords = fetchCoords;

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
