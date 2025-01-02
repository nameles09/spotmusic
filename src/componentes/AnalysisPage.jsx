/*import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsonData from "../Spotify/spotify_data_history.json"; 
import HomeButton from "./HomeButton";

function AnalysisPage() {
  const [displayData, setDisplayData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const navigate = useNavigate();

  const handleButtonClick = (metric) => {
    setSelectedMetric(metric);

    switch (metric) {
      case "topArtists":
        const topArtists = jsonData
          .slice(0, 100)
          .map((item) => `${item.artist}: ${item.play_count} vezes`);
        setDisplayData(topArtists);
        break;

      case "hoursByDay":
        const hoursByDay = jsonData.map(
          (item) => `${item.artist}: ${item.hours_per_day} horas por dia`
        );
        setDisplayData(hoursByDay);
        break;

      case "artistBySeason":
        const seasons = ["Primavera", "Verão", "Outono", "Inverno"];
        const groupedBySeason = seasons.map((season) => ({
          season,
          artists: jsonData
            .filter((item) => item.season === season)
            .map((item) => [item.artist, item.play_count]),
        }));
        setDisplayData(groupedBySeason);
        break;

      case "topAlbums":
        const topAlbums = jsonData.map(
          (item) => `${item.album}: ${item.play_count} vezes`
        );
        setDisplayData(topAlbums);
        break;

      default:
        setDisplayData([]);
        break;
    }
  };

  const handleCassetteClick = () => {
    navigate("/music"); 
  };

  return (
    <div className="App analysis-page">
      <HomeButton />
      <h1>🎧 Análise do Spotify - Estilo Retrô 🎧</h1>

      <div className="stats-section">
        <button
          className="retro-button"
          onClick={() => handleButtonClick("topArtists")}
        >
          Top 100 Artistas
        </button>
        <button
          className="retro-button"
          onClick={() => handleButtonClick("hoursByDay")}
        >
          Horas por Dia
        </button>
        <button
          className="retro-button"
          onClick={() => handleButtonClick("artistBySeason")}
        >
          Artistas por Estação
        </button>
        <button
          className="retro-button"
          onClick={() => handleButtonClick("topAlbums")}
        >
          Top Álbuns
        </button>
      </div>

      <div className="results">
        {selectedMetric === "artistBySeason" ? (
          displayData.map((seasonData, index) => (
            <div key={index} className="season-data">
              <h2>{seasonData.season}</h2>
              <ul>
                {seasonData.artists.map(([artist, count], i) => (
                  <li key={i}>{`${artist}: ${count} vezes`}</li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <ul>
            {displayData.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}
      </div>

      <button className="cassette-button" onClick={handleCassetteClick}>
        🎵
      </button>
    </div>
  );
}

export default AnalysisPage;
