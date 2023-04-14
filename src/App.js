import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Factories from './components/Factories';
import Codex from './components/Codex';


function App() {
  return (
    <div className="App" style={{ backgroundColor: '#525252' }}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Factories />} />
          <Route path="/factories" element={<Factories />} />
          <Route path="/codex" element={<Codex />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
