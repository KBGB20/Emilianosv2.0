// backend/server.js
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const port = 5000;

// Configuración de CORS para permitir solicitudes desde el frontend
app.use(cors({
  origin: 'http://localhost:3000'  // Ajusta según tu configuración
}));

// Conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'presi007',
  database: 'arqueo_caja',
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar con la base de datos:', err);
    return;
  }
  console.log('Conectado a la base de datos');
});

// Endpoint para obtener los datos del arqueo
app.get('/api/arqueo', (req, res) => {
  const query = 'SELECT * FROM arqueo_caja'; // Suponiendo que tienes la tabla "arqueo_caja"
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los datos:', err);
      return res.status(500).json({ error: 'Error al obtener los datos' });
    }
    res.json(results); // Devuelve los datos de la base de datos
  });
});

app.get('/api/ganancias-por-dia', (req, res) => {
  const query = `
    SELECT DATE(fecha) AS dia, SUM(ganancia) AS total_ganancias
    FROM ventas
    GROUP BY DATE(fecha)
    ORDER BY DATE(fecha) ASC;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las ganancias por día:', err);
      return res.status(500).json({ error: 'Error al obtener las ganancias por día' });
    }
    res.json(results); // Enviamos las ganancias agrupadas al frontend
  });
});


// Inicia el servidor Express
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
