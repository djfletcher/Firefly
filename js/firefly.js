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

    map.setPaintProperty('water', 'fill-color', '#D4AF37');
    map.setPaintProperty('sand', 'fill-color', '#00FFFF');
    map.setPaintProperty('building', 'fill-color', '#FF9933');
    map.setPaintProperty("road-primary", 'line-color', '#FF9933');
    map.setStyle({
      "version": 8,
      "layers": [
        {
          "id": "water-label",
          "type": "symbol",
          "source": "mapbox://mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v7",
          "paint": {
            'text-color': '#8b0000'
          }
        },
        {
          "id": "airport-label",
          "type": "symbol",
          "paint": {
            'text-color': '#8b0000',
            'text-size': '30',
            'text-halo-width': '6',
            'text-halo-blur': '6',
            'icon-size': '3'
          }
        }
      ]
    });
    // map.setStyle({
    //   "airport-label": {
    //     'text-color': '#8b0000',
    //     'text-size': '30',
    //     'text-halo-width': '6',
    //     'text-halo-blur': '6',
    //     'icon-size': '3'
    //   }
    // });

    let style = map.getStyle();
    let layers = style.layers;
    // debugger;
    // console.log(layers.map(layer => [layer.id, layer.type]));
  });

  map.on('click', () => {
    map.flyTo({
      center: [-77.186587, 38.895939],
      zoom: 17
    });
  });

  window.map = map;
});
