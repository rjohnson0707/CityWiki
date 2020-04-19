import React from "react";
import "./Results.css";
import { Link } from "react-router-dom";

const handleCity = (city) => {
  console.log(city);
};

const Results = (props) => {
  return props.cities ? (
    <div className="results-div">
      <ul>
        {props.cities.map((city, index) => (
          <div className="city-list">
            <li>
              <Link
                onClick={handleCity}
                to={{ pathname: "/citypage", state: { city } }}
              >
                <div key={index} className="city-div">
                  {city.name}, {city.region}, {city.country}
                </div>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  ) : (
    <p>Try searching for a City</p>
  );
};

export default Results;
