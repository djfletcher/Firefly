export const fetchDomesticCoords = (airport, airports, draw, map) => {
  $.ajax({
    method: 'GET',
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${airport.name} ${airport.id} airport.json?`
          + `access_token=pk.eyJ1IjoiZGpmbGV0Y2hlciIsImEiOiJjajF6bjR5djUwMzQzMndxazY3cnR5MGtmIn0.EhgTpiAXtQ6D0H82S24b5g`
          + `&type=poi&language=en&country=us`,
    success: function(r) {
      let geoJson = {};
      geoJson['geometry'] = r.features[0].geometry;
      geoJson['type'] = 'Feature';
      geoJson['properties'] = airport;
      airports.push(geoJson);
      // Draw domestic routes after they've all been fetched
      if (airports.length === 77) {
        draw(airports, "domestic", map);
      }
    },
  });
};

export const fetchIntlCoords = (airport, airports, draw, map) => {
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
      // If airport is in asia, draw coordinates west of SF instead of east
      if (geoJson.geometry.coordinates[0] > 40) {
        geoJson.geometry.coordinates[0] -= 360;
      }
      geoJson['type'] = 'Feature';
      geoJson['properties'] = airport;
      airports.push(geoJson);
      // Draw international routes after they've all been fetched
      if (airports.length === 52) {
        draw(airports, "international", map);
      }
    }
  });
};
