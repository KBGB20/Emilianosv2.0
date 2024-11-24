import React, { useEffect, useState } from "react";
import { Table, Typography, Button, Modal, Input, Space, Tag } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

// Componente Mesas
function Mesas() {
  const [loading, setLoading] = useState(false);
  const [mesas, setMesas] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newMesa, setNewMesa] = useState("");

  // Cargar datos de mesas desde mesas.json
  useEffect(() => {
    setLoading(true);
    fetch("/mesas.json")
      .then((res) => res.json())
      .then((data) => {
        setMesas(data);
        setLoading(false);
      });
  }, []);

  // Función para agregar una nueva mesa
  const handleAddMesa = () => {
    const nuevaMesa = {
      id: mesas.length + 1,
      numero: newMesa,
      estado: "Disponible",
    };
    setMesas([...mesas, nuevaMesa]);
    setNewMesa("");
    setIsModalOpen(false);
  };

  // Función para eliminar una mesa
  const handleDeleteMesa = (id) => {
    const nuevasMesas = mesas.filter((mesa) => mesa.id !== id);
    setMesas(nuevasMesas);
  };

  return (
    <Space size={10} direction="vertical" style={{ width: "100%" }}>
      <Typography.Title
        level={6}
        className="customtitle"
        style={{ color: "#A0522D" }}
      >Mesas
      </Typography.Title>

      <Button
        type="primary"
        icon={<PlusOutlined style={{ fontSize: "18px", verticalAlign: "middle" }} />}
        style={{
        backgroundColor: "#4CAF50", // Color verde atractivo
        borderColor: "#4CAF50",
        color: "#fff",
        fontWeight: "bold",
        fontSize: "16px",
        borderRadius: "8px",
        padding: "10px 20px", // Aumentar espacio interno
        height: "auto", // Permitir altura dinámica
        display: "flex",
        alignItems: "center", // Centrar contenido verticalmente
        justifyContent: "center", // Centrar contenido horizontalmente
        gap: "8px", // Espaciado entre el ícono y el texto
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        Crear nueva mesa
      </Button>

      <Table
        className="custom-table"
        loading={loading}
        dataSource={mesas}
        rowKey="id"
        columns={[
          {
            title: "Mesa número",
            dataIndex: "numero",
            key: "numero",
          },
          {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            render: (estado) => {
              let color = estado === "Disponible" ? "green" : estado === "Ocupado" ? "red" : "orange";
              return <Tag color={color}>{estado}</Tag>;
            },
          },
          {
            title: "Acciones",
            key: "acciones",
            render: (_, record) => (
              <Space>
                <Button
                  type="default"
                  icon={<EditOutlined />}
                  onClick={() => console.log("Editar mesa", record)}
                />
                <Button
                  type="primary"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleDeleteMesa(record.id)}
                />
              </Space>
            ),
          },
        ]}
        pagination={{ pageSize: 5 }}
      />

      {/* Modal para crear una nueva mesa */}
      <Modal
        title="Crear Mesa"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={handleAddMesa}
        okText="Crear"
      >
        <Input
          placeholder="Número de la mesa"
          value={newMesa}
          onChange={(e) => setNewMesa(e.target.value)}
        />
      </Modal>
    </Space>
  );
}

export default Mesas;
