<?php
// middleware.php — incluir al inicio de cada endpoint protegido
// Uso: require_once __DIR__ . '/../middleware.php';

if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// ─── Verificar sesión activa ──────────────────────────────────────────────────
if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(
        ['success' => false, 'message' => 'No autorizado. Inicia sesión para continuar.'],
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

// ─── Verificar expiración por inactividad (2 horas) ──────────────────────────
if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > 7200) {
    session_unset();
    session_destroy();
    http_response_code(401);
    echo json_encode(
        ['success' => false, 'message' => 'Sesión expirada por inactividad.', 'expired' => true],
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

// ─── Verificar que la IP no cambió (protección básica contra session hijacking)
$clientIP = '';
$headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
foreach ($headers as $h) {
    if (!empty($_SERVER[$h])) {
        $ip = trim(explode(',', $_SERVER[$h])[0]);
        if (filter_var($ip, FILTER_VALIDATE_IP)) {
            $clientIP = $ip;
            break;
        }
    }
}

if (isset($_SESSION['ip']) && $_SESSION['ip'] !== $clientIP) {
    session_unset();
    session_destroy();
    http_response_code(401);
    echo json_encode(
        ['success' => false, 'message' => 'Sesión inválida.', 'expired' => true],
        JSON_UNESCAPED_UNICODE
    );
    exit();
}

// Actualizar last_activity en cada request autenticado
$_SESSION['last_activity'] = time();
?>