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
    
    $sql = "SELECT 
                id, 
                title, 
                short_description as shortDescription,
                date,
                category,
                category_label as categoryLabel,
                thumbnail_image as thumbnailImage,
                hero_image as heroImage,
                video_url as videoUrl,
                status
            FROM eventos 
            WHERE id = ? AND status = 'published'";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $eventsId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Evento no encontrado');
    }
    
    $events = $result->fetch_assoc();
    $stmt->close();
    
    $contentSql = "SELECT paragraph_text 
                   FROM evento_content 
                   WHERE evento_id = ? 
                   ORDER BY paragraph_order ASC";
    $contentStmt = $conn->prepare($contentSql);
    $contentStmt->bind_param("i", $eventsId);
    $contentStmt->execute();
    $contentResult = $contentStmt->get_result();
    
    $content = [];
    while ($row = $contentResult->fetch_assoc()) {
        $content[] = $row['paragraph_text'];
    }
    $events['content'] = $content;
    $contentStmt->close();
    
    $gallerySql = "SELECT image_url 
                   FROM evento_gallery 
                   WHERE evento_id = ? 
                   ORDER BY image_order ASC";
    $galleryStmt = $conn->prepare($gallerySql);
    $galleryStmt->bind_param("i", $eventsId);
    $galleryStmt->execute();
    $galleryResult = $galleryStmt->get_result();
    
    $gallery = [];
    while ($row = $galleryResult->fetch_assoc()) {
        $gallery[] = $row['image_url'];
    }
    $events['gallery'] = $gallery;
    $galleryStmt->close();
    
    echo json_encode([
        'success' => true,
        'data' => $events
    ]);
    
} catch (Exception $e) {
    http_response_code(404);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

closeConnection($conn);
?>