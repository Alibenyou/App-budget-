import React from 'react';
import './HomePage.css';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-links">
      <h1>Bienvenue dans votre Gestionnaire de Tâches</h1>
      <div className="cards">
        <div
          className="card"
          onClick={() => navigate('/new-record')}
          role="button"
          tabIndex={0}
        >
          <h3>Nouvel Enregistrement</h3>
          <p>Ajoutez votre argent de poche et les éléments à acheter.</p>
        </div>
        <div
          className="card"
          onClick={() => navigate('/history')}
          role="button"
          tabIndex={0}
        >
          <h3>Historique</h3>
          <p>Consultez vos enregistrements précédents et modifiez-les.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
