import { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get("https://api.openweathermap.org/data/2.5/forecast", {
        params: {
          q: "Santa Cruz de la Sierra,BO", // Ciudad
          appid: "f9aec778c34d7a85bc63dd9dd88e6586", // Tu API key de OpenWeatherMap
          units: "metric", // Temperatura en grados Celsius
          lang: "es", // Cambia el idioma a español
        },
      })
      .then((response) => {
        setWeather(response.data);
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  }, []);

  if (!weather) {
    return <Typography>Cargando clima...</Typography>;
  }

  // Promedio de temperaturas de los próximos 5 días
  const temperatures = weather.list
    .slice(0, 5)
    .map((forecast) => forecast.main.temp);
  const avgTemp = (
    temperatures.reduce((a, b) => a + b, 0) / temperatures.length
  ).toFixed(1);

  const tempColor = avgTemp > 25 ? "red" : "blue";

  // Condiciones del clima (descripción)
  const conditions = weather.list
    .slice(0, 5)
    .map((forecast) => forecast.weather[0].description);
  const mostCommonCondition = conditions
    .sort(
      (a, b) =>
        conditions.filter((v) => v === a).length -
        conditions.filter((v) => v === b).length
    )
    .pop();

  // Mapeo a clases de animación
  const weatherAnimations = {
    "cielo claro": "sun-animation",
    "nubes dispersas": "clouds-animation",
    "muy nuboso": "overcast-animation",
    "lluvia ligera": "light-rain-animation",
    "lluvia moderada": "moderate-rain-animation",
    "lluvia intensa": "heavy-rain-animation",
    "tormenta": "storm-animation",
    "nieve ligera": "light-snow-animation",
    "nieve": "snow-animation",
    "niebla": "fog-animation",
    "bruma": "mist-animation",
  };

  const animationClass = weatherAnimations[mostCommonCondition] || "default-animation";

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "1rem",
        backgroundColor: "#FFFF",
      }}
    >
      <Box className={animationClass} sx={{ width: "100%", height: "200px" }}>
        {/* Animación basada en el clima */}
      </Box>
      <Typography variant="h6">
        Pronóstico general para los próximos 5 días en {weather.city.name}
      </Typography>
      <Typography variant="body1" sx={{ color: tempColor }}>
        La temperatura promedio será de unos <strong>{avgTemp}°C</strong>.
      </Typography>
      <Typography variant="body1">
        El clima será principalmente <strong>{mostCommonCondition}</strong>{" "}
        durante el día.
      </Typography>
    </Box>
  );
}
