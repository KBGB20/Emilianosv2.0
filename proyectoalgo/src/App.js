// App.js
import React, { useState } from 'react';
import './App.css';
import Sider from './components/Estructura/Sider';
import Header from './components/Estructura/Header';
import Footer from './components/Estructura/Footer';
import ArqueoCaja from './components/Estructura/Contenido/ArqueoCaja';
import GraficaGanancias from './components/Estructura/Contenido/GraficaGanancias';


function App() {
  const [isSiderOpen, setIsSiderOpen] = useState(true); // Estado para el Sider
  const [activeComponent, setActiveComponent] = useState(null); // Estado para el componente activo

  const handleToggleSider = () => {
    setIsSiderOpen(!isSiderOpen); // Alternar entre abierto y cerrado
  };

  // Mapa de componentes
  const componentMap = {
    'ArqueoCaja': (
      <>
        <ArqueoCaja />
        <GraficaGanancias />
      </>
    ),
  };

  const handleContentChange = (componentName) => {
    setActiveComponent(componentName); // Cambiar el componente activo
  };

  return (
    <div className={`layout ${isSiderOpen ? '' : 'closed'}`}>
      {isSiderOpen && <Sider onContentChange={handleContentChange} />}
      <div className="main">

        <div>
          <Header isSiderOpen={isSiderOpen} handleToggleSider={handleToggleSider} />  
        </div>

        <div className="content">
          {componentMap[activeComponent]}
        </div>

        <div>
          <Footer />
        </div>

      </div>
    </div>
  );
}

export default App;
