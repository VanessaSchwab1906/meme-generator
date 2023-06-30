import React from "react";
import Meme from "./Meme";
import "./style.css";
import logoUrl from "./doge.png";

function App() {
  return (
    <div className="app-container">
      <Meme logoUrl={logoUrl} />
    </div>
  );
}

export default App;
