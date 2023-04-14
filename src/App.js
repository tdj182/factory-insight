import React, {useEffect, useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Factories from './components/Factories';
import Codex from './components/Codex';


function App() {
  const [refreshed, setRefreshed] = useState(false);

  useEffect(() => {
    const navigationEntries = window.performance.getEntriesByType('navigation');
    const navigationEntry = navigationEntries[navigationEntries.length - 1];
    if (navigationEntry.type === 'reload') {
      setRefreshed(true);
    }
  }, []);
  
  return (
    <div className="App" style={{ backgroundColor: '#525252' }}>
      <Router basename="/factory-insight">
        <Header />
        <Routes>
          <Route path="/" element={<Factories />} />
          <Route path="/factories" element={<Factories />} />
          <Route path="/codex" element={<Codex />} />
          {refreshed && <Route path="*" element={<Navigate to="/" />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
