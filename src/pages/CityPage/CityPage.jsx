import React, { Component } from "react";
import "./CityPage.css";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import Map from "../../components/Map/Map";

class CityPage extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
  };

  async componentDidMount() {
    const lat = this.props.location.state.city.latitude;
    const lng = this.props.location.state.city.longitude;
    const weatherData = await getCurWeatherByLatLng(lat, lng);
    this.setState({
      lat,
      lng,
      temp: Math.round(weatherData.main.temp),
      icon: weatherData.weather[0].icon,
    });
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
        <div>
          <Map lat={this.state.lat} lng={this.state.lng} />
        </div>
      </div>
    );
  }
}
export default CityPage;
