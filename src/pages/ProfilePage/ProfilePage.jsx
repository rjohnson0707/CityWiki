import React from "react";

const ProfilePage = (props) => {
  return (
    <div>
      <h1>This is {props.user.name}'s Profile Page</h1>
    </div>
  );
};

export default ProfilePage;
