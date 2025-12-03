<?php
require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['id'])) {
        throw new Exception('ID de noticia no proporcionado');
    }
    
    $newsId = intval($data['id']);
    
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
    
    $conn->begin_transaction();
    
    $sql = "UPDATE noticias SET 
                title = ?,
                short_description = ?,
                date = ?,
                category = ?,
                category_label = ?,
                thumbnail_image = ?,
                hero_image = ?,
                video_url = ?
            WHERE id = ?";
    
    $stmt = $conn->prepare($sql);
    $thumbnailImage = $data['thumbnailImage'] ?? null;
    $heroImage = $data['heroImage'] ?? null;
    $videoUrl = $data['videoUrl'] ?? null;
    
    $stmt->bind_param("ssssssssi",
        $data['title'],
        $data['shortDescription'],
        $data['date'],
        $data['category'],
        $data['categoryLabel'],
        $thumbnailImage,
        $heroImage,
        $videoUrl,
        $newsId
    );
    
    if (!$stmt->execute()) {
        throw new Exception('Error al actualizar la noticia: ' . $stmt->error);
    }
    $stmt->close();
    
    $deleteSql = "DELETE FROM noticia_content WHERE noticia_id = ?";
    $deleteStmt = $conn->prepare($deleteSql);
    $deleteStmt->bind_param("i", $newsId);
    $deleteStmt->execute();
    $deleteStmt->close();
    
    if (!empty($data['content']) && is_array($data['content'])) {
        $contentSql = "INSERT INTO noticia_content (noticia_id, paragraph_order, paragraph_text) 
                       VALUES (?, ?, ?)";
        $contentStmt = $conn->prepare($contentSql);
        
        foreach ($data['content'] as $index => $paragraph) {
            if (!empty(trim($paragraph))) {
                $order = $index + 1;
                $contentStmt->bind_param("iis", $newsId, $order, $paragraph);
                $contentStmt->execute();
            }
        }
        $contentStmt->close();
    }
    
    $deleteGallerySql = "DELETE FROM noticia_gallery WHERE noticia_id = ?";
    $deleteGalleryStmt = $conn->prepare($deleteGallerySql);
    $deleteGalleryStmt->bind_param("i", $newsId);
    $deleteGalleryStmt->execute();
    $deleteGalleryStmt->close();
    
    if (!empty($data['gallery']) && is_array($data['gallery'])) {
        $gallerySql = "INSERT INTO noticia_gallery (noticia_id, image_url, image_order) 
                       VALUES (?, ?, ?)";
        $galleryStmt = $conn->prepare($gallerySql);
        
        foreach ($data['gallery'] as $index => $imageUrl) {
            if (!empty(trim($imageUrl))) {
                $order = $index + 1;
                $galleryStmt->bind_param("isi", $newsId, $imageUrl, $order);
                $galleryStmt->execute();
            }
        }
        $galleryStmt->close();
    }
    
    $conn->commit();
    
    echo json_encode([
        'success' => true,
        'message' => 'Noticia actualizada exitosamente'
    ]);
    
} catch (Exception $e) {
    $conn->rollback();
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

closeConnection($conn);
?>