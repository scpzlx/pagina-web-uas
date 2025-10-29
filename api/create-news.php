<?php
require_once 'config.php';

$conn = getConnection();

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (empty($data['title'])) {
        throw new Exception('El título es requerido');
    }
    if (empty($data['shortDescription'])) {
        throw new Exception('La descripción corta es requerida');
    }
    if (empty($data['date'])) {
        throw new Exception('La fecha es requerida');
    }
    if (empty($data['category'])) {
        throw new Exception('La categoría es requerida');
    }
    if (empty($data['categoryLabel'])) {
        throw new Exception('La etiqueta de categoría es requerida');
    }
    
    $conn->begin_transaction();
    
    $sql = "INSERT INTO noticias (
                title, short_description, date, category, category_label,
                thumbnail_image, hero_image, video_url, status
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'published')";
    
    $stmt = $conn->prepare($sql);
    $thumbnailImage = $data['thumbnailImage'] ?? null;
    $heroImage = $data['heroImage'] ?? null;
    $videoUrl = $data['videoUrl'] ?? null;
    
    $stmt->bind_param("ssssssss",
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
        throw new Exception('Error al crear la noticia: ' . $stmt->error);
    }
    
    $noticiaId = $conn->insert_id;
    $stmt->close();
    
    if (!empty($data['content']) && is_array($data['content'])) {
        $contentSql = "INSERT INTO noticia_content (noticia_id, paragraph_order, paragraph_text) 
                       VALUES (?, ?, ?)";
        $contentStmt = $conn->prepare($contentSql);
        
        foreach ($data['content'] as $index => $paragraph) {
            if (!empty(trim($paragraph))) {
                $order = $index + 1;
                $contentStmt->bind_param("iis", $noticiaId, $order, $paragraph);
                $contentStmt->execute();
            }
        }
        $contentStmt->close();
    }
    
    if (!empty($data['gallery']) && is_array($data['gallery'])) {
        $gallerySql = "INSERT INTO noticia_gallery (noticia_id, image_url, image_order) 
                       VALUES (?, ?, ?)";
        $galleryStmt = $conn->prepare($gallerySql);
        
        foreach ($data['gallery'] as $index => $imageUrl) {
            if (!empty(trim($imageUrl))) {
                $order = $index + 1;
                $galleryStmt->bind_param("isi", $noticiaId, $imageUrl, $order);
                $galleryStmt->execute();
            }
        }
        $galleryStmt->close();
    }
    
    $conn->commit();
    
    echo json_encode([
        'success' => true,
        'message' => 'Noticia creada exitosamente',
        'id' => $noticiaId
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