<?php
session_start();
require_once __DIR__ . "/config.php";

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

function response($success, $message, $data = null) {
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data"    => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$conn = getConnection();
$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

/* =====================================================
    1. LOGIN - INICIAR SESIÓN
===================================================== */
if ($method === "POST" && $action === "login") {
    
    $usuario = trim($_POST["usuario"] ?? "");
    $password = trim($_POST["password"] ?? "");
    
    // Validar campos vacíos
    if (empty($usuario) || empty($password)) {
        response(false, "Por favor completa todos los campos");
    }
    
    // Buscar usuario en la base de datos
    $stmt = $conn->prepare("SELECT id, usuario, password FROM usuarios WHERE usuario = ?");
    
    if (!$stmt) {
        response(false, "Error en la base de datos");
    }
    
    $stmt->bind_param("s", $usuario);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        response(false, "Usuario o contraseña incorrectos");
    }
    
    $user = $result->fetch_assoc();
    
    // Verificar contraseña (usando SHA256 como en tu base de datos)
    $passwordHash = hash('sha256', $password);
    
    if ($passwordHash !== $user['password']) {
        response(false, "Usuario o contraseña incorrectos");
    }
    
    // Crear sesión
    $_SESSION['user_id'] = $user['id'];
    $_SESSION['usuario'] = $user['usuario'];
    $_SESSION['logged_in'] = true;
    $_SESSION['login_time'] = time();
    
    response(true, "Inicio de sesión exitoso", [
        "usuario" => $user['usuario']
    ]);
}

/* =====================================================
    2. CHECK SESSION - VERIFICAR SESIÓN ACTIVA
===================================================== */
if ($method === "GET" && $action === "check_session") {
    
    if (isset($_SESSION['logged_in']) && $_SESSION['logged_in'] === true) {
        response(true, "Sesión activa", [
            "logged_in" => true,
            "usuario" => $_SESSION['usuario'] ?? null
        ]);
    }
    
    response(false, "No hay sesión activa", [
        "logged_in" => false
    ]);
}

/* =====================================================
    3. LOGOUT - CERRAR SESIÓN
===================================================== */
if ($method === "POST" && $action === "logout") {
    
    // Destruir todas las variables de sesión
    $_SESSION = array();
    
    // Destruir la cookie de sesión si existe
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-42000, '/');
    }
    
    // Destruir la sesión
    session_destroy();
    
    response(true, "Sesión cerrada correctamente");
}

/* =====================================================
    4. CAMBIAR CONTRASEÑA (opcional)
===================================================== */
if ($method === "POST" && $action === "change_password") {
    
    // Verificar que hay sesión activa
    if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
        response(false, "Debes iniciar sesión primero");
    }
    
    $current_password = trim($_POST["current_password"] ?? "");
    $new_password = trim($_POST["new_password"] ?? "");
    $confirm_password = trim($_POST["confirm_password"] ?? "");
    
    if (empty($current_password) || empty($new_password) || empty($confirm_password)) {
        response(false, "Por favor completa todos los campos");
    }
    
    if ($new_password !== $confirm_password) {
        response(false, "Las contraseñas nuevas no coinciden");
    }
    
    if (strlen($new_password) < 5) {
        response(false, "La contraseña debe tener al menos 5 caracteres");
    }
    
    $user_id = $_SESSION['user_id'];
    
    // Verificar contraseña actual
    $stmt = $conn->prepare("SELECT password FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    $currentPasswordHash = hash('sha256', $current_password);
    
    if ($currentPasswordHash !== $user['password']) {
        response(false, "La contraseña actual es incorrecta");
    }
    
    // Actualizar contraseña
    $newPasswordHash = hash('sha256', $new_password);
    $stmt = $conn->prepare("UPDATE usuarios SET password = ? WHERE id = ?");
    $stmt->bind_param("si", $newPasswordHash, $user_id);
    
    if ($stmt->execute()) {
        response(true, "Contraseña actualizada correctamente");
    } else {
        response(false, "Error al actualizar la contraseña");
    }
}

response(false, "Acción no válida");
?>