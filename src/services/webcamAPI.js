export function getWebCam(lat, lng) {
  const endpoint = `https://api.windy.com/api/webcams/v2/list/nearby=${lat},${lng},250/orderby=distance/limit=3?show=webcams:image,location:categories`;
  return fetch(endpoint, {
    method: "GET",
    headers: {
      "x-windy-key": "zrSbayp1ULC5GGmuxLvPBeDFdnQkZsyU",
    },
  }).then((res) => res.json());
}
