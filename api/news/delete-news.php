<?php
require_once __DIR__ . '/../middleware.php';
require_once __DIR__ . '/../config.php';

$conn = getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    $newsId = intval($data['id'] ?? 0);

    if ($newsId <= 0)
        throw new Exception('ID de noticia inválido');

    // Verificar que existe y obtener título para el log
    $check = $conn->prepare("SELECT id, title FROM noticias WHERE id = ?");
    $check->bind_param("i", $newsId);
    $check->execute();
    $result = $check->get_result();
    if ($result->num_rows === 0)
        throw new Exception('Noticia no encontrada');
    $noticia = $result->fetch_assoc();
    $check->close();

    $stmt = $conn->prepare("DELETE FROM noticias WHERE id = ?");
    $stmt->bind_param("i", $newsId);
    if (!$stmt->execute())
        throw new Exception('Error al eliminar la noticia');
    $stmt->close();

    // Log
    $action = 'NOTICIA_DELETED';
    $details = "Noticia eliminada: ID $newsId - {$noticia['title']}";
    $userName = $_SESSION['usuario'] ?? null;
    $userId = $_SESSION['user_id'] ?? null;
    $logStmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("sssi", $action, $details, $userName, $userId);
    $logStmt->execute();
    $logStmt->close();

    echo json_encode(['success' => true, 'message' => 'Noticia eliminada exitosamente'], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>