import React, { useState, useEffect } from "react";
import "./style.css";
import Draggable from "react-draggable";

function Meme(props) {
  const [appData, setAppData] = useState({
    firstline: "",
    secondline: "",
  });
  const [memeList, setMemeList] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState("25px");

  useEffect(() => {
    fetchMemes();
  }, []);

  const fetchMemes = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/memes?populate=meme"
      );
      const data = await response.json();
      setMemeList(data.data);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRandomMeme = () => {
    if (memeList.length === 0) {
      return;
    }
    const randomNumber = Math.floor(Math.random() * memeList.length);
    let randomMemeURL =
      memeList[randomNumber].attributes.meme.data[0].attributes.url;
    setRandomMeme(randomMemeURL);
  };

  const enterLine = (event) => {
    setAppData((prevAppData) => ({
      ...prevAppData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <div className="meme-container">
      <nav className="navbar">
        <img className="meme-logo" src={props.logoUrl} alt="memeLogo" />
        <p className="title">MEME GENERATOR</p>
      </nav>
      <div className="input-field">
        <input
          type="text"
          placeholder="Enter text..."
          name="firstline"
          onChange={enterLine}
          value={appData.firstline}
        />
        <input
          type="text"
          placeholder="Enter more text..."
          name="secondline"
          onChange={enterLine}
          value={appData.secondline}
        />
      </div>
      <div className="input-field">
        <label>Font Size:</label>
        <input
          type="number"
          placeholder="Font Size"
          name="fontSize"
          onChange={handleFontSizeChange}
          value={fontSize.replace("px", "")}
          style={{ width: "60px" }}
        />
      </div>

      <div className="input-field">
        <label>Text Color:</label>
        <input
          type="color"
          name="textColor"
          onChange={handleTextColorChange}
          value={textColor}
          style={{ width: "60px" }}
        />
      </div>
      <button className="generateBTN" onClick={getRandomMeme}>
        Load random meme
      </button>
      {memeList.length === 0 ? (
        <p className="loading-message">Loading...</p>
      ) : randomMeme !== null && memeList.length > 0 ? (
        <div className="meme-image">
          <img
            className="imageMeme"
            src={`http://localhost:1337${randomMeme}`}
            alt="Meme Not Responding"
          />
          <Draggable>
            <h2
              className="first"
              style={{ color: textColor, fontSize: fontSize }}
            >
              {appData.firstline}
            </h2>
          </Draggable>

          <Draggable>
            <h2
              className="second"
              style={{ color: textColor, fontSize: fontSize }}
            >
              {appData.secondline}
            </h2>
          </Draggable>
        </div>
      ) : (
        <p className="placeholder-paragraph">.</p>
      )}
    </div>
  );
}

export default Meme;
