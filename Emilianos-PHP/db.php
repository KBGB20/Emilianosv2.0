<?php
$host = 'localhost';
$user = 'root';
$password = 'MySQL';
$database = 'emiliano';

$conn = mysqli_connect(hostname: $host, username: $user, password: $password, database: $database);

if (!$conn) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>
