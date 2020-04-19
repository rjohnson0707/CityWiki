import React, { Component } from "react";
import "./CityPage.css";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import { getNYTimes } from "../../services/nytimesAPI";
import { getRent } from "../../services/rentAPI";
import { getWebCam } from "../../services/webcamAPI";
import { getAirport } from "../../services/airportAPI";
import { getEvents } from "../../services/eventsAPI";
import {
  getFood,
  getAttraction,
  getHotel,
} from "../../services/tripAdvisorAPI";
import { Card } from "react-materialize";
import Map from "../../components/Map/Map";

class CityPage extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
    news: [],
    rent: null,
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
    const arrEvents = events.page.totalPages > 0 ? events._embedded.events : [];
    const Foods = await getFood(lat, lng);
    const arrFoods = Foods.data;
    const venues = await getAttraction(lat, lng);
    const arrVenues = venues.data;
    const hotels = await getHotel(lat, lng);
    const arrHotels = hotels.data;
    const rentInfo = await getRent(lat, lng);
    this.setState({
      lat,
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
      news: [...this.state.news, ...arrCity],
      airportCode: airport.code,
      airportName: airport.name,
      rent: rentInfo.rent,
      webcams: [...this.state.webcams, ...arrWebCams],
      events: [...this.state.events, ...arrEvents],
      foods: [...this.state.foods, ...arrFoods],
      places: [...this.state.places, ...arrVenues],
      hotels: [...this.state.hotels, ...arrHotels],
    });
    console.log(events.page.totalPages);
  }

  render() {
    return (
      <div className="CityPage">
        <div>
          <div className="city-weather">
            <p style={{ fontSize: "20px" }}>Current Weather:</p>
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
        <div className="container">
          <div className="city-info">
            <ul>
              <li>
                <span className="city-info-span">Quick Facts:</span>
              </li>
              <li>State/Region: {this.props.location.state.city.region}</li>
              <li>Country: {this.props.location.state.city.country}</li>
              <li>Latitude: {this.props.location.state.city.latitude}</li>
              <li>Longitude: {this.props.location.state.city.longitude}</li>
              <li>Median Monthly Rent: ${this.state.rent}</li>
            </ul>
          </div>
          <div className="map-div">
            <Map lat={this.state.lat} lng={this.state.lng} />
          </div>
        </div>
        <div className="container">
          <div className="news-div">
            <span className="news-title">NY-Times (related articles)</span>
            {this.state.news.map((article, index) => (
              <a href={article.web_url}>
                <div key={index} className="article-div">
                  {article.headline.print_headline} -- {""}
                  {article.lead_paragraph}
                </div>
              </a>
            ))}
          </div>
          <div className="traveling-div">
            <div className="traveling-title">Visitor Information</div>
            <div className="traveling-airport">
              <h4>
                Closest Airport:
                {this.state.airportCode} -{this.state.airportName}
              </h4>
            </div>
            <div className="traveling-hotels">
              <h4 className="traveling-airport">Closest Hotels:</h4>
              <ul>
                {this.state.hotels.map((hotel, index) => (
                  <li>
                    <Card>
                      <img
                        src={hotel.photo ? hotel.photo.images.small.url : ""}
                        alt="Hotel"
                        style={{ float: "right" }}
                      />
                      <ul>
                        <li>Name: {hotel.name}</li>
                        <li>Location: {hotel.location_string}</li>
                        <li>Distance Away: {hotel.distance}</li>
                        <li>
                          Price Range: {hotel.price} - {hotel.price_level}
                        </li>
                        <li>Rating: {hotel.rating}</li>
                        <li>Reviews: {hotel.num_reviews}</li>
                      </ul>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
            <div className="traveling-hotels">
              <h4 className="traveling-airport">Closest Things To Do:</h4>
              <ul>
                {this.state.places.map((venue, index) => (
                  <li>
                    <Card>
                      <img
                        src={venue.photo ? venue.photo.images.small.url : ""}
                        alt="Venue"
                        style={{ float: "right" }}
                      />
                      <ul>
                        <li>Name: {venue.name}</li>
                        <li>Location: {venue.location_string}</li>
                        <li>Distance Away: {venue.distance}</li>
                        <li>Address: {venue.address_obj.street1}</li>
                        <li>Reviews: {venue.num_reviews}</li>
                        <li>
                          Picture Shown:{" "}
                          {venue.photo ? venue.photo.caption : ""}
                        </li>
                      </ul>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="fun-div">
            <div className="traveling-title">Events and Food</div>
            <div className="traveling-hotels">
              <h4 className="traveling-airport">Closest Restaurants:</h4>
              <ul>
                {this.state.foods.map((food, index) => (
                  <li>
                    <Card>
                      <ul>
                        <li>Name: {food.name}</li>
                        <li>Location: {food.location_string}</li>
                        <li>Distance Away: {food.distance}</li>
                        <li>Reviews: {food.num_reviews}</li>
                        <li>
                          <a href={food.web_url}>Visit Website</a>
                        </li>
                      </ul>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
            <div className="traveling-hotels">
              <h4 className="traveling-airport">Upcoming Events:</h4>
              <ul>
                {this.state.events.map((event, index) => (
                  <li>
                    <Card>
                      <ul>
                        <li>Title: {event.name}</li>
                        <li>Date: {event.dates.start.localDate}</li>
                        <li>Location: {event._embedded.venues[0].name}</li>
                        <li>
                          <a href={event.url}>Check it out here</a>
                        </li>
                      </ul>
                    </Card>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bottom-div">
            <div className="traveling-title">
              <span className="webcam-title">Current Local Webcams</span>
            </div>
            {this.state.webcams.map((webcam, index) => (
              <div key={index} className="webcam-div">
                <p>{webcam.title}</p>
                <img src={webcam.image.current.preview} alt="webcam" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default CityPage;
