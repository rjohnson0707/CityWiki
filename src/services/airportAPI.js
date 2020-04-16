export function getAirport(lat, lng) {
  const endpoint = `https://cometari-airportsfinder-v1.p.rapidapi.com/api/airports/nearest?lng=${lng}&lat=${lat}`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "cometari-airportsfinder-v1.p.rapidapi.com",
      "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
    },
  }).then((res) => res.json());
}
