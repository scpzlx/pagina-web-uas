<?php
session_start();
require_once __DIR__ . '/../config.php';

// Solo superadmin
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

    $id = intval($data['id'] ?? 0);
    $usuario = trim($data['usuario'] ?? '');
    $password = trim($data['password'] ?? '');
    $rol = trim($data['rol'] ?? 'admin');

    if ($id <= 0)
        throw new Exception('ID de usuario inválido');
    if (empty($usuario))
        throw new Exception('El nombre de usuario es requerido');
    if (strlen($usuario) < 3)
        throw new Exception('El usuario debe tener al menos 3 caracteres');
    if (!preg_match('/^[a-zA-Z0-9_]+$/', $usuario))
        throw new Exception('El usuario solo puede contener letras, números y guiones bajos');

    // Verificar que existe y obtener su rol — usando store_result + bind_result
    $check = $conn->prepare("SELECT id, usuario, rol FROM usuarios WHERE id = ?");
    $check->bind_param("i", $id);
    $check->execute();
    $check->store_result();

    if ($check->num_rows === 0) {
        $check->close();
        throw new Exception('Usuario no encontrado');
    }

    $target_id = null;
    $target_usuario = null;
    $target_rol = null;
    $check->bind_result($target_id, $target_usuario, $target_rol);
    $check->fetch();
    $check->close();

    if ($target_rol === 'superadmin')
        throw new Exception('No se puede modificar la cuenta superadmin');
    if ($rol === 'superadmin')
        throw new Exception('No se puede asignar el rol superadmin');
    if (!in_array($rol, ['admin']))
        throw new Exception('Rol inválido');

    // Verificar nombre único excluyendo al propio usuario
    $checkName = $conn->prepare("SELECT id FROM usuarios WHERE usuario = ? AND id != ?");
    $checkName->bind_param("si", $usuario, $id);
    $checkName->execute();
    $checkName->store_result();
    $nameExists = $checkName->num_rows > 0;
    $checkName->close();

    if ($nameExists)
        throw new Exception('El nombre de usuario ya está en uso');

    // Actualizar con o sin contraseña
    if (!empty($password)) {
        if (strlen($password) < 8)
            throw new Exception('La contraseña debe tener al menos 8 caracteres');
        if (!preg_match('/[A-Za-z]/', $password) || !preg_match('/[0-9]/', $password))
            throw new Exception('La contraseña debe contener letras y números');

        $hash = password_hash($password, PASSWORD_BCRYPT);
        $stmt = $conn->prepare("UPDATE usuarios SET usuario = ?, password = ?, rol = ?, failed_attempts = 0, locked_until = NULL WHERE id = ?");
        $stmt->bind_param("sssi", $usuario, $hash, $rol, $id);
    } else {
        $stmt = $conn->prepare("UPDATE usuarios SET usuario = ?, rol = ? WHERE id = ?");
        $stmt->bind_param("ssi", $usuario, $rol, $id);
    }

    if (!$stmt->execute())
        throw new Exception('Error al actualizar el usuario');
    $stmt->close();

    // Log
    $action = 'USER_UPDATED';
    $details = "Usuario actualizado: ID $id - $usuario por {$_SESSION['usuario']}";
    $userName = $_SESSION['usuario'] ?? null;
    $userId = $_SESSION['user_id'] ?? null;
    $logStmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("sssi", $action, $details, $userName, $userId);
    $logStmt->execute();
    $logStmt->close();

    echo json_encode(['success' => true, 'message' => 'Usuario actualizado correctamente'], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>