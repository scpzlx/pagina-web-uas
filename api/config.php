<?php
// ─── Configuración de base de datos ──────────────────────────────────────────
define('DB_HOST', 'localhost');
define('DB_NAME', 'edav');
define('DB_USER', 'edav');
define('DB_PASS', 'zy0vHc9lFKLS4ud3');

// ─── Conexión ─────────────────────────────────────────────────────────────────
function getConnection()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        http_response_code(500);
        echo json_encode(
            ['success' => false, 'message' => 'Error de conexión al servidor'],
            JSON_UNESCAPED_UNICODE
        );
        exit();
    }

    $conn->set_charset("utf8mb4");
    return $conn;
}

function closeConnection($conn)
{
    if ($conn)
        $conn->close();
}

// ─── Headers de seguridad HTTP ────────────────────────────────────────────────
// CORS — solo permite peticiones desde los dominios del proyecto
$allowedOrigins = [
    'https://edav.uas.edu.mx',
    'http://localhost:5173',  // frontend-publico en desarrollo
    'http://localhost:5174',  // frontend-admin en desarrollo
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: https://edav.uas.edu.mx');
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');
header('Access-Control-Allow-Credentials: true');
header('Content-Type: application/json; charset=utf-8');

// Headers de seguridad
header('X-Content-Type-Options: nosniff');           // Evita MIME sniffing
header('X-Frame-Options: DENY');                      // Evita clickjacking
header('X-XSS-Protection: 1; mode=block');           // Protección XSS en navegadores viejos
header('Referrer-Policy: strict-origin-when-cross-origin');
header('Permissions-Policy: geolocation=(), microphone=(), camera=()');

// Preflight OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ─── Configuración de errores ─────────────────────────────────────────────────
ini_set('display_errors', 0);     // Nunca mostrar errores al usuario
error_reporting(E_ALL);
ini_set('log_errors', 1);         // Sí registrar errores en el log del servidor
?>