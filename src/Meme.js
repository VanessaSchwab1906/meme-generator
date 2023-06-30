import React, { useState, useEffect } from "react";
import "./style.css";

function Meme(props) {
  const [appData, setAppData] = useState({
    firstline: "",
    secondline: "",
  });
  const [memeList, setMemeList] = useState([]);
  const [randomMeme, setRandomMeme] = useState(null);

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
          onChange={enterLine}
          value={appData.firstline}
        />
        <input
          type="text"
          placeholder="Enter the second line..."
          name="secondline"
          onChange={enterLine}
          value={appData.secondline}
        />
      </div>
      <button className="generateBTN" onClick={getRandomMeme}>
        Load random image
      </button>
      {memeList.length === 0 ? (
        <p>Loading...</p>
      ) : randomMeme !== null && memeList.length > 0 ? (
        <div className="meme-image">
          <img
            className="imageMeme"
            src={`http://localhost:1337${randomMeme}`}
            alt="Meme Not Responding"
          />
          <h2 className="first">{appData.firstline}</h2>
          <h2 className="second">{appData.secondline}</h2>
        </div>
      ) : (
        <p>Press the button to generate a meme</p>
      )}
    </div>
  );
}

export default Meme;
