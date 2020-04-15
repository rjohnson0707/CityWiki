import React, { Component } from "react";
import "./ProfilePage.css";
import { getCurrentLatLng } from "../../services/geolocation";
import { getCurWeatherByLatLng } from "../../services/weatherAPI";
import Map from "../../components/Map/Map";

class ProfilePage extends Component {
  state = {
    lat: null,
    lng: null,
    temp: null,
  };

  async componentDidMount() {
    const { lat, lng } = await getCurrentLatLng();
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
      <div className="Profile">
        <div className="Profile-h1">
          <h1>{this.props.user.name}'s Profile</h1>
        </div>
        <div className="Profile-info">
          <h4>Name: {this.props.user.name}</h4>
          <h4>Email: {this.props.user.email}</h4>
          <h5>Edit Info</h5>
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

export default ProfilePage;
