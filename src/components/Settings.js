import React from 'react';
import './Settings.css';
function Settings() {
  return (

    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center px-4">
    <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl text-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Paramètres</h1>
      <p className="text-gray-600 text-lg mb-4">
        Aucune fonctionnalité à configurer pour le moment.
      </p>
    </div>
  </div>
  );
}

export default Settings;
