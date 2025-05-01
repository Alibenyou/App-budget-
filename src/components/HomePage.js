import React from 'react';
import './HomePage.css';  // Fichier CSS pour styliser les cartes

function HomePage({ navigate }) {
  return (
    <div className="home-links">
      <h1>Bienvenue dans votre Gestionnaire de Tâches !</h1>
      <div className="cards">
        <div className="card" onClick={() => navigate('new-record')}>
          <h3>Nouvelle Enregistrement</h3>
          <p>Ajoutez un nouveau budget et des éléments à acheter.</p>
        </div>
        <div className="card" onClick={() => navigate('history')}>
          <h3>Historique</h3>
          <p>Voir vos enregistrements précédents et les modifier.</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
