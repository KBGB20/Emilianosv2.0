<?php
session_start();
include('db.php');
include('auth_functions.php');

checkAuth();

// Obtener información del usuario de la sesión
$username = $_SESSION['username'];
$rol_nombre = $_SESSION['rol_nombre'];
$permisos = $_SESSION['permisos'];

// Definir los elementos del menú según los permisos
$menu_items = [];

// Elementos del menú basados en permisos
if (in_array('usuarios', $permisos)) {
    $menu_items[] = [
        'href' => 'register_user.php',
        'icon' => 'fas fa-user-plus',
        'tooltip' => 'Agregar Usuario'
    ];
    $menu_items[] = [
        'href' => 'view_users.php',
        'icon' => 'fas fa-users',
        'tooltip' => 'Lista de Usuarios'
    ];
}

if (in_array('venta_materia_prima', $permisos)) {
    $menu_items[] = [
        'href' => 'ventas.php',
        'icon' => 'fas fa-cash-register',
        'tooltip' => 'Ventas'
    ];
}

if (in_array('compra_materia_prima', $permisos)) {
    $menu_items[] = [
        'href' => 'compras.php',
        'icon' => 'fas fa-shopping-cart',
        'tooltip' => 'Compras'
    ];
}

if (in_array('orden_producto', $permisos)) {
    $menu_items[] = [
        'href' => 'ordenes.php',
        'icon' => 'fas fa-utensils',
        'tooltip' => 'Órdenes'
    ];
}

if (in_array('producto_categoria', $permisos)) {
    $menu_items[] = [
        'href' => 'productos.php',
        'icon' => 'fas fa-box',
        'tooltip' => 'Productos'
    ];
    $menu_items[] = [
        'href' => 'categorias.php',
        'icon' => 'fas fa-tags',
        'tooltip' => 'Categorías'
    ];
}

if (in_array('cliente_orden', $permisos)) {
    $menu_items[] = [
        'href' => 'clientes.php',
        'icon' => 'fas fa-user-friends',
        'tooltip' => 'Clientes'
    ];
}

if (in_array('reportes', $permisos)) {
    $menu_items[] = [
        'href' => 'reportes.php',
        'icon' => 'fas fa-chart-bar',
        'tooltip' => 'Reportes'
    ];
}

if (in_array('configuracion', $permisos)) {
    $menu_items[] = [
        'href' => 'configuracion.php',
        'icon' => 'fas fa-cog',
        'tooltip' => 'Configuración'
    ];
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Panel de Control - <?php echo $rol_nombre; ?></title>
    <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">
    <style>
        /* Mantener los mismos estilos que tenías antes */
        :root {
            --crema-color: #f7f3e9;
            --beige-color: #e8dcc1;
            --marron-claro-color: #b2927d;
            --marron-oscuro-color: #6d4c41;
            --highlight-color: #d4a373;
            --naranja-color: #f57c00;
        }

        .navbar {
            background-color: var(--naranja-color);
            color: white;
            padding: 10px 20px;
            font-size: 18px;
            position: fixed;
            width: 100%;
            z-index: 1000;
            top: 0;
        }

        .navbar h1 {
            margin: 0;
            font-size: 24px;
            color: white;
        }

        .navbar .user-info {
            position: absolute;
            right: 150px;
            top: 50%;
            transform: translateY(-50%);
            color: white;
        }

        .navbar .logout-link {
            color: white;
            text-decoration: none;
            font-weight: bold;
            float: right;
        }

        .sidebar {
            height: 100vh;
            background-color: var(--marron-oscuro-color);
            color: #fff;
            padding-top: 80px;
            position: fixed;
            top: 0;
            left: 0;
            width: 250px;
            overflow-y: auto;
        }

        .sidebar .user-info {
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            margin-bottom: 20px;
        }

        .sidebar .user-info i {
            font-size: 50px;
            color: var(--highlight-color);
        }

        .sidebar .user-info h4 {
            margin-top: 10px;
            font-size: 18px;
            color: var(--highlight-color);
        }

        .sidebar .user-info .role-badge {
            background-color: var(--highlight-color);
            color: var(--marron-oscuro-color);
            padding: 5px 10px;
            border-radius: 15px;
            font-size: 12px;
            margin-top: 5px;
        }

        .sidebar .nav-link {
            color: var(--highlight-color);
            font-weight: bold;
            display: flex;
            align-items: center;
            padding: 15px 20px;
            transition: all 0.3s ease;
        }

        .sidebar .nav-link i {
            font-size: 20px;
            margin-right: 10px;
            width: 30px;
            text-align: center;
        }

        .sidebar .nav-link span {
            font-size: 14px;
        }

        .sidebar .nav-link:hover {
            background-color: var(--marron-claro-color);
            color: var(--crema-color);
        }

        .content {
            margin-left: 250px;
            padding: 80px 20px 20px;
            background-color: var(--crema-color);
            min-height: 100vh;
        }

        .dashboard-cards {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-top: 20px;
        }

        .dashboard-card {
            background-color: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .dashboard-card h3 {
            color: var(--marron-oscuro-color);
            margin-bottom: 15px;
        }
    </style>
</head>
<body>
    <!-- Barra superior -->
    <div class="navbar">
        <h1>Panel de Control</h1>
        <div class="user-info">
            <span>Rol: <?php echo $rol_nombre; ?></span>
        </div>
        <a class="logout-link" href="logout.php">Cerrar Sesión</a>
    </div>

    <!-- Barra lateral de navegación -->
    <div class="sidebar">
        <div class="user-info">
            <i class="fas fa-user-circle"></i>
            <h4><?php echo $username; ?></h4>
            <span class="role-badge"><?php echo $rol_nombre; ?></span>
        </div>
        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link" href="home.php">
                    <i class="fas fa-home"></i>
                    <span>Inicio</span>
                </a>
            </li>
            <?php foreach ($menu_items as $item): ?>
            <li class="nav-item">
                <a class="nav-link" href="<?php echo $item['href']; ?>">
                    <i class="<?php echo $item['icon']; ?>"></i>
                    <span><?php echo $item['tooltip']; ?></span>
                </a>
            </li>
            <?php endforeach; ?>
        </ul>
    </div>

    <!-- Contenido principal -->
    <div class="content">
        <div class="container-fluid">
            <h2>Bienvenido, <?php echo $username; ?></h2>
            <p>Tu rol actual es: <?php echo $rol_nombre; ?></p>
            
            <div class="dashboard-cards">
                <?php if (in_array('venta_materia_prima', $permisos)): ?>
                <div class="dashboard-card">
                    <h3>Ventas del Día</h3>
                    <p>Información de ventas...</p>
                </div>
                <?php endif; ?>

                <?php if (in_array('orden_producto', $permisos)): ?>
                <div class="dashboard-card">
                    <h3>Órdenes Pendientes</h3>
                    <p>Información de órdenes...</p>
                </div>
                <?php endif; ?>

                <?php if (in_array('reportes', $permisos)): ?>
                <div class="dashboard-card">
                    <h3>Resumen del Mes</h3>
                    <p>Información del resumen...</p>
                </div>
                <?php endif; ?>
            </div>
        </div>
    </div>

    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</body>
</html>