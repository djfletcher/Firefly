export const fetchCoords = (airport, airportsCollection) => {
  let airportId = airport.id;
  let country = "us";
  $.ajax({
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${airportId}+airport.json?`
          + `access_token=pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g`
          + `&types=poi&language=en&country=${country}`,
    success: function(r) {
      let geoJson = {};
      geoJson['geometry'] = r.features[0].geometry;
      geoJson['type'] = 'Feature';
      geoJson['properties'] = airport;
      airportsCollection.push(geoJson);
    },
    error: function(f) {
      debugger;
    }
  });
};
