export const fetchDomesticCoords = (airport, airportsCollection) => {
  let country = "us";
  $.ajax({
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${airport.name} ${airport.id} airport.json?`
          + `access_token=pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g`
          + `&type=poi&language=en&country=${country}`,
    success: function(r) {
      let geoJson = {};
      geoJson['geometry'] = r.features[0].geometry;
      geoJson['type'] = 'Feature';
      geoJson['properties'] = airport;
      airportsCollection.push(geoJson);
    },
  });
};

export const fetchIntlCoords = (airport, airportsCollection) => {
  let comma = airport.name.indexOf(',');
  // Need to slice two indices past comma to get to country name
  let country = airport.name.slice(comma + 2);
  $.ajax({
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${airport.name} ${airport.id}.json?`
          + `access_token=pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g`
          + `&type=poi&language=en&country=${country}`,
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
