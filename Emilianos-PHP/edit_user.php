<?php
session_start();
include('db.php');

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

if (isset($_GET['username'])) {
    $username = mysqli_real_escape_string($conn, $_GET['username']);

    // Obtener los datos del usuario
    $sql = "SELECT username, nombre, email FROM usuarios WHERE username = '$username'";
    $result = mysqli_query($conn, $sql);
    $user = mysqli_fetch_assoc($result);

    if (!$user) {
        echo "Usuario no encontrado.";
        exit();
    }
} else {
    echo "No se ha especificado el usuario.";
    exit();
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $new_username = mysqli_real_escape_string($conn, $_POST['username']);
    $nombre = mysqli_real_escape_string($conn, $_POST['nombre']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);

    // Actualizar el usuario
    $sql = "UPDATE usuarios SET username = '$new_username', nombre = '$nombre', email = '$email' WHERE username = '$username'";
    if (mysqli_query($conn, $sql)) {
        header("Location: view_users.php");
    } else {
        echo "Error al actualizar el usuario: " . mysqli_error($conn);
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Usuario</title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
    <div class="container mt-5">
        <h2>Editar Usuario</h2>
        <form action="edit_user.php?username=<?php echo $username; ?>" method="POST" class="mx-auto mt-4 p-4 bg-white shadow rounded" style="max-width: 500px;">
            <div class="form-group">
                <label for="username">Nombre de Usuario</label>
                <input type="text" class="form-control" name="username" value="<?php echo htmlspecialchars($user['username']); ?>" required>
            </div>
            <div class="form-group">
                <label for="nombre">Nombre Completo</label>
                <input type="text" class="form-control" name="nombre" value="<?php echo htmlspecialchars($user['nombre']); ?>" required>
            </div>
            <div class="form-group">
                <label for="email">Correo Electrónico</label>
                <input type="email" class="form-control" name="email" value="<?php echo htmlspecialchars($user['email']); ?>" required>
            </div>
            <button type="submit" class="btn btn-success">Actualizar Usuario</button>
            <a href="view_users.php" class="btn btn-secondary">Cancelar</a>
        </form>
    </div>
</body>
</html>
