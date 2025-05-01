import React, { useState } from 'react';
import './NewRecord.css';

const getFormattedDate = () => {
  return new Date().toLocaleString();
};

function NewRecord({ setBudget, setItems, items }) {
  const [itemName, setItemName] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  const [itemQuantity, setItemQuantity] = useState(1);
  const [budget, setLocalBudget] = useState('');
  const [localItems, setLocalItems] = useState([]);
  const [dateTime] = useState(getFormattedDate());
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!itemName || !itemPrice || isNaN(itemPrice) || itemPrice <= 0) {
      alert('Veuillez entrer un nom valide et un prix correct.');
      return;
    }

    const priceNumber = Number(itemPrice);
    const quantityNumber = Number(itemQuantity);
    const totalPrice = priceNumber * quantityNumber;

    const currentTotal = localItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    if (currentTotal + totalPrice > Number(budget)) {
      alert('La somme des éléments dépasse votre budget !');
      return;
    }

    const newItem = {
      name: itemName,
      price: priceNumber,
      quantity: quantityNumber,
      totalPrice
    };

    setLocalItems([...localItems, newItem]);
    setItemName('');
    setItemPrice('');
    setItemQuantity(1);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    if (isNaN(budget) || budget <= 0) {
      alert('Veuillez entrer un budget valide.');
      return;
    }
    setBudget(Number(budget));
    setLocalBudget('');
  };

  const handleDelete = (index) => {
    const updatedItems = localItems.filter((_, i) => i !== index);
    setLocalItems(updatedItems);
  };

  const handleEdit = (index) => {
    const item = localItems[index];
    setItemName(item.name);
    setItemPrice(item.price);
    setItemQuantity(item.quantity);
    setEditingIndex(index);
  };

  const handleSaveEdit = () => {
    const updatedItems = [...localItems];
    updatedItems[editingIndex] = {
      ...updatedItems[editingIndex],
      name: itemName,
      price: Number(itemPrice),
      quantity: Number(itemQuantity),
      totalPrice: Number(itemPrice) * Number(itemQuantity),
    };
    setLocalItems(updatedItems);
    setEditingIndex(null);
    setItemName('');
    setItemPrice('');
    setItemQuantity(1);
  };

  const handleSave = () => {
  const newSession = {
    date: dateTime,
    budget: Number(budget),
    items: localItems
  };

  const previousRecords = JSON.parse(localStorage.getItem('records')) || [];
  const updatedRecords = [...previousRecords, newSession];

  localStorage.setItem('records', JSON.stringify(updatedRecords));
  alert('Les éléments ont été enregistrés dans l\'historique !');

  setItems([]); // Optionnel si tu n'en as plus besoin
  setLocalItems([]);
};


  const getCurrentTotal = () => {
    return localItems.reduce((acc, item) => acc + item.totalPrice, 0);
  };

  return (
    <div className="container">
      <h2>Nouvel Enregistrement</h2>

      <form onSubmit={handleBudgetSubmit} className="budget-form">
        <input
          type="number"
          value={budget}
          onChange={(e) => setLocalBudget(e.target.value)}
          placeholder="Entrez votre argent de poche"
          required
        />
        <button type="submit">Définir le budget</button>
      </form>

      <h3>Ajouter un élément</h3>
      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
          placeholder="Nom de l'élément"
          required
        />
        <input
          type="number"
          value={itemPrice}
          onChange={(e) => setItemPrice(e.target.value)}
          placeholder="Prix"
          required
        />
        <input
          type="number"
          value={itemQuantity}
          onChange={(e) => setItemQuantity(e.target.value)}
          min="1"
          required
        />
        <button type="submit">
          {editingIndex !== null ? 'Ajouter (désactivé en mode édition)' : 'Ajouter l\'élément'}
        </button>
      </form>

      <h3>Tableau des éléments ajoutés</h3>
      <p>Date de l'enregistrement : {dateTime}</p>

      <table className="item-table">
        <thead>
          <tr>
            <th>Nom de l'élément</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {localItems.map((item, index) => (
            <tr key={index}>
              <td>
                {editingIndex === index ? (
                  <input
                    type="text"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                  />
                ) : (
                  item.price
                )}
              </td>
              <td>
                {editingIndex === index ? (
                  <input
                    type="number"
                    value={itemQuantity}
                    onChange={(e) => setItemQuantity(e.target.value)}
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td>{item.totalPrice} XAF</td>
              <td>
                {editingIndex === index ? (
                  <>
                    <button onClick={handleSaveEdit}>Enregistrer</button>
                    <button onClick={() => setEditingIndex(null)}>Annuler</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(index)}>Modifier</button>
                    <button onClick={() => handleDelete(index)}>Supprimer</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total actuel : {getCurrentTotal()} XAF</h3>

      {localItems.length > 0 && (
        <div className="save-button">
          <button onClick={handleSave}>Enregistrer dans l'historique</button>
        </div>
      )}
    </div>
  );
}

export default NewRecord;
