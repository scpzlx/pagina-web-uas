<?php
session_start();
require_once __DIR__ . '/../config.php';

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

define('MAX_ATTEMPTS_USER', 5);
define('MAX_ATTEMPTS_IP', 10);
define('LOCKOUT_MINUTES', 15);
define('IP_WINDOW_MINUTES', 10);
define('SESSION_TIMEOUT', 7200);
define('MIN_PASSWORD_LENGTH', 8);

function response($success, $message, $data = null)
{
    echo json_encode(['success' => $success, 'message' => $message, 'data' => $data], JSON_UNESCAPED_UNICODE);
    exit();
}

function getClientIP()
{
    $headers = ['HTTP_CF_CONNECTING_IP', 'HTTP_X_FORWARDED_FOR', 'HTTP_X_REAL_IP', 'REMOTE_ADDR'];
    foreach ($headers as $header) {
        if (!empty($_SERVER[$header])) {
            $ip = trim(explode(',', $_SERVER[$header])[0]);
            if (filter_var($ip, FILTER_VALIDATE_IP))
                return $ip;
        }
    }
    return '0.0.0.0';
}

function logAction($conn, $action, $details, $userName = null, $userId = null)
{
    $stmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?,
NOW())");
    $stmt->bind_param("sssi", $action, $details, $userName, $userId);
    $stmt->execute();
    $stmt->close();
}

function checkIPRateLimit($conn, $ip)
{
    $stmt = $conn->prepare("DELETE FROM login_attempts WHERE attempted_at < DATE_SUB(NOW(), INTERVAL ? MINUTE)");
    $minutes = IP_WINDOW_MINUTES;
    $stmt->bind_param("i", $minutes);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("SELECT COUNT(*) as total FROM login_attempts WHERE ip = ? AND attempted_at > DATE_SUB(NOW(),
    INTERVAL ? MINUTE)");
    $stmt->bind_param("si", $ip, $minutes);
    $stmt->execute();
    $total = 0;
    $stmt->bind_result($total);
    $stmt->fetch();
    $stmt->close();
    return $total >= MAX_ATTEMPTS_IP;
}

function registerIPAttempt($conn, $ip)
{
    $stmt = $conn->prepare("INSERT INTO login_attempts (ip, attempted_at) VALUES (?, NOW())");
    $stmt->bind_param("s", $ip);
    $stmt->execute();
    $stmt->close();
}

function isAccountLocked($user)
{
    if ($user['locked_until'] === null)
        return false;
    return strtotime($user['locked_until']) > time();
}

function registerFailedAttempt($conn, $userId, $ip)
{
    $stmt = $conn->prepare("UPDATE usuarios SET failed_attempts = failed_attempts + 1, last_ip = ? WHERE id = ?");
    $stmt->bind_param("si", $ip, $userId);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("SELECT failed_attempts FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $attempts = 0;
    $stmt->bind_result($attempts);
    $stmt->fetch();
    $stmt->close();

    if ($attempts >= MAX_ATTEMPTS_USER) {
        $stmt = $conn->prepare("UPDATE usuarios SET locked_until = DATE_ADD(NOW(), INTERVAL ? MINUTE) WHERE id = ?");
        $minutes = LOCKOUT_MINUTES;
        $stmt->bind_param("ii", $minutes, $userId);
        $stmt->execute();
        $stmt->close();
        return true;
    }
    return false;
}

function resetFailedAttempts($conn, $userId, $ip)
{
    $stmt = $conn->prepare("UPDATE usuarios SET failed_attempts = 0, locked_until = NULL, last_login = NOW(), last_ip =
    ? WHERE id = ?");
    $stmt->bind_param("si", $ip, $userId);
    $stmt->execute();
    $stmt->close();
}

function requireAuth()
{
    if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        echo json_encode(['success' => false, 'message' => 'No autorizado'], JSON_UNESCAPED_UNICODE);
        exit();
    }
    if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        echo json_encode(['success' => false, 'message' => 'Sesión expirada', 'expired' => true], JSON_UNESCAPED_UNICODE);
        exit();
    }
    $_SESSION['last_activity'] = time();
}

