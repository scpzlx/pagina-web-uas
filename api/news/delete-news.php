<?php
require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('ID de noticia no proporcionado');
    }
    
    $newsId = intval($_GET['id']);
    
    if ($newsId <= 0) {
        throw new Exception('ID de noticia inválido');
    }
    
    $checkSql = "SELECT id FROM noticias WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("i", $newsId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        throw new Exception('Noticia no encontrada');
    }
    $checkStmt->close();
    
    $sql = "DELETE FROM noticias WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $newsId);
    
    if (!$stmt->execute()) {
        throw new Exception('Error al eliminar la noticia: ' . $stmt->error);
    }
    
    $stmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Noticia eliminada exitosamente'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

closeConnection($conn);
?>