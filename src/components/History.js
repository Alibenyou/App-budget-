import React, { useState, useEffect } from 'react';
import './History.css';

function History() {
  const [records, setRecords] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem('records')) || [];
    setRecords(storedRecords);
  }, []);

  const toggleCard = (index) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  const deleteRecord = (indexToDelete) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette note ?")) {
      const updatedRecords = records.filter((_, index) => index !== indexToDelete);
      setRecords(updatedRecords);
      localStorage.setItem('records', JSON.stringify(updatedRecords));
      if (selectedIndex === indexToDelete) {
        setSelectedIndex(null);
      }
    }
  };

  return (
    <div className="historique-container">
      <h2>Historique des Notes</h2>
      <div className="card-list">
        {records.map((record, index) => (
          <div
            key={index}
            className={`history-card ${selectedIndex === index ? 'open' : ''}`}
            onClick={() => toggleCard(index)}
          >
            <h3>Note du {record.date}</h3>
            <p>Argent de poche : {record.budget || 0} FCFA</p>

            {selectedIndex === index && (
              <div className="card-details">
                <table>
                  <thead>
                    <tr>
                      <th>Nom</th>
                      <th>Prix</th>
                      <th>Quantité</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {record.items?.map((item, i) => (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.price} XAF</td>
                        <td>{item.quantity}</td>
                        <td>{item.totalPrice} XAF</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Bouton Supprimer */}
                <button className="delete-button" onClick={(e) => {
                  e.stopPropagation(); // pour éviter de refermer la carte
                  deleteRecord(index);
                }}>
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
