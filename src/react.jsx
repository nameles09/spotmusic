import React, { useState } from "react";
import Home from "./Home";
import Analysis from "./Analysis";
import MusicPlayer from "./MusicPlayer";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  const navigateTo = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="iphone-frame">
      <div className="screen">
        {currentPage === "home" && <Home navigateTo={navigateTo} />}
        {currentPage === "analysis" && <Analysis navigateTo={navigateTo} />}
        {currentPage === "music" && <MusicPlayer navigateTo={navigateTo} />}
      </div>
      <button
        className="home-button"
        onClick={() => navigateTo("home")}
        aria-label="Home"
      >
        🏠
      </button>
    </div>
  );
}

export default App;
