<?php
require_once __DIR__ . '/../middleware.php';
require_once __DIR__ . '/../config.php';

$conn = getConnection();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit();
}

try {
    $data = json_decode(file_get_contents('php://input'), true);

    if (empty($data['id']))
        throw new Exception('ID de noticia no proporcionado');
    if (empty($data['title']))
        throw new Exception('El título es requerido');
    if (empty($data['shortDescription']))
        throw new Exception('La descripción corta es requerida');
    if (empty($data['date']))
        throw new Exception('La fecha es requerida');
    if (empty($data['category']))
        throw new Exception('La categoría es requerida');

    $newsId = intval($data['id']);
    if ($newsId <= 0)
        throw new Exception('ID de noticia inválido');

    // Verificar que existe
    $check = $conn->prepare("SELECT id FROM noticias WHERE id = ?");
    $check->bind_param("i", $newsId);
    $check->execute();
    $checkResult = $check->get_result();
    if ($checkResult->num_rows === 0)
        throw new Exception('Noticia no encontrada');
    $check->close();

    // Sanitizar
    $title = htmlspecialchars(strip_tags(trim($data['title'])), ENT_QUOTES, 'UTF-8');
    $shortDescription = htmlspecialchars(strip_tags(trim($data['shortDescription'])), ENT_QUOTES, 'UTF-8');
    $date = $data['date'];
    $category = htmlspecialchars(strip_tags(trim($data['category'])), ENT_QUOTES, 'UTF-8');
    $categoryLabel = htmlspecialchars(strip_tags(trim($data['categoryLabel'] ?? '')), ENT_QUOTES, 'UTF-8');
    $thumbnailImage = !empty($data['thumbnailImage']) ? filter_var(trim($data['thumbnailImage']), FILTER_SANITIZE_URL) : null;
    $heroImage = !empty($data['heroImage']) ? filter_var(trim($data['heroImage']), FILTER_SANITIZE_URL) : null;
    $videoUrl = !empty($data['videoUrl']) ? filter_var(trim($data['videoUrl']), FILTER_SANITIZE_URL) : null;

    if (!preg_match('/^\d{4}-\d{2}-\d{2}$/', $date))
        throw new Exception('Formato de fecha inválido');

    $conn->begin_transaction();

    $stmt = $conn->prepare(
        "UPDATE noticias SET title=?, short_description=?, date=?, category=?, category_label=?,
         thumbnail_image=?, hero_image=?, video_url=? WHERE id=?"
    );
    $stmt->bind_param(
        "ssssssssi",
        $title,
        $shortDescription,
        $date,
        $category,
        $categoryLabel,
        $thumbnailImage,
        $heroImage,
        $videoUrl,
        $newsId
    );
    if (!$stmt->execute())
        throw new Exception('Error al actualizar la noticia');
    $stmt->close();

    // Reemplazar contenido
    $del = $conn->prepare("DELETE FROM noticia_content WHERE noticia_id = ?");
    $del->bind_param("i", $newsId);
    $del->execute();
    $del->close();

    if (!empty($data['content']) && is_array($data['content'])) {
        $contentStmt = $conn->prepare(
            "INSERT INTO noticia_content (noticia_id, paragraph_order, paragraph_text) VALUES (?, ?, ?)"
        );
        foreach ($data['content'] as $index => $paragraph) {
            $p = trim($paragraph);
            if (!empty($p)) {
                $order = $index + 1;
                $contentStmt->bind_param("iis", $newsId, $order, $p);
                $contentStmt->execute();
            }
        }
        $contentStmt->close();
    }

    // Reemplazar galería
    $delG = $conn->prepare("DELETE FROM noticia_gallery WHERE noticia_id = ?");
    $delG->bind_param("i", $newsId);
    $delG->execute();
    $delG->close();

    if (!empty($data['gallery']) && is_array($data['gallery'])) {
        $galleryStmt = $conn->prepare(
            "INSERT INTO noticia_gallery (noticia_id, image_url, image_order) VALUES (?, ?, ?)"
        );
        foreach ($data['gallery'] as $index => $imageUrl) {
            $url = filter_var(trim($imageUrl), FILTER_SANITIZE_URL);
            if (!empty($url)) {
                $order = $index + 1;
                $galleryStmt->bind_param("isi", $newsId, $url, $order);
                $galleryStmt->execute();
            }
        }
        $galleryStmt->close();
    }

    $conn->commit();

    // Log
    $action = 'NOTICIA_UPDATED';
    $details = "Noticia actualizada: ID $newsId - $title";
    $userName = $_SESSION['usuario'] ?? null;
    $userId = $_SESSION['user_id'] ?? null;
    $logStmt = $conn->prepare("INSERT INTO history_log (action, details, user_name, user_id, timestamp) VALUES (?, ?, ?, ?, NOW())");
    $logStmt->bind_param("sssi", $action, $details, $userName, $userId);
    $logStmt->execute();
    $logStmt->close();

    echo json_encode(['success' => true, 'message' => 'Noticia actualizada exitosamente'], JSON_UNESCAPED_UNICODE);

} catch (Exception $e) {
    $conn->rollback();
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}

closeConnection($conn);
?>