import React from "react";
import "./Login.css";



const Login = () => {
  return (
    <div className="login-container">
      <div className="login-background">
        <img
          src="emiliano.jpg"
          alt="Restaurant background"
          className="background-image"
        />
        <div className="login-box">
          <div className="login-avatar">
            <i className="fas fa-user-circle"></i>
          </div>
          <h2>Iniciar Sesión</h2>
          <form>
            <div className="login-field">
              <label htmlFor="username">Usuario</label>
              <input type="text" id="username" placeholder="User" />
            </div>
            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" placeholder="Password" />
            </div>
            <button type="submit" className="login-button">
              Iniciar Sesión
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
