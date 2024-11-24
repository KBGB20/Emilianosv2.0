<?php
session_start();
include('db.php');

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Obtener los usuarios registrados y sus roles
$sql = "SELECT u.username, u.nombre, u.email, r.nombre AS rol 
        FROM usuarios u
        JOIN roles r ON u.rol_id = r.id";
$result = mysqli_query($conn, $sql);
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ver Usuarios Registrados</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Paleta de colores */
        :root {
            --crema-color: #f7f3e9;
            --beige-color: #e8dcc1;
            --marron-claro-color: #b2927d;
            --marron-oscuro-color: #6d4c41;
            --highlight-color: #d4a373;
        }

        body {
            background-color: var(--crema-color);
        }

        /* Contenedor principal */
        .container {
            background-color: var(--beige-color);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            max-width: 900px; /* Ajustado para soportar la nueva columna */
            margin-top: 40px;
        }

        /* Título centrado */
        h2 {
            color: var(--marron-oscuro-color);
            text-align: center;
            margin-bottom: 20px;
        }

        /* Tabla estilizada */
        .table {
            background-color: #fff;
            border-radius: 5px;
            overflow: hidden;
        }

        .table th, .table td {
            text-align: center; /* Centrar texto en columnas */
            vertical-align: middle;
        }

        .table th {
            background-color: var(--marron-oscuro-color);
            color: white;
        }

        .table tbody tr:hover {
            background-color: var(--beige-color);
        }

        /* Botones personalizados */
        .btn-primary {
            background-color: var(--highlight-color);
            border-color: var(--highlight-color);
            color: #fff;
        }

        .btn-primary:hover {
            background-color: var(--marron-claro-color);
            border-color: var(--marron-claro-color);
        }

        .btn-warning {
            background-color: #f0ad4e;
            border-color: #f0ad4e;
            color: white;
        }

        .btn-danger {
            background-color: var(--marron-oscuro-color);
            border-color: var(--marron-oscuro-color);
            color: #fff;
        }

        .btn-danger:hover {
            background-color: #4e342e;
            border-color: #4e342e;
        }

        /* Botón de Cambiar Contraseña */
        .btn-change-password {
            background-color: #00c0ff;
            color: white;
            border-color: #00c0ff;
        }

        .btn-change-password:hover {
            background-color: #0099cc;
            border-color: #0099cc;
        }

        /* Estilo para alinear los botones */
        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Usuarios Registrados</h2>

        <table class="table table-bordered table-striped">
            <thead>
                <tr>
                    <th>Nombre de Usuario</th>
                    <th>Nombre Completo</th>
                    <th>Correo Electrónico</th>
                    <th>Rol</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <?php while ($row = mysqli_fetch_assoc($result)): ?>
                    <tr>
                        <td><?php echo htmlspecialchars($row['username']); ?></td>
                        <td><?php echo htmlspecialchars($row['nombre']); ?></td>
                        <td><?php echo htmlspecialchars($row['email']); ?></td>
                        <td><?php echo htmlspecialchars($row['rol']); ?></td>
                        <td class="action-buttons">
                            <a href="edit_user.php?username=<?php echo urlencode($row['username']); ?>" class="btn btn-warning btn-sm">Editar</a>
                            <a href="delete_user.php?username=<?php echo urlencode($row['username']); ?>" class="btn btn-danger btn-sm" onclick="return confirm('¿Estás seguro de que quieres eliminar este usuario?');">Eliminar</a>
                            <a href="change_password.php?username=<?php echo urlencode($row['username']); ?>" class="btn btn-change-password btn-sm">Cambiar Contraseña</a>
                        </td>
                    </tr>
                <?php endwhile; ?>
            </tbody>
        </table>
        <a href="home.php" class="btn btn-primary btn-block mt-3">Volver al Inicio</a>
    </div>
</body>
</html>
