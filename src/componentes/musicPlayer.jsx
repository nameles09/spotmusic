import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import imagemCassete from "../Imagens/imagemcassete.png";

const MusicPlayer = () => {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [progress, setProgress] = useState(50);

  const handlePlayPauseClick = () => setIsPlaying((prev) => !prev);
  const handleFavoriteClick = () => setIsFavorited((prev) => !prev);
  const handleProgressChange = (e) => setProgress(e.target.value);

  return (
    <div className="iphone-frame">
      <div className="screen">
        <div className="music-player">
          <h1 className="logo">Spotify</h1>
          <div className="cassette-container">
            <img
              src={imagemCassete}
              alt="Cassette Retro"
              className="cassette-image"
            />
          </div>
          <div className="music-info">
            <h2 className="song-title">Snoop-Cat - Barbie Girl</h2>
            <div className="progress-bar">
              <span className="time">1:37</span>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                className="progress-slider"
                onChange={handleProgressChange}
              />
              <span className="time">3:18</span>
            </div>
            <div className="player-controls">
              <button
                className="retro-button play-pause-button"
                onClick={handlePlayPauseClick}
              >
                {isPlaying ? " " : " "}
              </button>
              <button
                className="retro-button skip-back-button"
                onClick={() => alert("Recuar música")}
              >
                
              </button>
              <button
                className="retro-button skip-forward-button"
                onClick={() => alert("Avançar música")}
              >
                
              </button>
              <button
                className={`retro-button favorite-button ${
                  isFavorited ? "favorited" : ""
                }`}
                onClick={handleFavoriteClick}
              >
                {isFavorited ? " " : " "}
              </button>
              <button
                className="retro-button back-button"
                onClick={() => navigate("/analysis")}
              >
                
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
