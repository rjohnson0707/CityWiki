export function getCity(lat, lng) {
  const endpoint = `https://geo-services-by-mvpc-com.p.rapidapi.com/cities/findcitiesfromlatlong?limit=1&location=${lat},${lng}&radius=200&sort=population,desc&language=en`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "geo-services-by-mvpc-com.p.rapidapi.com",
      "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
    },
  }).then((res) => res.json());
}
