import React from "react";
import Logomain from './Logo-main.png'
import "./Logo.css";
import Tilt from "react-tilt";

const Logo = () => {
  return (
    <div className="ma3 mt">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 45 }}
        style={{ height: 100, width: 100 }}
      >
        <div className="Tilt-inner">
          <img src={Logomain} style ={{}} alt ='Logo'/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
