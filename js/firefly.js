import mapboxgl from 'mapbox-gl/dist/mapbox-gl';
import { domesticCodes, internationalCodes } from './airport_codes';
import { fetchDomesticCoords, fetchIntlCoords } from './geocoding_api';
import { geocodeAirports, draw } from './mapmaker';

window.addEventListener("DOMContentLoaded", () => {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/djfletcher/cj2f01l4s004j2sscj05ny5wb',
    center: [-97.0000, 38.0000],
    zoom: 3.7
  });

  map.on("load", () => {
    // Pass draw as a callback to geocoding api call so that airports
    // and routes are drawn only after they are all fetched
    geocodeAirports(domesticCodes, fetchDomesticCoords, draw, map);
    geocodeAirports(internationalCodes, fetchIntlCoords, draw, map);
  });
});
