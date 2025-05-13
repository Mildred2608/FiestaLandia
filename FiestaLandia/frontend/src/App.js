import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8000/api/hello/')
      .then(response => setMensaje(response.data.message))
      .catch(error => console.error('Error al conectar con Django:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>¡Bienvenido a FiestaLandia!</h1>
        <p>Este es el frontend de tu proyecto.</p>
      </header>
    </div>
  );
}

export default App;
