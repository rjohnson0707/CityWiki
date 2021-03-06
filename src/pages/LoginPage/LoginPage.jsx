import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import userService from "../../services/userService";

class LoginPage extends Component {
  state = {
    email: "",
    pw: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await userService.login(this.state);
      //Let App know a user has signed up
      this.props.handleSignupOrLogin();
      // Successfully signed up - show GamePage
      this.props.history.push("/");
    } catch (err) {
      // HERE IS WHERE YOU WILL USE TOAST (NOT ALERT)
      alert("Invalid credentials");
    }
  };

  render() {
    return (
      <div className="LoginPage">
        <header className="header-footer">
          Enter Email and Password Below
        </header>
        <form className="form-horizontal" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                value={this.state.email}
                name="email"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={this.state.pw}
                name="pw"
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12 text-center">
              <button className="btn btn-default">Log In</button>
              &nbsp;&nbsp;&nbsp;
              <Link to="/">
                <button className="btn btn-default">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default LoginPage;