function requireSuperAdmin()
{
    requireAuth();
    if (($_SESSION['rol'] ?? '') !== 'superadmin') {
        echo json_encode(
            ['success' => false, 'message' => 'Acceso denegado. Se requiere rol de superadministrador'],
            JSON_UNESCAPED_UNICODE
        );
        exit();
    }
}

function verifyPassword($conn, $password, $storedHash, $userId)
{
    if (password_verify($password, $storedHash)) {
        if (password_needs_rehash($storedHash, PASSWORD_BCRYPT)) {
            $newHash = password_hash($password, PASSWORD_BCRYPT);
            $stmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
            $stmt->bind_param("si", $newHash, $userId);
            $stmt->execute();
            $stmt->close();
        }
        return true;
    }
    if (strlen($storedHash) === 64 && hash('sha256', $password) === $storedHash) {
        $newHash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
        $stmt->bind_param("si", $newHash, $userId);
        $stmt->execute();
        $stmt->close();
        return true;
    }
    if ($password === $storedHash) {
        $newHash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
        $stmt->bind_param("si", $newHash, $userId);
        $stmt->execute();
        $stmt->close();
        return true;
    }
    return false;
}

// ═══════════════════════════════════════════════════════
// LOGIN
// ═══════════════════════════════════════════════════════
if ($method === 'POST' && $action === 'login') {
    $ip = getClientIP();
    $usuario = trim($_POST['usuario'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if (empty($usuario) || empty($password))
        response(false, 'Por favor completa todos los campos');

    if (checkIPRateLimit($conn, $ip)) {
        logAction($conn, 'LOGIN_BLOCKED_IP', "IP bloqueada: $ip", $usuario);
        response(false, 'Demasiados intentos. Espera ' . IP_WINDOW_MINUTES . ' minutos');
    }

    registerIPAttempt($conn, $ip);

    // ← CAMBIO: ahora también selecciona `rol`
    $stmt = $conn->prepare("SELECT id, usuario, password, rol, failed_attempts, locked_until FROM usuarios WHERE usuario
    = ?");
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 0) {
        logAction($conn, 'LOGIN_FAILED', "Usuario no encontrado: $usuario desde IP: $ip", $usuario);
        response(false, 'Usuario o contraseña incorrectos');
    }

    $user = $result->fetch_assoc();
    $stmt->close();

    if (isAccountLocked($user)) {
        $remaining = ceil((strtotime($user['locked_until']) - time()) / 60);
        logAction($conn, 'LOGIN_BLOCKED_ACCOUNT', "Cuenta bloqueada: $usuario", $usuario, $user['id']);
        response(false, "Cuenta bloqueada. Intenta de nuevo en $remaining minuto(s)");
    }

    if (!verifyPassword($conn, $password, $user['password'], $user['id'])) {
        $blocked = registerFailedAttempt($conn, $user['id'], $ip);
        $remaining = MAX_ATTEMPTS_USER - ($user['failed_attempts'] + 1);
        logAction($conn, 'LOGIN_FAILED', "Contraseña incorrecta para: $usuario desde IP: $ip", $usuario, $user['id']);
        if ($blocked)
            response(false, 'Cuenta bloqueada por ' . LOCKOUT_MINUTES . ' minutos');
        response(false, "Usuario o contraseña incorrectos. Intentos restantes: $remaining");
    }

    resetFailedAttempts($conn, $user['id'], $ip);
    session_regenerate_id(true);

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['usuario'] = $user['usuario'];
    $_SESSION['rol'] = $user['rol']; // ← NUEVO
    $_SESSION['logged_in'] = true;
    $_SESSION['login_time'] = time();
    $_SESSION['last_activity'] = time();
    $_SESSION['ip'] = $ip;

    logAction($conn, 'LOGIN_SUCCESS', "Login exitoso desde IP: $ip", $user['usuario'], $user['id']);
    response(true, 'Inicio de sesión exitoso', [
        'usuario' => $user['usuario'],
        'rol' => $user['rol'], // ← NUEVO: devuelve rol al frontend
    ]);
}

// ═══════════════════════════════════════════════════════
// CHECK SESSION
// ═══════════════════════════════════════════════════════
if ($method === 'GET' && $action === 'check_session') {
    if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true)
        response(false, 'No hay sesión activa', ['logged_in' => false]);

    if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > SESSION_TIMEOUT) {
        session_unset();
        session_destroy();
        response(false, 'Sesión expirada', ['logged_in' => false, 'expired' => true]);
    }

    if (isset($_SESSION['ip']) && $_SESSION['ip'] !== getClientIP()) {
        session_unset();
        session_destroy();
        logAction($conn, 'SESSION_HIJACK_ATTEMPT', 'IP de sesión no coincide');
        response(false, 'Sesión inválida', ['logged_in' => false]);
    }

    $_SESSION['last_activity'] = time();
    response(true, 'Sesión activa', [
        'logged_in' => true,
        'usuario' => $_SESSION['usuario'] ?? null,
        'rol' => $_SESSION['rol'] ?? 'admin', // ← NUEVO
    ]);
}

