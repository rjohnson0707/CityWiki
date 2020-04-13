import React from "react";
import "./HomePage.css";

const HomePage = (props) => {
  return (
    <div className="HomePage">
      <div className="Search">
        <h1>Get City Information!</h1>
        <input type="text" placeholder="Type Here" />
      </div>
    </div>
  );
};

export default HomePage;
