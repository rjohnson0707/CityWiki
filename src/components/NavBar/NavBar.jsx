import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = (props) => {
  let nav = props.user ? (
    <div>
      <Link to="/" className="NavBar-link">
        Home
      </Link>
      <Link to="/profile" className="NavBar-link">
        Profile
      </Link>
      <Link to="" className="NavBar-link" onClick={props.handleLogout}>
        Log Out
      </Link>
      <span className="NavBar-welcome">Hello {props.user.name}!</span>
      <span className="NavBar-logo">CityWiki</span>
    </div>
  ) : (
    <div>
      <Link to="/login" className="NavBar-link">
        Log In
      </Link>
      <Link to="/signup" className="NavBar-link">
        Sign Up
      </Link>
    </div>
  );
  return <div className="NavBar">{nav}</div>;
};

export default NavBar;
