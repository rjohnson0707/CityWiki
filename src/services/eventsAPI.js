export function getEvents(citi) {
  const endpoint = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${citi}&size=5&radius=50&unit=miles&sort=date,asc&apikey=GOGqpPj59oBPPSp8agheuYnENbRgDlId`;
  return fetch(endpoint, {
    method: "GET",
  }).then((res) => res.json());
}

// key = GOGqpPj59oBPPSp8agheuYnENbRgDlId
// secret = A27tUAYv2zrW2rCC
