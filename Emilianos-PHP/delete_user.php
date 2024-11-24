<?php
session_start();
include('db.php');

if (!isset($_SESSION['username'])) {
    header("Location: login.php");
    exit();
}

if (isset($_GET['username'])) {
    $username = mysqli_real_escape_string($conn, $_GET['username']);

    // Eliminar el usuario
    $sql = "DELETE FROM usuarios WHERE username = '$username'";
    if (mysqli_query($conn, $sql)) {
        header("Location: view_users.php");
    } else {
        echo "Error al eliminar el usuario: " . mysqli_error($conn);
    }
} else {
    echo "No se ha especificado el usuario.";
}
?>
