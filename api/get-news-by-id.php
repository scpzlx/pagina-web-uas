<?php
require_once 'config.php';

$conn = getConnection();

try {
    if (!isset($_GET['id']) || empty($_GET['id'])) {
        throw new Exception('ID de noticia no proporcionado');
    }
    
    $newsId = intval($_GET['id']);
    
    if ($newsId <= 0) {
        throw new Exception('ID de noticia inválido');
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
            FROM noticias 
            WHERE id = ? AND status = 'published'";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $newsId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        throw new Exception('Noticia no encontrada');
    }
    
    $news = $result->fetch_assoc();
    $stmt->close();
    
    $contentSql = "SELECT paragraph_text 
                   FROM noticia_content 
                   WHERE noticia_id = ? 
                   ORDER BY paragraph_order ASC";
    $contentStmt = $conn->prepare($contentSql);
    $contentStmt->bind_param("i", $newsId);
    $contentStmt->execute();
    $contentResult = $contentStmt->get_result();
    
    $content = [];
    while ($row = $contentResult->fetch_assoc()) {
        $content[] = $row['paragraph_text'];
    }
    $news['content'] = $content;
    $contentStmt->close();
    
    $gallerySql = "SELECT image_url 
                   FROM noticia_gallery 
                   WHERE noticia_id = ? 
                   ORDER BY image_order ASC";
    $galleryStmt = $conn->prepare($gallerySql);
    $galleryStmt->bind_param("i", $newsId);
    $galleryStmt->execute();
    $galleryResult = $galleryStmt->get_result();
    
    $gallery = [];
    while ($row = $galleryResult->fetch_assoc()) {
        $gallery[] = $row['image_url'];
    }
    $news['gallery'] = $gallery;
    $galleryStmt->close();
    
    echo json_encode([
        'success' => true,
        'data' => $news
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