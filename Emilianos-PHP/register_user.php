<?php
session_start();
include('db.php');

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

// Obtener roles de la base de datos
$sql_roles = "SELECT id, nombre FROM roles";
$result_roles = mysqli_query($conn, $sql_roles);
$roles = mysqli_fetch_all($result_roles, MYSQLI_ASSOC);

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $username = mysqli_real_escape_string($conn, $_POST['username']);
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = MD5($_POST['password']); // Nota: MD5 no es seguro para producción
    $rol_id = mysqli_real_escape_string($conn, $_POST['rol_id']);

    // Insertar el nuevo usuario con rol
    $sql = "INSERT INTO usuarios (username, nombre, email, password, rol_id) 
            VALUES (?, ?, ?, ?, ?)";
            
    $stmt = mysqli_prepare($conn, $sql);
    mysqli_stmt_bind_param($stmt, "ssssi", $username, $nombre, $email, $password, $rol_id);
    
    if (mysqli_stmt_execute($stmt)) {
        header("Location: view_users.php");
        exit();
    } else {
        $error = "Error al registrar el usuario: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registrar Nuevo Usuario</title>
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

        .form-container {
            background-color: var(--beige-color);
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
            max-width: 400px;
            margin-top: 40px;
        }

        h2 {
            color: var(--marron-oscuro-color);
            text-align: center;
            margin-bottom: 20px;
        }

        .form-control {
            border-radius: 5px;
            border-color: #ddd;
            box-shadow: none;
        }

        .form-control:focus {
            border-color: var(--marron-oscuro-color);
            box-shadow: 0 0 0 0.2rem rgba(109, 76, 65, 0.25);
        }

        .btn-primary {
            background-color: var(--highlight-color);
            border-color: var(--highlight-color);
        }

        .btn-primary:hover {
            background-color: var(--marron-claro-color);
            border-color: var(--marron-claro-color);
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
        
        /* Estilo para mensajes de error */
        .error-message {
            color: #dc3545;
            margin-top: 10px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="container d-flex justify-content-center">
        <div class="form-container">
            <h2>Registrar Nuevo Usuario</h2>
            <?php if (isset($error)): ?>
                <div class="error-message"><?php echo $error; ?></div>
            <?php endif; ?>
            <form action="register_user.php" method="POST">
                <div class="form-group">
                    <label for="username">Nombre de Usuario</label>
                    <input type="text" class="form-control" name="username" placeholder="Nombre de Usuario" required>
                </div>
                <div class="form-group">
                    <label for="nombre">Nombre Completo</label>
                    <input type="text" class="form-control" name="nombre" placeholder="Nombre Completo" required>
                </div>
                <div class="form-group">
                    <label for="email">Correo Electrónico</label>
                    <input type="email" class="form-control" name="email" placeholder="Correo Electrónico" required>
                </div>
                <div class="form-group">
                    <label for="password">Contraseña</label>
                    <input type="password" class="form-control" name="password" placeholder="Contraseña" required>
                </div>
                <div class="form-group">
                    <label for="rol_id">Rol</label>
                    <select class="form-control" name="rol_id" required>
                        <option value="">Seleccione un rol</option>
                        <?php foreach ($roles as $rol): ?>
                            <option value="<?php echo $rol['id']; ?>">
                                <?php echo htmlspecialchars($rol['nombre']); ?>
                            </option>
                        <?php endforeach; ?>
                    </select>
                </div>
                <button type="submit" class="btn btn-primary btn-block">Registrar Usuario</button>
                <a href="home.php" class="btn btn-danger btn-block mt-2">Cancelar</a>
            </form>
        </div>
    </div>
</body>
</html>