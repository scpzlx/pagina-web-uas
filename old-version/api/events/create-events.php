<?php
header('Content-Type: application/json; charset=utf-8');

require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validaciones
    if (empty($data['title'])) throw new Exception('El título es requerido');
    if (empty($data['shortDescription'])) throw new Exception('La descripción corta es requerida');
    if (empty($data['date'])) throw new Exception('La fecha es requerida');
    if (empty($data['category'])) throw new Exception('La categoría es requerida');
    if (empty($data['categoryLabel'])) throw new Exception('La etiqueta de categoría es requerida');

    $conn->begin_transaction();

    // INSERT EVENTO PRINCIPAL
    $sql = "INSERT INTO eventos (
                title, 
                short_description, 
                date, 
                category, 
                category_label,
                thumbnail_image, 
                hero_image, 
                video_url, 
                status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published')";

    $stmt = $conn->prepare($sql);
    
    if (!$stmt) {
        throw new Exception('Error en prepare: ' . $conn->error);
    }

    $thumbnailImage = $data['thumbnailImage'] ?? null;
    $heroImage = $data['heroImage'] ?? null;
    $videoUrl = $data['videoUrl'] ?? null;

    $stmt->bind_param(
        "ssssssss",
        $data['title'],
        $data['shortDescription'],
        $data['date'],
        $data['category'],
        $data['categoryLabel'],
        $thumbnailImage,
        $heroImage,
        $videoUrl
    );

    if (!$stmt->execute()) {
        throw new Exception('Error al ejecutar INSERT: ' . $stmt->error);
    }

    $eventoId = $conn->insert_id;
    $stmt->close();

    // INSERT CONTENIDO
    if (!empty($data['content']) && is_array($data['content'])) {
        $contentSql = "INSERT INTO evento_content (evento_id, paragraph_order, paragraph_text) 
                       VALUES (?, ?, ?)";

        $contentStmt = $conn->prepare($contentSql);
        
        if (!$contentStmt) {
            throw new Exception('Error en prepare content: ' . $conn->error);
        }

        foreach ($data['content'] as $index => $paragraph) {
            if (!empty(trim($paragraph))) {
                $order = $index + 1;
                $contentStmt->bind_param("iis", $eventoId, $order, $paragraph);
                
                if (!$contentStmt->execute()) {
                    throw new Exception('Error al insertar contenido: ' . $contentStmt->error);
                }
            }
        }
        $contentStmt->close();
    }

    // INSERT GALERÍA
    if (!empty($data['gallery']) && is_array($data['gallery'])) {
        $gallerySql = "INSERT INTO evento_gallery (evento_id, image_url, image_order)
                       VALUES (?, ?, ?)";

        $galleryStmt = $conn->prepare($gallerySql);
        
        if (!$galleryStmt) {
            throw new Exception('Error en prepare gallery: ' . $conn->error);
        }

        foreach ($data['gallery'] as $index => $imageUrl) {
            if (!empty(trim($imageUrl))) {
                $order = $index + 1;
                $galleryStmt->bind_param("isi", $eventoId, $imageUrl, $order);
                
                if (!$galleryStmt->execute()) {
                    throw new Exception('Error al insertar galería: ' . $galleryStmt->error);
                }
            }
        }
        $galleryStmt->close();
    }

    $conn->commit();

    echo json_encode([
        'success' => true,
        'message' => 'Evento creado exitosamente',
        'id' => $eventoId
    ], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    if ($conn) {
        $conn->rollback();
    }
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ], JSON_UNESCAPED_UNICODE);
    
} finally {
    if (isset($conn)) {
        closeConnection($conn);
    }
}
?>