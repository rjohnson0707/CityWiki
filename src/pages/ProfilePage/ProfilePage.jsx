import React from "react";
import "./ProfilePage.css";

const ProfilePage = (props) => {
  return (
    <div className="Profile">
      <div className="Profile-h1">
        <h1>{props.user.name}'s Profile</h1>
      </div>
      <div className="Profile-info">
        <h4>Name: {props.user.name}</h4>
        <h4>Email: {props.user.email}</h4>
        <h5>Edit Info</h5>
      </div>
    </div>
  );
};

export default ProfilePage;
