import mapboxgl from 'mapbox-gl/dist/mapbox-gl';

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-77.186587, 38.895939],
    zoom: 5,
    scrollZoom: false
  });

  map.on('load', () => {
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

    map.addLayer({
      id: 'rpd_parks',
      type: 'fill',
      source: {
        type: 'vector',
        url: 'mapbox://mapbox.3o7ubwm8'
      },
      'source-layer': 'RPD_Parks',
      "paint": {
        "fill-color": "#32cd32"
      }
    });
  });

  map.on('click', () => {
    map.flyTo({
      center: [-77.186587, 38.895939],
      zoom: 17
    });
  });
});
