import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import platos from "./platos.json";
import { useState, useEffect } from "react";

export default function BluuCard({ categoria, onAddToCart }) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPlato, setSelectedPlato] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState("");
  const [showSnackbar, setShowSnackbar] = useState(false); // Estado para el mensaje de confirmación

  useEffect(() => {
    setData(platos);
  }, []);

  const filteredPlatos = categoria
    ? data.filter((plato) => plato.categoria.nombreCategoria === categoria)
    : data;

  const handleAddToCart = (plato) => {
    setSelectedPlato(plato);
    setQuantity(1);
    setNotes("");
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPlato(null);
    setQuantity(1);
    setNotes("");
  };

  const handleConfirmAddToCart = () => {
    if (onAddToCart && selectedPlato) {
      onAddToCart(selectedPlato, quantity, notes);
    }
    setOpenModal(false);
    setSelectedPlato(null);
    setQuantity(1);
    setNotes("");

    // Mostrar el mensaje de confirmación
    setShowSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <>
      <Grid container spacing={2} padding={4}>
        {filteredPlatos.map((plato) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={plato.id}>
            <Card
              sx={{
                width: "100%",
                height: 350,
                transition: "0.2s",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  image={plato.urlImagen}
                  alt={plato.description}
                  sx={{ height: 180 }}
                />
                <CardContent>
                  <Typography variant="h5">{plato.nombre}</Typography>
                  <Typography>{plato.description}</Typography>
                  <Typography variant="body2" component="p">
                    {plato.stock + " "}
                    {plato.stock > 1 ? "disponibles" : "disponible"}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  width="100%"
                  verticalAlign="center"
                >
                  <Typography
                    color="text.primary"
                    style={{ fontSize: "15px", marginTop: "8px" }}
                  >
                    <span style={{ marginRight: "22px", marginLeft: "20px" }}>
                      {plato.preciounitario} Bs
                    </span>
                  </Typography>
                  <Box>
                    <Button
                      variant="contained"
                      onClick={() => handleAddToCart(plato)}
                    >
                      Agregar
                    </Button>
                  </Box>
                </Box>
              </CardActions>
            </Card>
          </Grid>
        ))}

        <Dialog open={openModal} onClose={handleCloseModal}>
          {selectedPlato && (
            <>
              <DialogTitle>{selectedPlato.nombre}</DialogTitle>
              <DialogContent>
                <Typography>{selectedPlato.description}</Typography>
                <Typography variant="body2" component="p">
                  {selectedPlato.stock + " "}
                  {selectedPlato.stock > 1 ? "disponibles" : "disponible"}
                </Typography>
                <Typography color="text.primary" style={{ fontSize: "15px" }}>
                  <span style={{ marginRight: "22px", marginLeft: "20px" }}>
                    {selectedPlato.preciounitario} Bs
                  </span>
                </Typography>

                {/* Contenedor para mantener alineación */}
                <Box
                  display="flex"
                  flexDirection="row"
                  gap={2}
                  mt={2}
                  alignItems="flex-start"
                  justifyContent="flex-start"
                >
                  {/* Campo para Cantidad */}
                  <TextField
                    label="Cantidad"
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    type="number"
                    InputProps={{
                      inputProps: { min: 1, max: selectedPlato.stock },
                    }}
                    sx={{
                      width: "250px", // Mismo ancho para ambos
                      height: "56px", // Altura fija para alineación
                    }}
                  />
                  {/* Campo para Notas adicionales */}
                  <TextField
                    label="Notas adicionales"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    multiline
                    rows={1} // Reducir a una fila para evitar expansión
                    sx={{
                      width: "250px", // Mismo ancho que el campo de Cantidad
                      height: "56px", // Altura fija para alineación
                    }}
                  />
                </Box>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseModal}>Cancelar</Button>
                <Button
                  variant="contained"
                  onClick={handleConfirmAddToCart}
                >
                  Agregar al Carrito
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Snackbar para el mensaje de confirmación */}
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
            <Typography variant="body1" fontWeight="bold">
              ¡Pedido confirmado!
            </Typography>
            <Typography>
              Gracias por adquirir del restaurante Emilianos.
            </Typography>
          </Alert>
        </Snackbar>
      </Grid>
    </>
  );
}
