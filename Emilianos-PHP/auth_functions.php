<?php
// auth_functions.php

function checkAuth() {
    if (!isset($_SESSION['user_id'])) {
        header("Location: login.php");
        exit();
    }
}

function checkPermiso($permiso) {
    if (!isset($_SESSION['permisos']) || !in_array($permiso, $_SESSION['permisos'])) {
        header("Location: acceso_denegado.php");
        exit();
    }
}

// Ejemplo de uso en cualquier página protegida:
/*
require_once 'auth_functions.php';
session_start();
checkAuth(); // Verifica si el usuario está autenticado
checkPermiso('venta_materia_prima'); // Verifica si tiene el permiso específico
*/