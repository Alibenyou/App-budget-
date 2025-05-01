import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'; // Utilisation correcte
import HomePage from './components/HomePage';
import NewRecord from './components/NewRecord';
import History from './components/History';
import Settings from './components/Settings';

function App() {
  const [budget, setBudget] = useState(0);
  const [items, setItems] = useState([]);

  return (
    <Router> {/* Utilise HashRouter ici */}
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/new-record"
            element={
              <NewRecord
                setBudget={setBudget}
                setItems={setItems}
                items={items}
              />
            }
          />
          <Route path="/history" element={<History />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