// ═══════════════════════════════════════════════════════
// LOGOUT
// ═══════════════════════════════════════════════════════
if ($method === 'POST' && $action === 'logout') {
    $usuario = $_SESSION['usuario'] ?? 'desconocido';
    $userId = $_SESSION['user_id'] ?? null;
    logAction($conn, 'LOGOUT', "Cierre de sesión: $usuario", $usuario, $userId);
    $_SESSION = [];
    if (isset($_COOKIE[session_name()]))
        setcookie(session_name(), '', time() - 42000, '/');
    session_destroy();
    response(true, 'Sesión cerrada correctamente');
}

// ═══════════════════════════════════════════════════════
// CAMBIAR CONTRASEÑA
// ═══════════════════════════════════════════════════════
if ($method === 'POST' && $action === 'change_password') {
    requireAuth();
    $current = trim($_POST['current_password'] ?? '');
    $new = trim($_POST['new_password'] ?? '');
    $confirm = trim($_POST['confirm_password'] ?? '');

    if (empty($current) || empty($new) || empty($confirm))
        response(false, 'Completa todos los campos');
    if ($new !== $confirm)
        response(false, 'Las contraseñas nuevas no coinciden');
    if (strlen($new) < MIN_PASSWORD_LENGTH)
        response(false, 'Mínimo ' . MIN_PASSWORD_LENGTH . ' caracteres');
    if
    (!preg_match('/[A-Za-z]/', $new) || !preg_match('/[0-9]/', $new))
        response(false, 'La contraseña debe contener letras y números');
    $stmt = $conn->prepare("SELECT password FROM
        usuarios WHERE id = ?");
    $stmt->bind_param("i", $_SESSION['user_id']);
    $stmt->execute();
    $stmt->bind_result($currentHash);
    $stmt->fetch();
    $stmt->close();

    if (!verifyPassword($conn, $current, $currentHash, $_SESSION['user_id']))
        response(false, 'La contraseña actual es incorrecta');
    if (password_verify($new, $currentHash))
        response(false, 'La nueva contraseña debe ser diferente a la actual');

    $newHash = password_hash($new, PASSWORD_BCRYPT);
    $stmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $newHash, $_SESSION['user_id']);
    if ($stmt->execute()) {
        logAction($conn, 'PASSWORD_CHANGED', 'Contraseña actualizada', $_SESSION['usuario'], $_SESSION['user_id']);
        response(true, 'Contraseña actualizada correctamente');
    }
    response(false, 'Error al actualizar la contraseña');
}

response(false, 'Acción no válida');
?>