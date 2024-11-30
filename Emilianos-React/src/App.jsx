import { Space } from "antd";
import React, { useState } from "react";
import "./App.css";
import AppHeader from "./Components/AppHeader";
import PageContent from "./Components/PageContent";
import SideMenu from "./Components/SideMenu";
import Login from "./Pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="App">
      {isAuthenticated ? (
        // Sistema principal
        <>
          <AppHeader />
          <div className="SideMenuAndPageContent">
            <SideMenu />
            <PageContent />
          </div>
        </>
      ) : (
        // Interfaz de login
                // Sistema principal
                <>
                <AppHeader />
                <div className="SideMenuAndPageContent">
                  <SideMenu />
                  <PageContent />
                </div>
              </>
      )}
    </div>
  );
}

export default App;