<?php
session_start();
require_once __DIR__ . '/../config.php';

if (empty($_SESSION['logged_in']) || ($_SESSION['rol'] ?? '') !== 'superadmin') {
    http_response_code(403);
    echo json_encode(['success' => false, 'message' => 'Acceso denegado'], JSON_UNESCAPED_UNICODE);
    exit();
}

$conn = getConnection();

try {
    $stmt = $conn->prepare("SELECT id, usuario, rol, last_login, last_ip, failed_attempts, locked_until FROM usuarios ORDER BY rol ASC, usuario ASC");
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $usuario, $rol, $last_login, $last_ip, $failed_attempts, $locked_until);

    $users = [];
    while ($stmt->fetch()) {
        $users[] = [
            'id' => $id,
            'usuario' => $usuario,
            'rol' => $rol,
            'last_login' => $last_login,
            'last_ip' => $last_ip,
            'failed_attempts' => $failed_attempts,
            'locked_until' => $locked_until,
        ];
    }
    $stmt->close();

    echo json_encode(['success' => true, 'data' => $users, 'count' => count($users)], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>