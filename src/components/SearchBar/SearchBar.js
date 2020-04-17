import React, { Component } from "react";
import "./SearchBar.css";
import Results from "../Results/Results";
import { Button } from "react-materialize";

class SearchBar extends Component {
  state = {
    citySearch: "",
    cities: [],
  };

  handleOnChange = (e) => {
    this.setState({ citySearch: e.target.value });
  };

  handleSearch = () => {
    this.setState({
      cities: [],
    });
    this.makeApiCall(this.state.citySearch);
  };

  makeApiCall = (searchInput) => {
    const axios = require("axios");
    const citys = [];
    var obj = {};
    axios({
      method: "GET",
      url: "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "wft-geo-db.p.rapidapi.com",
        "x-rapidapi-key": "fd75a6be18msh76470128d8b7561p15ed12jsn879a5300b686",
      },
      params: {
        limit: 10,
        namePrefix: `${searchInput}`,
        sort: "-population",
      },
    })
      .then((response) => {
        for (let i = 0; i < response.data.data.length; i++) {
          obj[i] = response.data.data[i];
          // citys.push(response.data.data[i].city );
          citys.push(obj[i]);
        }
        // console.log(obj);
        console.log(citys);
        this.setState({ cities: [...this.state.cities, ...citys] });
        console.log(this.state.cities);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    return (
      <div className="searchbar-div">
        <h1 className="searchbar-h1">Welcome to CityWiki</h1>
        <h4 className="searchbar-h4">
          Enter any city below and Wiki-Away! If you are looking for your
          current location just click on MyCityWiki above!
        </h4>
        <div className="search-div">
          <input
            id="searchTyping"
            type="text"
            placeholder="Enter City Name"
            onChange={(event) => this.handleOnChange(event)}
            value={this.state.citySearch}
            style={{ background: "white", opacity: 0.75 }}
          />
          <Button onClick={this.handleSearch}>Search</Button>
        </div>
        <Results cities={this.state.cities} />
      </div>
    );
  }
}

export default SearchBar;
