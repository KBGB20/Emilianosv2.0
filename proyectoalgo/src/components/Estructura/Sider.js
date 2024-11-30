// Sider.js
import React from 'react';
import './Sider.css';

function Sider({ onContentChange }) {
  return (
    <div className="sider">
      <h2>RESTAURANTE EMILIANOS</h2>
      <button onClick={() => onContentChange('ArqueoCaja')}>
        Mostrar Arqueo Caja
      </button>
      <button onClick={() => onContentChange('Caja')}>
        Mostrar Otro Componente
      </button>
    </div>
  );
}

export default Sider;
