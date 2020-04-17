export function getFood(lat, lng) {
  const endpoint = `https://tripadvisor1.p.rapidapi.com/restaurants/list-by-latlng?limit=5&currency=USD&distance=10&lunit=km&lang=en_US&latitude=${lat}&longitude=${lng}`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
    },
  }).then((res) => res.json());
}

export function getAttraction(lat, lng) {
  const endpoint = `https://tripadvisor1.p.rapidapi.com/attractions/list-by-latlng?lunit=km&currency=USD&limit=3&distance=25&lang=en_US&longitude=${lng}&latitude=${lat}`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
    },
  }).then((res) => res.json());
}

export function getHotel(lat, lng) {
  const endpoint = `https://tripadvisor1.p.rapidapi.com/hotels/list-by-latlng?lang=en_US&limit=3&currency=USD&latitude=${lat}&longitude=${lng}`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-rapidapi-host": "tripadvisor1.p.rapidapi.com",
      "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
    },
  }).then((res) => res.json());
}
