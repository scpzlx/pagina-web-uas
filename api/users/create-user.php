<?php
session_start();
require_once __DIR__ . '/../config.php';

// Solo superadmin puede crear usuarios
if (empty($_SESSION['logged_in']) || ($_SESSION['rol'] ?? '') !== 'superadmin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Acceso denegado'], JSON_UNESCAPED_UNICODE);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit();
}

$conn = getConnection();

try {
    $data = json_decode(file_get_contents('php://input'), true);

    $usuario = trim($data['usuario'] ?? '');
    $password = trim($data['password'] ?? '');
    $rol = trim($data['rol'] ?? 'admin');

    // Validaciones
    if (empty($usuario))
        throw new Exception('El nombre de usuario es requerido');
    if (strlen($usuario) < 3)
        throw new Exception('El usuario debe tener al menos 3 caracteres');
    if (!preg_match('/^[a-zA-Z0-9_]+$/', $usuario))
        throw new Exception('El usuario solo puede contener letras, números y guiones bajos');
    if (empty($password))
        throw new Exception('La contraseña es requerida');
    if (strlen($password) < 8)
        throw new Exception('La contraseña debe tener al menos 8 caracteres');
    if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/[0-9]/', $password))
        throw new Exception('La contraseña debe contener letras y números');

    // Solo puede crear admins, no otros superadmins
    if ($rol === 'superadmin')
        throw new Exception('No se puede crear otra cuenta superadmin');
    if (!in_array($rol, ['admin']))
        throw new Exception('Rol inválido');

    // Verificar que el usuario no exista
    $check = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ?");
    $check->bind_param("s", $usuario);
    $check->execute();
    $check->store_result();
    if ($check->num_rows > 0)
        throw new Exception('El nombre de usuario ya está en uso');
    $check->close();

    $hash = password_hash($password, PASSWORD_BCRYPT);

    $stmt = $conn->prepare("INSERT INTO usuarios (usuario, password, rol) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $usuario, $hash, $rol);
    if (!$stmt->execute())
        throw new Exception('Error al crear el usuario');
    $newId = $conn->insert_id;
    $stmt->close();

    // Log
    $action = 'USER_CREATED';
    $details = "Usuario creado: $usuario (rol: $rol) por {$_SESSION['usuario']}";
    $userName = $_SESSION['usuario'] ?? null;
    $userId = $_SESSION['user_id'] ?? null;
    $logStmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("sssi", $action, $details, $userName, $userId);
    $logStmt->execute();
    $logStmt->close();

    echo json_encode([
        'success' => true,
        'message' => 'Usuario creado correctamente',
        'id' => $newId,
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>