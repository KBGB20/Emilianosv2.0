import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Para redirigir
import "./Login.css";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirección

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const response = await fetch(
        "https://localhost/Emilianos/Emilianos-PHP/login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            username: username,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Opcional, para mostrar un mensaje de éxito
        navigate("/dashboard"); // Redirige al Dashboard
      } else {
        setError(data.message); // Muestra mensaje de error
      }
    } catch (error) {
      setError("Ocurrió un error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className="login-field">
              <label htmlFor="username">Usuario</label>
              <input type="text" id="username" name="username" required />
            </div>
            <div className="login-field">
              <label htmlFor="password">Contraseña</label>
              <input type="password" id="password" name="password" required />
            </div>
            {error && <p className="error-message">{error}</p>}
            <button type="submit" className="login-button" disabled={loading}>
              {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
