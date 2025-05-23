// src/components/BotonRegresar.js
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';

const BotonRegresar = ({ customClass = '' }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate(-1)}
      className={`boton-regresar ${customClass}`}
      aria-label="Volver atrás"
    >
      ← Regresar
    </button>
  );
};

export default BotonRegresar;