import React, { Component } from "react";
import "./CityPage.css";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import { getNYTimes } from "../../services/nytimesAPI";
// import { getRent } from "../../services/rentAPI";
import { getWebCam } from "../../services/webcamAPI";
import { getAirport } from "../../services/airportAPI";
import { getEvents } from "../../services/eventsAPI";
import {
  getFood,
  getAttraction,
  getHotel,
} from "../../services/tripAdvisorAPI";
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
    foods: [],
    places: [],
    hotels: [],
  };

  async componentDidMount() {
    const lat = this.props.location.state.city.latitude;
    const lng = this.props.location.state.city.longitude;
    const city = this.props.location.state.city.name;
    const weatherData = await getCurWeatherByLatLng(lat, lng);
    const webcamInfo = await getWebCam(lat, lng);
    const arrWebCams = webcamInfo.result.webcams;
    const citi = await getNYTimes(city);
    let arrCity = citi.response.docs;
    const airport = await getAirport(lat, lng);
    const events = await getEvents(city);
    const arrEvents = events._embedded.events;
    const Foods = await getFood(lat, lng);
    const arrFoods = Foods.data;
    const venues = await getAttraction(lat, lng);
    const arrVenues = venues.data;
    const hotels = await getHotel(lat, lng);
    const arrHotels = hotels.data;
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
      foods: [...this.state.foods, ...arrFoods],
      places: [...this.state.places, ...arrVenues],
      hotels: [...this.state.hotels, ...arrHotels],
    });
  }

  render() {
    return (
      <div>
        <div>
          <div className="city-weather">
            {this.state.temp}&deg;
            {this.state.icon && (
              <img
                src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
                alt="Current Conditions"
              />
            )}
          </div>
          <h1 className="city-header">{this.props.location.state.city.name}</h1>
        </div>
        <div className="city-info">
          <ul>
            <li>
              <span className="city-info-span">Quick Facts:</span>
            </li>
            <li>State/Region: {this.props.location.state.city.region}</li>
            <li>Country: {this.props.location.state.city.country}</li>
            <li>Latitude: {this.props.location.state.city.latitude}</li>
            <li>Longitude: {this.props.location.state.city.longitude}</li>
            {/* <p>Median Monthly Rent: ${this.state.rent}</p> */}
          </ul>
        </div>
        <div>
          <h4>
            Traveling here? Closest Airport -> {this.state.airportCode} -
            {this.state.airportName}
          </h4>
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
        <div>
          {this.state.foods.map((food, index) => (
            <div>
              {food.name} - {food.num_reviews} - {food.location_string} -{" "}
              {food.distance} - {food.web_url}
            </div>
          ))}
        </div>
        <div>
          {this.state.places.map((venue, index) => (
            <div>
              {venue.name} - {venue.num_reviews} - {venue.location_string} -{" "}
              {venue.distance} - {venue.address_obj.street1}
              {venue.photo.caption} ->{" "}
              <img src={venue.photo.images.small.url} alt="Venue" />
            </div>
          ))}
        </div>
        <div>
          {this.state.hotels.map((hotel, index) => (
            <div>
              {hotel.name} - {hotel.num_reviews} - {hotel.location_string}
              {hotel.distance} - {hotel.price} - {hotel.price_level} -{" "}
              {hotel.rating}
              {hotel.photo.caption}
              <img src={hotel.photo.images.medium.url} alt="Hotel" />
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
