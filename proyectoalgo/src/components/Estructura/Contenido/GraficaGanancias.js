import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import moment from 'moment';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const GraficaGanancias = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Hacer la solicitud a la API para obtener las ganancias por día
    axios.get('http://localhost:5000/api/ganancias-por-dia')
      .then((response) => {
        const data = response.data;

        // Procesar los datos para Chart.js
        const labels = data.map(item => moment(item.dia).format('DD-MM-YYYY')); // Formato de fecha que deseas
        const ganancias = data.map(item => item.total_ganancias);

        // Configurar los datos de la gráfica
        setChartData({
          labels: labels,
          datasets: [
            {
              label: 'Ganancias por Día',
              data: ganancias,
              backgroundColor: '#d92001', // Color de las barras
              borderColor: 'rgba(54, 162, 235, 1)', // Color del borde
              borderWidth: 1,
            },
          ],
        });
      })
      .catch((error) => {
        console.error('Error al obtener las ganancias por día:', error);
      });
  }, []); // Este efecto solo se ejecuta una vez cuando el componente se monta

  // Si los datos están cargando, muestra un mensaje
  if (!chartData) {
    return <p>Cargando datos...</p>;
  }

  return (
    <div>
      <h2>Ganancias por Día</h2>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: {
                title: { display: true, text: 'Día' },
                ticks: {
                  callback: function(value) {
                    return moment(value).format('DD-MM-YYYY');  // Formato de fecha para el eje X
                  },
                },
              },
              y: {
                title: { display: true, text: 'Ganancias ($)' },
                beginAtZero: true,
              },
            },
          }}
          height={400}
          width={600}
        />
      ) : (
        <p>Cargando datos...</p>
      )}
    </div>
  );
};

export default GraficaGanancias;
