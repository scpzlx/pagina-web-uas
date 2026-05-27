<?php
require_once __DIR__ . '/../config.php';

$conn = getConnection();

try {
    if (empty($_GET['id']))
        throw new Exception('ID de noticia no proporcionado');
    $id = intval($_GET['id']);
    if ($id <= 0)
        throw new Exception('ID de noticia inválido');

    $stmt = $conn->prepare("SELECT id, title, short_description as shortDescription, date, category, category_label as categoryLabel, thumbnail_image as thumbnailImage, hero_image as heroImage, video_url as videoUrl, status FROM noticias WHERE id = ? AND status = 'published'");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0)
        throw new Exception('Noticia no encontrada');
    $news = $result->fetch_assoc();
    $stmt->close();

    // Contenido
    $contentStmt = $conn->prepare("SELECT paragraph_text FROM noticia_content WHERE noticia_id = ? ORDER BY paragraph_order ASC");
    $contentStmt->bind_param("i", $id);
    $contentStmt->execute();
    $contentStmt->store_result();
    $contentStmt->bind_result($paragraph_text);
    $content = [];
    while ($contentStmt->fetch())
        $content[] = $paragraph_text;
    $news['content'] = $content;
    $contentStmt->close();

    // Galería
    $galleryStmt = $conn->prepare("SELECT image_url FROM noticia_gallery WHERE noticia_id = ? ORDER BY image_order ASC");
    $galleryStmt->bind_param("i", $id);
    $galleryStmt->execute();
    $galleryStmt->store_result();
    $galleryStmt->bind_result($image_url);
    $gallery = [];
    while ($galleryStmt->fetch())
        $gallery[] = $image_url;
    $news['gallery'] = $gallery;
    $galleryStmt->close();

    echo json_encode(['success' => true, 'data' => $news]);

} catch (Exception $e) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => $e->getMessage()]);
}

closeConnection($conn);
?>