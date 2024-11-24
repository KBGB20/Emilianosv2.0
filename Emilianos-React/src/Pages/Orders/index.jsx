import { EyeOutlined } from "@ant-design/icons";
import { Modal, Space, Table, Typography } from "antd";
import { useEffect, useState } from "react";
import { getOrders } from "../../API";
import "../../App.css";

function Orders() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    setLoading(true);
    getOrders().then((res) => {
      setDataSource(res);
      setLoading(false);
    });
  }, []);

  // Función para abrir el modal con los datos del pedido seleccionado
  const handleViewDetails = (record) => {
    setSelectedOrder(record); // Guarda los datos seleccionados
    setIsModalOpen(true); // Abre el modal
  };

  return (
    <Space size={20} direction="vertical">
      <Typography.Title
        level={6}
        className="customtitle"
        style={{ color: "#A0522D" }}
      >
        Historial de Ventas
      </Typography.Title>
      <Table
        className="custom-table"
        loading={loading}
        columns={[
          {
            title: "Mesa",
            dataIndex: "mesa", // Cambia según la clave del JSON
          },
          {
            title: "Total",
            dataIndex: "total", // Cambia según la clave del JSON
            render: (value) => <span>Bs. {value}</span>,
          },
          {
            title: "Tipo de Pago",
            dataIndex: "tipoPago", // Cambia según la clave del JSON
          },
          {
            title: "Fecha",
            dataIndex: "fecha", // Cambia según la clave del JSON
          },
          {
            title: "Acciones",
            render: (_, record) => (
              <EyeOutlined
                style={{ fontSize: "18px", cursor: "pointer", color: "#555" }}
                onClick={() => handleViewDetails(record)} // Abre el modal con los datos
              />
            ),
          },
        ]}
        dataSource={dataSource}
        pagination={{
          pageSize: 5,
        }}
      />
      {/* Modal para mostrar los detalles de la factura */}
      <Modal
        title="FACTURA"
        visible={isModalOpen}
        onCancel={() => setIsModalOpen(false)} // Cierra el modal
        footer={null}
      >
        {selectedOrder && (
          <>
            <div>
              <p>
                <strong>Nombre:</strong> {selectedOrder.nombre}
              </p>
              <p>
                <strong>NIT:</strong> {selectedOrder.nit}
              </p>
              <p>
                <strong>Razón Social:</strong> {selectedOrder.razonSocial}
              </p>
              <p>
                <strong>Fecha:</strong> {selectedOrder.fecha}
              </p>
              <p>
                <strong>Mesa:</strong> {selectedOrder.mesa}
              </p>
              <p>
                <strong>Tipo de pago:</strong> {selectedOrder.tipoPago}
              </p>
            </div>
            <div
              style={{
                backgroundColor: "#f5f5f5",
                padding: "10px",
                borderRadius: "5px",
                marginTop: "10px",
              }}
            >
              <table style={{ width: "100%", textAlign: "left" }}>
                <thead>
                  <tr>
                    <th>Descripción</th>
                    <th>Cantidad</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedOrder.detalles.map((item, index) => (
                    <tr key={index}>
                      <td>{item.descripcion}</td>
                      <td>{item.cantidad}</td>
                      <td>{item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p style={{ textAlign: "right", marginTop: "10px" }}>
                <strong>Total a pagar:</strong> Bs. {selectedOrder.total}
              </p>
            </div>
          </>
        )}
      </Modal>
    </Space>
  );
}

export default Orders;
