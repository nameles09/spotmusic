import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import jsonData from './Spotify/spotify_data_history.json';
import imagemCassete from './Imagens/imagemcassete.png';
import logo from './Imagens/logo.png';


function IphoneFrame({ children }) {
  return (
    <div className="iphone-frame">
      <div className="notch"></div>
      <div className="screen">{children}</div>
      <div className="home-indicator"></div>
    </div>
  );
}


function HomeButton() {
  const navigate = useNavigate();
  return (
    <button className="home-button" onClick={() => navigate('/')}>🏠</button>
  );
}


function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing-page">
      <img src={logo} alt="Logo" className="corner-logo" />
      <div className="menu-principal">
      <h1>🎵 Bem-vindo ao Spot Music 🎵</h1>
      <div className="texto-secundario">
      <p>Descubra seus artistas favoritos, álbuns mais tocados e muito mais, com um toque nostálgico!</p> </div>
      <button onClick={() => navigate('/analysis')} className="retro-button">Iniciar Análise</button>
      </div>
    </div>
    
  );
}


function AnalysisPage() {
  const [displayData, setDisplayData] = useState([]);
  const [selectedMetric, setSelectedMetric] = useState(null);
  const navigate = useNavigate();

  const handleCassetteClick = () => navigate('/cassette');

  const handleButtonClick = (metric) => {
    setSelectedMetric(metric);
    let result = [];

    switch (metric) {
      case 'topArtists':
        const artistCount = {};
        jsonData.forEach((item) => {
          const artist = item.master_metadata_album_artist_name;
          if (artist) artistCount[artist] = (artistCount[artist] || 0) + 1;
        });
        result = Object.entries(artistCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 100)
          .map(([artist, count]) => `${artist}: ${count} vezes`);
        break;

      case 'hoursByDay':
        const playTimeByDay = {};
        jsonData.forEach((item) => {
          if (item.ts) {
            const date = new Date(item.ts).toLocaleDateString();
            playTimeByDay[date] =
              (playTimeByDay[date] || 0) + item.ms_played / 3600000;
          }
        });
        result = Object.entries(playTimeByDay).map(
          ([day, hours]) => `${day}: ${hours.toFixed(2)} horas`
        );
        break;

      case 'artistBySeason':
        const seasons = {
          Winter: ['12', '01', '02'],
          Spring: ['03', '04', '05'],
          Summer: ['06', '07', '08'],
          Autumn: ['09', '10', '11'],
        };
        const artistBySeason = {
          Winter: {},
          Spring: {},
          Summer: {},
          Autumn: {},
        };

        jsonData.forEach((item) => {
          if (item.ts && item.master_metadata_album_artist_name) {
            const month = new Date(item.ts).getMonth() + 1;
            const season = Object.keys(seasons).find((key) =>
              seasons[key].includes(month.toString().padStart(2, '0'))
            );
            artistBySeason[season][item.master_metadata_album_artist_name] =
              (artistBySeason[season][item.master_metadata_album_artist_name] ||
                0) + 1;
          }
        });

        result = Object.entries(artistBySeason).map(([season, artists]) => ({
          season,
          artists: Object.entries(artists)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10),
        }));
        break;

      case 'topAlbums':
        const albumCount = {};
        jsonData.forEach((item) => {
          if (item.master_metadata_album_album_name) {
            albumCount[item.master_metadata_album_album_name] =
              (albumCount[item.master_metadata_album_album_name] || 0) + 1;
          }
        });
        result = Object.entries(albumCount)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 50)
          .map(([album, count]) => `${album}: ${count} vezes`);
        break;

      default:
        result = [];
        break;
    }

    setDisplayData(result);
  };

  return (
    <div className="App">
      <HomeButton />
      <img src={logo} alt="Logo" className="corner-logo" />
      <div className="page-2">
      <h1>🎧 Análise do Spot Music 🎧</h1>
      <div className="stats-section">
        <button onClick={() => handleButtonClick('topArtists')}>Top 100 Artistas</button>
        <button onClick={() => handleButtonClick('hoursByDay')}>Horas por Dia</button>
        <button onClick={() => handleButtonClick('artistBySeason')}>Artistas por Estação</button>
        <button onClick={() => handleButtonClick('topAlbums')}>Top Álbuns</button>
      </div>

      <div className="results">
        {selectedMetric === 'artistBySeason' ? (
          displayData.map((seasonData, index) => (
            <div key={index}>
              <h2>{seasonData.season}</h2>
              <ul>
                {seasonData.artists.map(([artist, count], index) => (
                  <li key={index}>{`${artist}: ${count} vezes`}</li>
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
      </div>
      <button className="cassette-button" onClick={handleCassetteClick}>🎵</button>
    </div>
  );
}


function MusicPlayer() {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="music-player">
      <HomeButton />
      <div className="cassette-container">
        <img src={imagemCassete} alt="Cassette Retro" className="cassette-image" />
      </div>
      <div className="music-info">
        <h2>Snoop-Cat - Barbie Girl</h2>
        <div className="progress-bar">
          <span>1:37</span>
          <input type="range" min="0" max="100" value="50" className="progress-slider" readOnly />
          <span>3:18</span>
        </div>
        <div className="player-controls">
          <button className="control-button previous">⏮️</button>
          <button className="control-button play-pause">⏯️</button>
          <button className="control-button next">⏭️</button>
          <button
            className={`control-button like ${liked ? 'liked' : ''}`}
            onClick={toggleLike}
          >
            {liked ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  );
}
function App() {
  return (
    <IphoneFrame>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/analysis" element={<AnalysisPage />} />
          <Route path="/cassette" element={<MusicPlayer />} />
        </Routes>
      </Router>
    </IphoneFrame>
  );
}

export default App;
