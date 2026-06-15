<?php
session_start();
require_once __DIR__ . '/../config.php';

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

    if ($id <= 0)
        throw new Exception('ID de usuario inválido');

    // No puede eliminarse a sí mismo
    if ($id === intval($_SESSION['user_id'] ?? 0))
        throw new Exception('No puedes eliminar tu propia cuenta');

    // Obtener usuario para validar y loggear
    $check = $conn->prepare("SELECT id, usuario, rol FROM usuarios WHERE id = ?");
    $check->bind_param("i", $id);
    $check->execute();
    $check->store_result();

    if ($check->num_rows === 0)
        throw new Exception('Usuario no encontrado');

    $check->bind_result($uid, $usuarioNombre, $rol);
    $check->fetch();
    $check->close();

    // No se puede eliminar al superadmin
    if ($rol === 'superadmin')
        throw new Exception('No se puede eliminar la cuenta superadmin');

    $stmt = $conn->prepare("DELETE FROM usuarios WHERE id = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute())
        throw new Exception('Error al eliminar el usuario');
    $stmt->close();

    // Log
    $action = 'USER_DELETED';
    $details = "Usuario eliminado: ID $id - $usuarioNombre por {$_SESSION['usuario']}";
    $userName = $_SESSION['usuario'] ?? null;
    $userId = $_SESSION['user_id'] ?? null;
    $logStmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("sssi", $action, $details, $userName, $userId);
    $logStmt->execute();
    $logStmt->close();

    echo json_encode(['success' => true, 'message' => 'Usuario eliminado correctamente'], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>