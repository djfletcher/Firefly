import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

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
