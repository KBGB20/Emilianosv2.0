import React, { useEffect, useState } from 'react';
import './styles.css';  // Asegúrate de que la ruta sea correcta

function ArqueoCaja() {
  const [arqueoData, setArqueoData] = useState([]);

  useEffect(() => {
    // Realiza la petición a la API
    fetch('http://localhost:5000/api/arqueo')  // Asegúrate de que la URL es correcta
      .then((response) => response.json()) // Convierte la respuesta a JSON
      .then((data) => {
        console.log(data);  // Verifica que los datos se están recibiendo
        setArqueoData(data); // Actualiza el estado con los datos recibidos
      })
      .catch((error) => console.error('Error al cargar los datos:', error));
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="arqueo-caja">
      <h2>Arqueo de Caja</h2>
      {arqueoData.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        <div className="arqueo-info">
          {arqueoData.map((arqueo) => (
            <div className="info-item" key={arqueo.id}>
              <label>Fecha:</label>
              <input
                type="text"
                value={new Date(arqueo.fecha).toLocaleDateString()}
                readOnly
              />
              <label>Monto:</label>
              <input
                type="number"
                value={arqueo.monto}
                readOnly
              />
              <label>Detalles:</label>
              <input
                type="text"
                value={arqueo.detalles}
                readOnly
              />
            </div>
          ))}
        </div>
      )}
    </div>    
  );
}

export default ArqueoCaja;
