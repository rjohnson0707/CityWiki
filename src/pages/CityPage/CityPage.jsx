import React from "react";
import "./CityPage.css";

const CityPage = (props) => {
  console.log(props.location.state.city);
  return (
    <div>
      <div className="city-header">
        <h1>{props.location.state.city.name}</h1>
      </div>
      <div className="city-info">
        <h4>Region: {props.location.state.city.region}</h4>
        <h4>Country: {props.location.state.city.country}</h4>
        <h4>Latitude: {props.location.state.city.latitude}</h4>
        <h4>Longitude: {props.location.state.city.longitude}</h4>
      </div>
    </div>
  );
};

export default CityPage;
