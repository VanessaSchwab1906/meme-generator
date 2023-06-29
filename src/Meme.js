import React from "react";
import "./style.css";

function Meme(props) {
  return (
    <div className="meme-container">
      <nav className="navbar">
        <img className="meme-logo" src={props.logoUrl} alt="memeLogo" />
        <p className="title">MEME GENERATOR</p>
      </nav>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter the first line..."
          name="firstline"
        />
        <input
          type="text"
          placeholder="Enter the second line..."
          name="secondline"
        />
      </div>
      <button className="generateBTN">Load random image</button>
    </div>
  );
}

export default Meme;
