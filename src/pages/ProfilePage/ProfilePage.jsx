import React, { Component } from "react";
import "../CityPage/CityPage.css";
import { getCurrentLatLng } from "../../services/geolocation";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import { getNYTimes } from "../../services/nytimesAPI";
import { getRent } from "../../services/rentAPI";
import { getWebCam } from "../../services/webcamAPI";
import { getAirport } from "../../services/airportAPI";
import { getEvents } from "../../services/eventsAPI";
import { getCity } from "../../services/cityAPI";
import {
  getFood,
  getAttraction,
  getHotel,
} from "../../services/tripAdvisorAPI";
import { Card } from "react-materialize";
import Map from "../../components/Map/Map";

class ProfilePage extends Component {
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
    const details = await getCurrentLatLng();
    const lat = details.lat;
    const lng = details.lng;
    const cityDetails = await getCity(lat, lng);
    const city = cityDetails.data[0];
    const weatherData = await getCurWeatherByLatLng(lat, lng);
    const webcamInfo = await getWebCam(lat, lng);
    const arrWebCams = webcamInfo.result.webcams;
    const citi = await getNYTimes(city.name);
    const arrCity = citi.response.docs;
    const airport = await getAirport(lat, lng);
    const events = await getEvents(city.name);
    const arrEvents = events._embedded.events;
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
      city: city.name,
      country: city.country,
      distance: city.distance,
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
    console.log(city);
  }

  render() {
    return (
      <html>
        <head>
          <title>Profile</title>
          <meta charset="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, user-scalable=no"
          />
          <link rel="stylesheet" href="./ProfilePage.css" />
          <link
            href="https://fonts.googleapis.com/css2?family=Girassol&display=swap"
            rel="stylesheet"
          />
        </head>

        <body class="is-preload">
          <div id="wrapper">
            <header id="header" class="alt">
              <h1
                style={{
                  fontFamily: "Girassol",
                  fontSize: "90px",
                  textAlign: "center",
                  paddingTop: "15vh",
                }}
              >
                You are near <br />
                {this.state.city} ({this.state.distance} Mi.)
              </h1>
              <div className="weatherData">
                <p
                  style={{
                    fontFamily: "Girassol",
                    fontSize: "55px",
                    marginLeft: "10px",
                  }}
                >
                  <p style={{ fontSize: "20px" }}>Current Weather:</p>
                  {this.state.temp}&deg;
                  {this.state.icon && (
                    <img
                      src={`https://openweathermap.org/img/w/${this.state.icon}.png`}
                      alt="Current Conditions"
                    />
                  )}
                </p>
              </div>
              <div className="map-div" style={{ float: "right" }}>
                <Map lat={this.state.lat} lng={this.state.lng} />
              </div>
            </header>

            {/* Main  */}
            <div id="main">
              <section id="intro" class="main">
                <div class="spotlight">
                  <div class="content">
                    <header class="major">
                      <h2>About {this.state.city}</h2>
                    </header>
                    <ul>
                      <li>State/Region: {this.state.region}</li>
                      <li>Latitude: {this.state.lat}</li>
                      <li>Longitude: {this.state.lng}</li>
                      <li>Median Monthly Rent: ${this.state.rent}</li>
                    </ul>
                  </div>
                </div>
              </section>
              {/* First Section  */}
              <section id="first" class="main special">
                <div className="traveling-title">
                  <span className="webcam-title">Current Events</span>
                </div>
                <ul class="features">
                  <li>
                    <h3>NY Times</h3>
                    <button
                      class="collapsible"
                      onClick={this.props.handleCollapse}
                    >
                      View Articles
                    </button>
                    <p class="collapsible-info">
                      <div className="news-div">
                        <span className="news-title">Related Articles</span>
                        {this.state.news.map((article, index) => (
                          <a href={article.web_url}>
                            <div key={index} className="article-div">
                              {article.headline.print_headline} -- {""}
                              {article.lead_paragraph}
                            </div>
                          </a>
                        ))}
                      </div>
                    </p>
                  </li>

                  <li>
                    <h3>Visitor Information</h3>
                    <button
                      class="collapsible"
                      onClick={this.props.handleCollapse}
                    >
                      View Travel
                    </button>
                    <p class="collapsible-info">
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
                                  src={
                                    hotel.photo
                                      ? hotel.photo.images.small.url
                                      : ""
                                  }
                                  alt="Hotel"
                                  style={{ float: "right" }}
                                />
                                <ul>
                                  <li>Name: {hotel.name}</li>
                                  <li>Location: {hotel.location_string}</li>
                                  <li>
                                    Distance Away: {hotel.distance.slice(0, 4)}{" "}
                                    Miles
                                  </li>
                                  <li>
                                    Price Range: {hotel.price} -{" "}
                                    {hotel.price_level}
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
                        <h4 className="traveling-airport">
                          Closest Things To Do:
                        </h4>
                        <ul>
                          {this.state.places.map((venue, index) => (
                            <li>
                              <Card>
                                <img
                                  src={
                                    venue.photo
                                      ? venue.photo.images.small.url
                                      : ""
                                  }
                                  alt="Venue"
                                  style={{ float: "right" }}
                                />
                                <ul>
                                  <li>Name: {venue.name}</li>
                                  <li>Location: {venue.location_string}</li>
                                  <li>
                                    Distance Away: {venue.distance.slice(0, 4)}{" "}
                                    Miles
                                  </li>
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
                    </p>
                  </li>

                  <li>
                    <h3>Places To Go</h3>
                    <button
                      class="collapsible"
                      onClick={this.props.handleCollapse}
                    >
                      View Locations
                    </button>
                    <p class="collapsible-info">
                      <div className="traveling-hotels">
                        <h4 className="traveling-airport">
                          Closest Restaurants:
                        </h4>
                        <ul>
                          {this.state.foods.map((food, index) => (
                            <li>
                              <Card>
                                <ul>
                                  <li>Name: {food.name}</li>
                                  <li>Location: {food.location_string}</li>
                                  <li>Distance Away: {food.distance} Miles</li>
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
                                  <li>
                                    Location:
                                    {event._embedded
                                      ? event._embedded.venues[0].name
                                      : ""}
                                  </li>
                                  <li>
                                    <a href={event.url}>Check it out here</a>
                                  </li>
                                </ul>
                              </Card>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </p>
                  </li>
                </ul>
              </section>
              {/* Get Started  */}
              <section id="cta" class="main special">
                <div className="traveling-title">
                  <span className="webcam-title">Current Local Webcams</span>
                </div>
                <div className="webCams">
                  {this.state.webcams.map((webcam, index) => (
                    <div key={index} className="webcam-div">
                      <p>{webcam.title}</p>
                      <img src={webcam.image.current.preview} alt="webcam" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </body>
      </html>
    );
  }
}
export default ProfilePage;
