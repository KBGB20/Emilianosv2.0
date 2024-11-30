import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import BluuCard from "./components/BluuCard.jsx";
import { CssBaseline, Typography } from "@mui/material";
import NavBar from "./components/navbar/NavBar.jsx";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Weather from "./components/Weather.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ed7902",
    },
    secondary: {
      main: "#ec1c24",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={theme}>
      <NavBar />
      <br />
      <Typography fontSize={25} paddingLeft={4}>
        Desayunos
      </Typography>
      <br />
      <BluuCard categoria="Desayuno" />
      <Typography fontSize={25} paddingLeft={4}>
        Platos Principales
      </Typography>

      <br />
      <BluuCard categoria="Plato Principal" />
      <Typography fontSize={25} paddingLeft={4}>
        Sopas
      </Typography>

      <br />
      <BluuCard categoria="Sopa" />
      <Weather />
    </ThemeProvider>
  </React.StrictMode>
);
