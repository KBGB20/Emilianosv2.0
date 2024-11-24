import React, { useState } from "react";
import "./Mesa.css"; // Asegúrate de tener estilos específicos para esta página

const Mesa = () => {
    const [pedidos, setPedidos] = useState([
        {
            id: 1,
            nombre: "Pique Macho",
            estado: "Listo", // Otras opciones: "Pendiente", "Entregado"
            imagen: "/pique_macho.jpg",
        },
        {
            id: 2,
            nombre: "Sopa de Mani",
            estado: "Pendiente",
            imagen: "/sopa_mani.jpg",
        },
    ]);

    const cambiarEstadoPedido = (id, nuevoEstado) => {
        setPedidos((prevPedidos) =>
            prevPedidos.map((pedido) =>
                pedido.id === id ? { ...pedido, estado: nuevoEstado } : pedido
            )
        );
    };

    return (
        <div className="mesa-container">
            <div className="header">
                <h2>Mesa 2</h2>
                <div className="acciones">
                    <button className="btn btn-anadir">Añadir Pedido</button>
                    <button className="btn btn-generar-cuenta">Generar Cuenta</button>
                </div>
            </div>
            <div className="pedidos">
                {pedidos.map((pedido) => (
                    <div
                        key={pedido.id}
                        className={`pedido ${pedido.estado === "Listo"
                                ? "pedido-listo"
                                : pedido.estado === "Pendiente"
                                    ? "pedido-pendiente"
                                    : "pedido-entregado"
                            }`}
                    >
                        <img
                            src={pedido.imagen}
                            alt={pedido.nombre}
                            className="pedido-imagen"
                        />
                        <div className="pedido-detalle">
                            <h3>{pedido.nombre}</h3>
                            {pedido.estado === "Pendiente" && (
                                <button
                                    className="btn btn-entregar"
                                    onClick={() => cambiarEstadoPedido(pedido.id, "Listo")}
                                >
                                    Entregar
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Mesa;
