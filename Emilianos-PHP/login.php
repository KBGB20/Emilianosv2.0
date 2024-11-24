<?php
session_start();
include('db.php');

$error = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $password = MD5($_POST['password']);

    $sql = "SELECT u.*, r.nombre as rol_nombre 
            FROM usuarios u 
            JOIN roles r ON u.rol_id = r.id 
            WHERE u.username=? AND u.password=?";
            
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ss", $username, $password);
    mysqli_stmt_execute($stmt);
    $result = mysqli_stmt_get_result($stmt);

    if ($row = mysqli_fetch_assoc($result)) {
        // Guardar información del usuario en la sesión
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['username'] = $row['username'];
        $_SESSION['nombre'] = $row['nombre'];
        $_SESSION['rol_id'] = $row['rol_id'];
        $_SESSION['rol_nombre'] = $row['rol_nombre'];

        // Definir los permisos según el rol
        $permisos = array();
        switch ($row['rol_id']) {
            case 1: // Jefe Restaurante
                $permisos = ['venta_materia_prima', 'compra_materia_prima', 'orden_producto', 
                            'producto_categoria', 'cliente_orden', 'reportes', 'usuarios', 
                            'configuracion'];
                break;
            case 2: // Cocinero
                $permisos = ['venta_materia_prima', 'compra_materia_prima', 'orden_producto', 
                            'producto_categoria', 'cliente_orden'];
                break;
            case 3: // Mesero
                $permisos = ['venta_materia_prima', 'orden_producto', 'cliente_orden'];
                break;
            case 4: // Cajero
                $permisos = ['venta_materia_prima', 'compra_materia_prima', 'orden_producto', 
                            'producto_categoria', 'cliente_orden', 'reportes'];
                break;
            case 5: // Administrador
                $permisos = ['venta_materia_prima', 'compra_materia_prima', 'orden_producto', 
                            'producto_categoria', 'cliente_orden', 'reportes', 'usuarios', 
                            'configuracion', 'sistema'];
                break;
        }
        
        $_SESSION['permisos'] = $permisos;
        
        header("Location: home.php");
        exit();
    } else {
        $error = "Usuario o contraseña incorrectos.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio de Sesión</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        body {
            background: url('img/emiliano.jpg') no-repeat center center fixed;
            background-size: cover;
            margin: 0;
            padding: 0;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .card {
            background: rgba(255, 255, 255, 0.8);
            border: none;
            border-radius: 15px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            padding: 20px;
            max-width: 400px;
            width: 100%;
        }

        .logo {
            color: #003366;
            margin-bottom: 20px;
        }

        .btn-primary {
            background-color: #003366;
            border-color: #003366;
        }

        .btn-primary:hover {
            background-color: #002244;
            border-color: #002244;
        }

        .form-control {
            border-radius: 5px;
            border-color: #ddd;
            box-shadow: none;
        }

        .form-control:focus {
            border-color: #003366;
            box-shadow: 0 0 0 0.2rem rgba(0, 51, 102, 0.25);
        }

        /* Estilo para el mensaje de error */
        .error-message {
            color: red;
            font-size: 0.9rem;
            margin-top: 10px;
        }
    </style>
</head>
<body>
    <div class="card shadow p-4 text-center">
        <div class="mb-3">
            <i class="fas fa-user-circle fa-5x logo"></i>
        </div>
        <h2 class="text-center">Iniciar Sesión</h2>

        <!-- Muestra el mensaje de error si existe -->
        <?php if (!empty($error)): ?>
            <p class="error-message"><?php echo $error; ?></p>
        <?php endif; ?>

        <form action="login.php" method="POST">
            <div class="form-group">
                <label for="username">Usuario</label>
                <input type="text" class="form-control" id="username" name="username" required>
            </div>
            <div class="form-group">
                <label for="password">Contraseña</label>
                <input type="password" class="form-control" id="password" name="password" required>
            </div>
            <button type="submit" class="btn btn-primary btn-block">Iniciar Sesión</button>
        </form>
    </div>
</body>
</html>
