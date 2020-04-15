export function getRent(lat, lng) {
  const endpoint = `https://realty-mole-property-api.p.rapidapi.com/rentalPrice?longitude=${lng}&latitude=${lat}`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "realty-mole-property-api.p.rapidapi.com",
      "x-rapidapi-key": "b911670ab8msh55e3785c6b6bff6p1ea295jsn0e10556fe70a",
    },
  }).then((res) => res.json());
}
