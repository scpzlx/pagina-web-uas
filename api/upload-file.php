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
    
    // Validar extensión
    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'mp4', 'webm'];
    $fileExtension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    if (!in_array($fileExtension, $allowedExtensions)) {
        throw new Exception('Extensión de archivo no permitida. Solo: JPG, PNG, GIF, WEBP, MP4, WEBM');
    }
    
    // Validar tamaño según tipo
    $maxSizes = [
        'thumbnails' => 2 * 1024 * 1024,  // 2MB para miniaturas
        'heroes' => 5 * 1024 * 1024,      // 5MB para imágenes principales
        'gallery' => 3 * 1024 * 1024,     // 3MB para galería
        'videos' => 50 * 1024 * 1024      // 50MB para videos
    ];
    
    $maxSize = $maxSizes[$fileType];
    
    if ($file['size'] > $maxSize) {
        $maxSizeMB = $maxSize / (1024 * 1024);
        throw new Exception('El archivo es demasiado grande. Máximo permitido: ' . $maxSizeMB . 'MB');
    }
    
    // Validar que sea imagen real (no archivo renombrado)
    if (in_array($fileExtension, ['jpg', 'jpeg', 'png', 'gif', 'webp'])) {
        $imageInfo = getimagesize($file['tmp_name']);
        if ($imageInfo === false) {
            throw new Exception('El archivo no es una imagen válida');
        }
        
        // Validar dimensiones máximas
        $maxWidth = 0;
        $maxHeight = 0;
        
        switch ($fileType) {
            case 'thumbnails':
                $maxWidth = 800;
                $maxHeight = 600;
                break;
            case 'heroes':
                $maxWidth = 1920;
                $maxHeight = 1080;
                break;
            case 'gallery':
                $maxWidth = 1200;
                $maxHeight = 900;
                break;
        }
        
        // Si la imagen es muy grande, redimensionarla
        if ($imageInfo[0] > $maxWidth || $imageInfo[1] > $maxHeight) {
            $resizedImage = resizeImage($file['tmp_name'], $imageInfo, $maxWidth, $maxHeight, $fileExtension);
            if ($resizedImage) {
                $file['tmp_name'] = $resizedImage;
            }
        }
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
        'filename' => $fileName,
        'size' => round($file['size'] / 1024, 2) . ' KB'
    ]);
    
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
}

// Función para redimensionar imágenes automáticamente
function resizeImage($sourcePath, $imageInfo, $maxWidth, $maxHeight, $extension) {
    list($width, $height, $type) = $imageInfo;
    
    // Calcular nuevas dimensiones manteniendo proporción
    $ratio = min($maxWidth / $width, $maxHeight / $height);
    $newWidth = round($width * $ratio);
    $newHeight = round($height * $ratio);
    
    // Crear imagen desde archivo
    switch ($type) {
        case IMAGETYPE_JPEG:
            $source = imagecreatefromjpeg($sourcePath);
            break;
        case IMAGETYPE_PNG:
            $source = imagecreatefrompng($sourcePath);
            break;
        case IMAGETYPE_GIF:
            $source = imagecreatefromgif($sourcePath);
            break;
        case IMAGETYPE_WEBP:
            $source = imagecreatefromwebp($sourcePath);
            break;
        default:
            return false;
    }
    
    if (!$source) {
        return false;
    }
    
    // Crear nueva imagen redimensionada
    $newImage = imagecreatetruecolor($newWidth, $newHeight);
    
    // Preservar transparencia para PNG y GIF
    if ($type == IMAGETYPE_PNG || $type == IMAGETYPE_GIF) {
        imagealphablending($newImage, false);
        imagesavealpha($newImage, true);
        $transparent = imagecolorallocatealpha($newImage, 255, 255, 255, 127);
        imagefilledrectangle($newImage, 0, 0, $newWidth, $newHeight, $transparent);
    }
    
    // Redimensionar
    imagecopyresampled($newImage, $source, 0, 0, 0, 0, $newWidth, $newHeight, $width, $height);
    
    // Guardar en archivo temporal
    $tempFile = tempnam(sys_get_temp_dir(), 'img_');
    
    switch ($extension) {
        case 'jpg':
        case 'jpeg':
            imagejpeg($newImage, $tempFile, 85);
            break;
        case 'png':
            imagepng($newImage, $tempFile, 8);
            break;
        case 'gif':
            imagegif($newImage, $tempFile);
            break;
        case 'webp':
            imagewebp($newImage, $tempFile, 85);
            break;
    }
    
    imagedestroy($source);
    imagedestroy($newImage);
    
    return $tempFile;
}
?>