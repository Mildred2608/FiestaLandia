import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header';
import Home from './pages/Home';
import Contacto from './pages/Contacto';
import SobreNosotros from './pages/Sobrenosotros';
import SeleccionGenero from './pages/SeleccionGenero'; // Nuevo
import Grupos from './pages/Grupos'; // Muestra grupos filtrados por género
import Banquetes from './pages/Banquetes';
import Salones from './pages/Salones';
import Mobiliario from './pages/Mobiliario';
import Decoradores from './pages/Decoradores';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/sobre-nosotros" element={<SobreNosotros />} />
        <Route path="/grupos" element={<SeleccionGenero />} /> {/* Actualizado */}
        <Route path="/grupos/:genero" element={<Grupos />} />   {/* Nuevo */}
        <Route path="/banquetes" element={<Banquetes />} />
        <Route path="/salones" element={<Salones />} />
        <Route path="/mobiliario" element={<Mobiliario />} />
        <Route path="/decoradores" element={<Decoradores />} />
      </Routes>
    </Router>
  );
}

export default App;
