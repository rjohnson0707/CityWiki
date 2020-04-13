import React, { Component } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import HomePage from "../HomePage/HomePage";
import LoginPage from "../LoginPage/LoginPage";
import ProfilePage from "../ProfilePage/ProfilePage";
import SignupPage from "../SignupPage/SignupPage";
import userService from "../../services/userService";
import NavBar from "../../components/NavBar/NavBar";

class App extends Component {
  state = {
    user: userService.getUser(),
  };

  handleSignupOrLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  render() {
    return (
      <div className="App">
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
                <ProfilePage user={this.state.user} />
              ) : (
                <Redirect to="/login" />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}

export default App;