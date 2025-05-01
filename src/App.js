import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import NewRecord from './components/NewRecord';
import History from './components/History';
import Settings from './components/Settings';

function App() {
  const [budget, setBudget] = useState(0);
  const [items, setItems] = useState([]);

  return (
    <BrowserRouter basename="/App-budget-">
      <div className="App">
        <Routes>
          <Route path="/" element={<HomePage navigate={(page) => window.location.href = `/${page}`} />} />
          <Route path="/new-record" element={<NewRecord setBudget={setBudget} setItems={setItems} />} />
          <Route path="/history" element={<History items={items} setItems={setItems} />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
