import React, { Component } from "react";
import "./CityPage.css";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import { getNYTimes } from "../../services/nytimesAPI";
// import { getRent } from "../../services/rentAPI";
import { getWebCam } from "../../services/webcamAPI";
import { getAirport } from "../../services/airportAPI";
import { getEvents } from "../../services/eventsAPI";
import Map from "../../components/Map/Map";

class CityPage extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
    news: [],
    // rent: null,
    airport: null,
    webcams: [],
    events: [],
  };

  async componentDidMount() {
    const lat = this.props.location.state.city.latitude;
    const lng = this.props.location.state.city.longitude;
    const city = this.props.location.state.city.name;
    const weatherData = await getCurWeatherByLatLng(lat, lng);
    // const city = this.props.location.state.city.name;
    const webcamInfo = await getWebCam(lat, lng);
    const arrWebCams = webcamInfo.result.webcams;
    const citi = await getNYTimes(city);
    let arrCity = citi.response.docs;
    const airport = await getAirport(lat, lng);
    const events = await getEvents(city);
    const arrEvents = events._embedded.events;
    // const rentInfo = await getRent(lat, lng);
    this.setState({
      lat,
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
      news: [...this.state.news, ...arrCity],
      airportCode: airport.code,
      airportName: airport.name,
      // rent: rentInfo.rent,
      webcams: [...this.state.webcams, ...arrWebCams],
      events: [...this.state.events, ...arrEvents],
    });
    console.log(arrEvents);
  }

  render() {
    return (
      <div>
        <div className="city-header">
          <h1>{this.props.location.state.city.name}</h1>
        </div>
        <div className="city-info">
          <h4>Region: {this.props.location.state.city.region}</h4>
          <h4>Country: {this.props.location.state.city.country}</h4>
          <h4>Latitude: {this.props.location.state.city.latitude}</h4>
          <h4>Longitude: {this.props.location.state.city.longitude}</h4>
          {/* <h4>Median Monthly Rent: ${this.state.rent}</h4> */}
          <h4>
            Traveling here? Closest Airport -> {this.state.airportCode} -{" "}
            {this.state.airportName}
          </h4>
        </div>
        <div>
          {this.state.temp}&deg;
          {this.state.icon && (
            <img
              src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
              alt="Current Conditions"
            />
          )}
        </div>
        <div className="map-div">
          <Map lat={this.state.lat} lng={this.state.lng} />
        </div>
        <div>
          {this.state.news.map((article, index) => (
            <div key={index} className="article-div">
              {article.source} --
              {article.lead_paragraph}
            </div>
          ))}
        </div>
        <div>
          {this.state.webcams.map((webcam, index) => (
            <div key={index} className="webcam-div">
              <img src={webcam.image.current.preview} alt="webcam" />
              <p>{webcam.title}</p>
            </div>
          ))}
        </div>
        <div>
          {this.state.events.map((event, index) => (
            <div>
              {event.dates.start.localDate}-{event.name} - {event.url} -{" "}
              {event._embedded.venues[0].name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
export default CityPage;

// return props.cities ? (
//   <div className="results-div">
//     {props.cities.map((city, index) => (
//       <Link
//         onClick={handleCity}
//         to={{ pathname: "/citypage", state: { city } }}
//       >
//         <div key={index} className="city-div">
//           {city.name}, {city.country}
//         </div>
//       </Link>
//     ))}
//   </div>
// ) : (
//   <p>Try searching for a City</p>
// );
