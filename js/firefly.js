import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { domestic } from './routes';

let airports = [];

const fetchCoords = airport => {
  let airportId = airport.id;
  $.ajax({
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${airportId}.json?`
          + `access_token=pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g`
          + `&types=poi&country=us`,
    success: function(r) {
      airport['geometry'] = r.features[0].geometry;
      airports.push(airport);
    }
  });
};

[
  {
    'id': 'ABQ',
    'name':	'Albuquerque, NM'
  },
  {
    'id': 'ACV',
    'name':	'Eureka, CA'
  },
  {
    'id': 'ANC',
    'name':	'Anchorage, AK'
  }
].forEach(a => fetchCoords(a));

// const airports = domestic.map(a => {
//   let geometry = fetchCoords(a.id);
//   a['geometry'] = geometry;
//   return a;
// });

console.log(airports);

window.fetchCoords = fetchCoords;
window.airports = airports;

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-97.0000, 38.0000],
    zoom: 3.7,
    scrollZoom: true
  });



  map.on('load', () => {

  });

  map.addLayer({
    id: 'terrain-data',
    type: 'line',
    source: {
      type: 'vector',
      url: 'mapbox://mapbox.mapbox-terrain-v2'
    },
    'source-layer': 'contour',
    "paint": {
      "line-color": "#32cd32"
    }
  });
  // //   map.setPaintProperty('water', 'fill-color', '#D4AF37');
  // //   map.setPaintProperty('sand', 'fill-color', '#00FFFF');
  // //   map.setPaintProperty('building', 'fill-color', '#FF9933');
  // //   map.setPaintProperty("road-primary", 'line-color', '#FF9933');

  // //   let style = map.getStyle();
  // //   let layers = style.layers;
  // //   // debugger;
  // //   // console.log(layers.map(layer => [layer.id, layer.type]));
  // // });

  window.map = map;
});
