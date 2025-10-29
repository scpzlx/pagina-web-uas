<?php
require_once 'config.php';

try {
    if (!isset($_FILES['file'])) {
        throw new Exception('No se ha enviado ningún archivo');
    }
    
    $file = $_FILES['file'];
    $fileType = isset($_POST['type']) ? $_POST['type'] : 'thumbnails';
    
    $allowedTypes = ['thumbnails', 'heroes', 'gallery', 'videos'];
    if (!in_array($fileType, $allowedTypes)) {
        throw new Exception('Tipo de archivo no válido');
    }
    
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'mp4', 'webm'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($fileExtension, $allowedExtensions)) {
        throw new Exception('Extensión de archivo no permitida');
    }
    
    $maxSize = 50 * 1024 * 1024;
    if ($file['size'] > $maxSize) {
        throw new Exception('El archivo es demasiado grande (máximo 50MB)');
    }
    
    $uploadDir = "../uploads/$fileType/";
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $fileName = uniqid() . '_' . time() . '.' . $fileExtension;
    $filePath = $uploadDir . $fileName;
    
    if (!move_uploaded_file($file['tmp_name'], $filePath)) {
        throw new Exception('Error al subir el archivo');
    }
    
    $fileUrl = "/uploads/$fileType/$fileName";
    
    echo json_encode([
        'success' => true,
        'message' => 'Archivo subido exitosamente',
        'url' => $fileUrl,
        'filename' => $fileName
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}
?>