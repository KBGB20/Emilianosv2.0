import React, { useState } from "react";
import { Select, InputNumber } from "antd";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para redirección

const { Option } = Select;

const initialTables = [
  { id: 1, name: "Mesa 1", status: "Disponible", orders: 0 },
  { id: 2, name: "Mesa 2", status: "Disponible", orders: 2 },
  { id: 3, name: "Mesa 3", status: "Cuenta", orders: 4 },
  { id: 4, name: "Mesa 4", status: "Reservada", orders: 1 },
  { id: 5, name: "Mesa 5", status: "Disponible", orders: 0 },
  { id: 6, name: "Mesa 6", status: "Disponible", orders: 3 },
];

function Dashboard() {
  const [tables, setTables] = useState(initialTables);
  const navigate = useNavigate(); // Hook para redirigir

  const updateTableStatus = (id, newStatus) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, status: newStatus } : table
      )
    );
  };

  const updateOrders = (id, newOrders) => {
    setTables((prevTables) =>
      prevTables.map((table) =>
        table.id === id ? { ...table, orders: newOrders } : table
      )
    );
  };

  const handleImageClick = () => {
    navigate("/pedidos"); // Redirigir siempre a la página de pedidos
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "calc(100vh - 64px)",
        background: "rgba(0, 0, 0, 0)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
          gap: "20px",
          maxWidth: "999px",
          justifyContent: "center",
        }}
      >
        {tables.map((table) => (
          <div
            key={table.id}
            style={{
              position: "relative",
              border: "2px solid #ddd",
              borderRadius: "10px",
              padding: "10px",
              textAlign: "center",
              backgroundColor:
                table.status === "Disponible"
                  ? "#d4fcd4"
                  : table.status === "Ocupada"
                  ? "#fcd4d4"
                  : table.status === "Reservada"
                  ? "#fcf8d4"
                  : "#f9d3f9", // Color para "Cuenta"
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            {/* Imagen como botón */}
            <img
              src="/Mesa.png"
              alt={table.name}
              onClick={handleImageClick} // Redirige a /pedidos sin importar la mesa
              style={{
                width: "100px",
                height: "auto",
                marginBottom: "10px",
                cursor: "pointer",
              }}
            />
            <p>{table.name}</p>

            {/* Lista desplegable para cambiar el estado */}
            <Select
              value={table.status}
              style={{ width: "100%", marginBottom: "10px" }}
              onChange={(value) => updateTableStatus(table.id, value)}
            >
              <Option value="Disponible">Disponible</Option>
              <Option value="Ocupada">Ocupada</Option>
              <Option value="Reservada">Reservada</Option>
              <Option value="Cuenta">Cuenta</Option>
            </Select>

            {/* Campo editable para las órdenes */}
            <InputNumber
              min={0}
              value={table.orders}
              onChange={(value) => updateOrders(table.id, value)}
              style={{ width: "100%" }}
              placeholder="Órdenes"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
