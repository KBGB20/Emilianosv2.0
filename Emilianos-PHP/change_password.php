<?php
session_start();
include('db.php');

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Verificar que se haya proporcionado un nombre de usuario
if (!isset($_GET['username'])) {
    echo "Usuario no especificado.";
    exit();
}

$username = $_GET['username'];
$error = '';
$success = '';

// Procesar el formulario cuando se envía
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $new_password = $_POST['new_password'];
    $confirm_password = $_POST['confirm_password'];

    if ($new_password != $confirm_password) {
        $error = "Las contraseñas no coinciden.";
    } else {
        // Encriptar la nueva contraseña
        $hashed_password = md5($new_password);

        // Actualizar la contraseña en la base de datos
        $sql = "UPDATE usuarios SET password='$hashed_password' WHERE username='$username'";
        if (mysqli_query($conn, $sql)) {
            $success = "Contraseña actualizada correctamente.";
        } else {
            $error = "Error al actualizar la contraseña.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cambiar Contraseña</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <style>
        /* Colores de fondo y botones */
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

        /* Contenedor */
        .container {
            max-width: 500px;
            margin-top: 50px;
            background-color: var(--beige-color);
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        h2 {
            color: var(--marron-oscuro-color);
            text-align: center;
            margin-bottom: 20px;
        }

        /* Estilos de botones */
        .btn-primary {
            background-color: var(--highlight-color);
            border-color: var(--highlight-color);
            color: #fff;
        }

        .btn-primary:hover {
            background-color: var(--marron-claro-color);
            border-color: var(--marron-claro-color);
        }

        .btn-secondary {
            background-color: var(--marron-claro-color);
            border-color: var(--marron-claro-color);
            color: #fff;
        }

        .btn-secondary:hover {
            background-color: var(--marron-oscuro-color);
            border-color: var(--marron-oscuro-color);
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>Cambiar Contraseña para <?php echo htmlspecialchars($username); ?></h2>

        <?php if ($error): ?>
            <div class="alert alert-danger"><?php echo $error; ?></div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="alert alert-success"><?php echo $success; ?></div>
        <?php endif; ?>

        <form action="" method="POST">
            <div class="form-group">
                <label for="new_password">Nueva Contraseña</label>
                <input type="password" class="form-control" id="new_password" name="new_password" required>
            </div>
            <div class="form-group">
                <label for="confirm_password">Confirmar Nueva Contraseña</label>
                <input type="password" class="form-control" id="confirm_password" name="confirm_password" required>
            </div>
            <button type="submit" class="btn btn-primary">Actualizar Contraseña</button>
            <a href="view_users.php" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</body>
</html>
