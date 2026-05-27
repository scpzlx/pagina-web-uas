<?php
require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('ID de evento no proporcionado');
    }
    
    $eventsId = intval($_GET['id']);
    
    if ($eventsId <= 0) {
        throw new Exception('ID de evento inválido');
    }
    
    $checkSql = "SELECT id FROM eventos WHERE id = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("i", $eventsId);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();
    
    if ($checkResult->num_rows === 0) {
        throw new Exception('Evento no encontrado');
    }
    $checkStmt->close();
    
    $sql = "DELETE FROM eventos WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $eventsId);
    
    if (!$stmt->execute()) {
        throw new Exception('Error al eliminar el evento: ' . $stmt->error);
    }
    
    $stmt->close();
    
    echo json_encode([
        'success' => true,
        'message' => 'Evento eliminado exitosamente'
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