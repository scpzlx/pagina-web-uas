<?php
require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    $sql = "SELECT 
                id, title, short_description as shortDescription, date, category,
                category_label as categoryLabel, thumbnail_image as thumbnailImage,
                hero_image as heroImage, video_url as videoUrl, status
            FROM eventos 
            WHERE status = 'published'
            ORDER BY date DESC, id DESC";

    $result = $conn->query($sql);

    if ($result === false) {
        throw new Exception('Error en la consulta: ' . $conn->error);
    }

    $events = [];

    while ($row = $result->fetch_assoc()) {
        // Contenido
        $contentStmt = $conn->prepare("SELECT paragraph_text FROM evento_content WHERE evento_id = ? ORDER BY paragraph_order ASC");
        $contentStmt->bind_param("i", $row['id']);
        $contentStmt->execute();
        $contentStmt->store_result();
        $contentStmt->bind_result($paragraph_text);
        $content = [];
        while ($contentStmt->fetch()) {
            $content[] = $paragraph_text;
        }
        $row['content'] = $content;
        $contentStmt->close();

        // Galería
        $galleryStmt = $conn->prepare("SELECT image_url FROM evento_gallery WHERE evento_id = ? ORDER BY image_order ASC");
        $galleryStmt->bind_param("i", $row['id']);
        $galleryStmt->execute();
        $galleryStmt->store_result();
        $galleryStmt->bind_result($image_url);
        $gallery = [];
        while ($galleryStmt->fetch()) {
            $gallery[] = $image_url;
        }
        $row['gallery'] = $gallery;
        $galleryStmt->close();

        $events[] = $row;
    }

    echo json_encode(['success' => true, 'data' => $events, 'count' => count($events)], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

closeConnection($conn);
?>