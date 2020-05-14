import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../services/userService";
import NavBar from "../../components/NavBar/NavBar";
import CityPage from "../CityPage/CityPage";

class App extends Component {
  state = {
    user: userService.getUser(),
    city: "",
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleCollapse = () => {
    var coll = document.getElementsByClassName("collapsible");
    var i;

    for (i = 0; i < coll.length; i++) {
      coll[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div>
          <NavBar user={this.state.user} handleLogout={this.handleLogout} />
          <Switch>
            <Route
              exact
              path="/"
              render={() => (
                <HomePage
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={({ history }) => (
                <SignupPage
                  history={history}
                  handleSignupOrLogin={this.handleSignupOrLogin}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={({ history }) => (
                <LoginPage
                  handleSignupOrLogin={this.handleSignupOrLogin}
                  history={history}
                />
              )}
            />
            <Route
              exact
              path="/profile"
              render={() =>
                userService.getUser() ? (
                  <ProfilePage
                    user={this.state.user}
                    handleCollapse={this.handleCollapse}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route
              exact
              path="/citypage"
              render={({ location }) =>
                userService.getUser() ? (
                  <CityPage
                    user={this.state.user}
                    city={this.state.city}
                    location={location}
                    handleCollapse={this.handleCollapse}
                  />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
