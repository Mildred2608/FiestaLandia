import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/Sobrenosotros';
import Grupos from './pages/Grupos'; // <-- ¡Esta línea es necesaria!
import './styles/style.css';


function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/grupos" element={<Grupos />} />
        {/* Agrega más rutas aquí */}
      </Routes>
    </Router>
  );
}

export default App;
