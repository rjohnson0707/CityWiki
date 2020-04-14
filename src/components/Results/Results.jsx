import React from "react";
import "./Results.css";
import { Link } from "react-router-dom";

const handleCity = (city) => {
  console.log(city);
};

const Results = (props) => {
  return props.cities ? (
    <div className="results-div">
      {props.cities.map((city, index) => (
        <Link
          onClick={handleCity}
          to={{ pathname: "/citypage", state: { city } }}
        >
          <div key={index} className="city-div">
            {city.name}, {city.country}
          </div>
        </Link>
      ))}
    </div>
  ) : (
    <p>Try searching for a City</p>
  );
};

export default Results;
