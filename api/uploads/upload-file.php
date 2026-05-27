<?php
session_start();
require_once __DIR__ . '/../config.php';

// ─── Verificar sesión ─────────────────────────────────────────────────────────
if (empty($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'No autorizado'], JSON_UNESCAPED_UNICODE);
    exit();
}

// Verificar expiración de sesión
if (isset($_SESSION['last_activity']) && time() - $_SESSION['last_activity'] > 7200) {
    session_unset();
    session_destroy();
    http_response_code(401);
    echo json_encode(['success' => false, 'message' => 'Sesión expirada', 'expired' => true], JSON_UNESCAPED_UNICODE);
    exit();
}
$_SESSION['last_activity'] = time();

// ─── Configuración ────────────────────────────────────────────────────────────
define('MAX_FILE_SIZE', 5 * 1024 * 1024); // 5MB

// Tipos permitidos: mime real → extensión permitida
$allowedTypes = [
    'image/jpeg' => 'jpg',
    'image/jpg'  => 'jpg',
    'image/png'  => 'png',
    'image/webp' => 'webp',
    'image/gif'  => 'gif',
];

// Carpetas de destino permitidas
$allowedFolders = ['thumbnails', 'heroes', 'gallery'];

// ─── Validaciones básicas ─────────────────────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Método no permitido'], JSON_UNESCAPED_UNICODE);
    exit();
}

if (!isset($_FILES['file']) || $_FILES['file']['error'] !== UPLOAD_ERR_OK) {
    $errorMsg = match($_FILES['file']['error'] ?? -1) {
        UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE => 'El archivo excede el tamaño máximo permitido (5MB)',
        UPLOAD_ERR_PARTIAL   => 'El archivo se subió de forma incompleta',
        UPLOAD_ERR_NO_FILE   => 'No se seleccionó ningún archivo',
        default              => 'Error al subir el archivo',
    };
    echo json_encode(['success' => false, 'message' => $errorMsg], JSON_UNESCAPED_UNICODE);
    exit();
}

$file       = $_FILES['file'];
$fileType   = trim($_POST['type'] ?? 'thumbnails');

// Validar carpeta de destino
if (!in_array($fileType, $allowedFolders)) {
    echo json_encode(['success' => false, 'message' => 'Tipo de carpeta no permitido'], JSON_UNESCAPED_UNICODE);
    exit();
}

// ─── Validar tamaño ───────────────────────────────────────────────────────────
if ($file['size'] > MAX_FILE_SIZE) {
    echo json_encode(['success' => false, 'message' => 'El archivo excede el tamaño máximo de 5MB'], JSON_UNESCAPED_UNICODE);
    exit();
}

// ─── Validar tipo REAL del archivo (no solo la extensión) ────────────────────
// finfo lee los bytes reales del archivo, no el nombre ni el Content-Type enviado
$finfo    = finfo_open(FILEINFO_MIME_TYPE);
$mimeReal = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);

if (!array_key_exists($mimeReal, $allowedTypes)) {
    echo json_encode([
        'success' => false,
        'message' => 'Tipo de archivo no permitido. Solo se aceptan imágenes JPG, PNG, WebP o GIF'
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

// ─── Generar nombre seguro ────────────────────────────────────────────────────
// Nunca usar el nombre original del archivo — puede contener código malicioso
$extension   = $allowedTypes[$mimeReal];
$safeName    = bin2hex(random_bytes(16)) . '_' . time() . '.' . $extension;

// ─── Ruta de destino ──────────────────────────────────────────────────────────
$uploadDir = __DIR__ . '/../../uploads/' . $fileType . '/';

// Crear carpeta si no existe
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

$destination = $uploadDir . $safeName;

// ─── Mover archivo ────────────────────────────────────────────────────────────
if (!move_uploaded_file($file['tmp_name'], $destination)) {
    echo json_encode(['success' => false, 'message' => 'Error al guardar el archivo en el servidor'], JSON_UNESCAPED_UNICODE);
    exit();
}

// ─── URL pública del archivo ──────────────────────────────────────────────────
$publicUrl = '/uploads/' . $fileType . '/' . $safeName;

echo json_encode([
    'success' => true,
    'message' => 'Archivo subido correctamente',
    'url'     => $publicUrl,
    'name'    => $safeName,
], JSON_UNESCAPED_UNICODE);
?>