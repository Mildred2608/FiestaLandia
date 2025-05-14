import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header   from './components/Header';
import Home     from './pages/Home';
import Contacto from './pages/Contacto';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        {/* Agrega más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
