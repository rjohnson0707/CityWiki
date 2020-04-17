import React, { Component } from "react";
import "./SearchBar.css";
import Results from "../Results/Results";

class SearchBar extends Component {
  state = {
    citySearch: "",
    cities: [],
  };

  handleOnChange = (e) => {
    this.setState({ citySearch: e.target.value });
  };

  handleSearch = () => {
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
        <h1 className="searchbar-h1">Search Area</h1>
        <input
          id="searchTyping"
          type="text"
          placeholder="search here"
          className="searchbar-input"
          onChange={(event) => this.handleOnChange(event)}
          value={this.state.citySearch}
        />
        <button className="searchbar-button" onClick={this.handleSearch}>
          Search
        </button>
        <Results cities={this.state.cities} />
      </div>
    );
  }
}

export default SearchBar;
