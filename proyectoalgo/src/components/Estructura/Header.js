import React from 'react';
import './Header.css';

function Header({ isSiderOpen, handleToggleSider }) {
  return (
    <div className="header">
      <button className="toggle-sider" onClick={handleToggleSider}>
        {isSiderOpen ? 'Cerrar Menú' : 'Abrir Menú'}
      </button>  
      <button className='toggle-sider'>AccionDEF</button>
      <button className='toggle-sider'>AccionDEF</button>  
      <button className='toggle-sider'>AccionDEF</button>  
      <button className='toggle-sider'>AccionDEF</button>  
      <button className='toggle-sider'>AccionDEF</button>  
    </div>
  );
}

export default Header;
