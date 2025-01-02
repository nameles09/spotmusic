/*import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <h1>🎧 Bem-vindo ao Spotitados 🎧</h1>
      <p>
        Descubra os seus artistas favoritos, os álbuns mais tocados e muito
        mais, num estilo clássico e nostálgico.
      </p>
      <div className="button-container">
        <button className="retro-button" onClick={() => navigate("/analysis")}>
          Top 100 Artistas
        </button>
        <button className="retro-button" onClick={() => navigate("/analysis")}>
          Horas por Dia
        </button>
        <button className="retro-button" onClick={() => navigate("/analysis")}>
          Artistas por Estação
        </button>
        <button className="retro-button" onClick={() => navigate("/analysis")}>
          Top Álbuns
        </button>
      </div>
      <img
        src="/Imagens/imagemcassete.png"
        alt="Cassete retrô"
        className="cassette-image"
      />
    </div>
  );
};

export default LandingPage;
