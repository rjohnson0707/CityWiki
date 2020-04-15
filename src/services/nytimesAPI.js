export function getNYTimes(city) {
  const endpoint = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${city}&api-key=baxBYwYbBiwIas0HYlxKEkDAo140s14e`;
  return fetch(endpoint, { mode: "cors" }).then((res) => res.json());
}
