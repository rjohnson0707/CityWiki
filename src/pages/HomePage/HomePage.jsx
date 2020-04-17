import React from "react";
import "./HomePage.css";
import SearchBar from "../../components/SearchBar/SearchBar";

const HomePage = (props) => {
  let main = props.user ? (
    <div className="HomePage">
      <SearchBar />
    </div>
  ) : (
    <div className="HomePage">
      <h1 style={{ marginTop: 0 }}>Welcome To CityWiki!</h1>
      <h4>Please Log In or Sign Up in order to begin your City Searches</h4>
    </div>
  );

  return <div>{main}</div>;
};

export default HomePage;
