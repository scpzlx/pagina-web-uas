<?php
require_once 'config.php';

$conn = getConnection();

try {
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
            WHERE status = 'published'
            ORDER BY date DESC, id DESC";
    
    $result = $conn->query($sql);
    
    if ($result === false) {
        throw new Exception('Error en la consulta: ' . $conn->error);
    }
    
    $news = [];
    
    while ($row = $result->fetch_assoc()) {
        $contentSql = "SELECT paragraph_text 
                       FROM noticia_content 
                       WHERE noticia_id = ? 
                       ORDER BY paragraph_order ASC";
        $contentStmt = $conn->prepare($contentSql);
        $contentStmt->bind_param("i", $row['id']);
        $contentStmt->execute();
        $contentResult = $contentStmt->get_result();
        
        $content = [];
        while ($contentRow = $contentResult->fetch_assoc()) {
            $content[] = $contentRow['paragraph_text'];
        }
        $row['content'] = $content;
        $contentStmt->close();
        
        $gallerySql = "SELECT image_url 
                       FROM noticia_gallery 
                       WHERE noticia_id = ? 
                       ORDER BY image_order ASC";
        $galleryStmt = $conn->prepare($gallerySql);
        $galleryStmt->bind_param("i", $row['id']);
        $galleryStmt->execute();
        $galleryResult = $galleryStmt->get_result();
        
        $gallery = [];
        while ($galleryRow = $galleryResult->fetch_assoc()) {
            $gallery[] = $galleryRow['image_url'];
        }
        $row['gallery'] = $gallery;
        $galleryStmt->close();
        
        $news[] = $row;
    }
    
    echo json_encode([
        'success' => true,
        'data' => $news,
        'count' => count($news)
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

closeConnection($conn);
?>