<?php
require_once __DIR__ . "/config.php";
$conn = getConnection();

error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") exit;

function response($success, $message, $data = null) {
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data"    => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

/* =====================================================
    1. GET CATEGORIES
===================================================== */
if ($method === "GET" && $action === "get_categories") {

    $sql = "SELECT id, nombre, descripcion FROM categorias ORDER BY nombre";
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) $data[] = $row;

    response(true, "Categorías obtenidas", $data);
}

/* =====================================================
    2. GET SUBCATEGORIES (por categoría específica)
===================================================== */
if ($method === "GET" && $action === "get_subcategories") {

    $categoria_id = intval($_GET["categoria_id"] ?? 0);

    $stmt = $conn->prepare("SELECT id, categoria_id, nombre, descripcion FROM subcategorias WHERE categoria_id = ? ORDER BY nombre");
    $stmt->bind_param("i", $categoria_id);
    $stmt->execute();
    $res = $stmt->get_result();

    $data = [];
    while ($row = $res->fetch_assoc()) $data[] = $row;

    response(true, "Subcategorías obtenidas", $data);
}

/* =====================================================
    2b. GET ALL SUBCATEGORIES (todas las subcategorías)
===================================================== */
if ($method === "GET" && $action === "get_all_subcategories") {

    $sql = "SELECT id, categoria_id, nombre, descripcion FROM subcategorias ORDER BY nombre";
    $result = $conn->query($sql);

    $data = [];
    while ($row = $result->fetch_assoc()) $data[] = $row;

    response(true, "Subcategorías obtenidas", $data);
}

/* =====================================================
    3. GET QUESTIONS
===================================================== */
if ($method === "GET" && $action === "get_questions") {

    $sql = "
        SELECT 
            p.id,
            p.pregunta,
            sc.id AS subcategoria_id,
            sc.nombre AS subcategoria,
            c.id AS categoria_id,
            c.nombre AS categoria,
            r.respuesta
        FROM preguntas p
        LEFT JOIN subcategorias sc ON sc.id = p.subcategoria_id
        LEFT JOIN categorias c ON c.id = sc.categoria_id
        LEFT JOIN respuestas r ON r.pregunta_id = p.id
        ORDER BY p.id DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) $data[] = $row;

    response(true, "Preguntas obtenidas", $data);
}

/* =====================================================
    3b. GET ANSWERS (todas las respuestas)
===================================================== */
if ($method === "GET" && $action === "get_answers") {

    $sql = "
        SELECT 
            r.id,
            r.pregunta_id,
            r.respuesta,
            p.pregunta
        FROM respuestas r
        INNER JOIN preguntas p ON p.id = r.pregunta_id
        ORDER BY r.id DESC
    ";

    $result = $conn->query($sql);
    $data = [];

    while ($row = $result->fetch_assoc()) $data[] = $row;

    response(true, "Respuestas obtenidas", $data);
}

/* =====================================================
    4. SAVE CATEGORY
===================================================== */
if ($method === "POST" && $action === "save_category") {

    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");

    if ($nombre === "") response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("ss", $nombre, $descripcion);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Categoría guardada correctamente");
}

/* =====================================================
    5. UPDATE CATEGORY
===================================================== */
if ($method === "POST" && $action === "update_category") {

    $id = intval($_POST["id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");

    if ($id <= 0) response(false, "ID inválido");
    if ($nombre === "") response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("ssi", $nombre, $descripcion, $id);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Categoría actualizada correctamente");
}

/* =====================================================
    6. DELETE CATEGORY
===================================================== */
if ($method === "POST" && $action === "delete_category") {

    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0) response(false, "ID inválido");

    // Obtener subcategorías de esta categoría
    $stmt = $conn->prepare("SELECT id FROM subcategorias WHERE categoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Eliminar preguntas y respuestas de cada subcategoría
    while ($row = $result->fetch_assoc()) {
        $subcategoria_id = $row['id'];
        
        // Obtener preguntas de esta subcategoría
        $stmt2 = $conn->prepare("SELECT id FROM preguntas WHERE subcategoria_id = ?");
        $stmt2->bind_param("i", $subcategoria_id);
        $stmt2->execute();
        $result2 = $stmt2->get_result();
        
        // Eliminar respuestas de cada pregunta
        while ($row2 = $result2->fetch_assoc()) {
            $pregunta_id = $row2['id'];
            $stmt3 = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
            $stmt3->bind_param("i", $pregunta_id);
            $stmt3->execute();
        }
        
        // Eliminar preguntas de esta subcategoría
        $stmt4 = $conn->prepare("DELETE FROM preguntas WHERE subcategoria_id = ?");
        $stmt4->bind_param("i", $subcategoria_id);
        $stmt4->execute();
    }
    
    // Eliminar subcategorías de esta categoría
    $stmt = $conn->prepare("DELETE FROM subcategorias WHERE categoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Eliminar la categoría
    $stmt = $conn->prepare("DELETE FROM categorias WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Categoría eliminada correctamente");
}

/* =====================================================
    7. SAVE SUBCATEGORY
===================================================== */
if ($method === "POST" && $action === "save_subcategory") {

    $categoria_id = intval($_POST["categoria_id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");

    if ($categoria_id <= 0) response(false, "Seleccione categoría");
    if ($nombre === "") response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("INSERT INTO subcategorias (categoria_id, nombre, descripcion) VALUES (?, ?, ?)");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("iss", $categoria_id, $nombre, $descripcion);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Subcategoría guardada correctamente");
}

/* =====================================================
    8. UPDATE SUBCATEGORY
===================================================== */
if ($method === "POST" && $action === "update_subcategory") {

    $id = intval($_POST["id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");

    if ($id <= 0) response(false, "ID inválido");
    if ($nombre === "") response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("UPDATE subcategorias SET nombre = ?, descripcion = ? WHERE id = ?");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("ssi", $nombre, $descripcion, $id);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Subcategoría actualizada correctamente");
}

/* =====================================================
    9. DELETE SUBCATEGORY
===================================================== */
if ($method === "POST" && $action === "delete_subcategory") {

    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0) response(false, "ID inválido");

    // Obtener preguntas de esta subcategoría
    $stmt = $conn->prepare("SELECT id FROM preguntas WHERE subcategoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    
    // Eliminar respuestas de cada pregunta
    while ($row = $result->fetch_assoc()) {
        $pregunta_id = $row['id'];
        $stmt2 = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
        $stmt2->bind_param("i", $pregunta_id);
        $stmt2->execute();
    }
    
    // Eliminar preguntas de esta subcategoría
    $stmt = $conn->prepare("DELETE FROM preguntas WHERE subcategoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    // Eliminar la subcategoría
    $stmt = $conn->prepare("DELETE FROM subcategorias WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Subcategoría eliminada correctamente");
}

/* =====================================================
    10. SAVE QUESTION
===================================================== */
if ($method === "POST" && $action === "save_question") {

    $subcategoria_id = intval($_POST["subcategoria_id"] ?? 0);
    $pregunta = trim($_POST["pregunta"] ?? "");

    if ($subcategoria_id <= 0) response(false, "Seleccione subcategoría");
    if ($pregunta === "") response(false, "La pregunta es obligatoria");

    $stmt = $conn->prepare("INSERT INTO preguntas (subcategoria_id, pregunta) VALUES (?, ?)");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("is", $subcategoria_id, $pregunta);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Pregunta guardada correctamente");
}

/* =====================================================
    11. UPDATE QUESTION
===================================================== */
if ($method === "POST" && $action === "update_question") {

    $id = intval($_POST["id"] ?? 0);
    $pregunta = trim($_POST["pregunta"] ?? "");

    if ($id <= 0) response(false, "ID inválido");
    if ($pregunta === "") response(false, "La pregunta no puede estar vacía");

    $stmt = $conn->prepare("UPDATE preguntas SET pregunta = ? WHERE id = ?");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("si", $pregunta, $id);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Pregunta actualizada correctamente");
}

/* =====================================================
    12. SAVE / UPDATE ANSWER
===================================================== */
if ($method === "POST" && $action === "save_answer") {

    $pregunta_id = intval($_POST["pregunta_id"] ?? 0);
    $respuesta = trim($_POST["respuesta"] ?? "");

    if ($pregunta_id <= 0) response(false, "ID inválido");

    // eliminar previo
    $stmt = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
    $stmt->bind_param("i", $pregunta_id);
    $stmt->execute();

    // insertar nueva
    $stmt = $conn->prepare("INSERT INTO respuestas (pregunta_id, respuesta) VALUES (?, ?)");
    if (!$stmt) response(false, "Error SQL: " . $conn->error);

    $stmt->bind_param("is", $pregunta_id, $respuesta);

    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Respuesta guardada correctamente");
}

/* =====================================================
    13. DELETE ANSWER
===================================================== */
if ($method === "POST" && $action === "delete_answer") {

    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0) response(false, "ID inválido");

    $stmt = $conn->prepare("DELETE FROM respuestas WHERE id = ?");
    $stmt->bind_param("i", $id);
    
    if (!$stmt->execute()) response(false, "Error SQL: " . $stmt->error);

    response(true, "Respuesta eliminada correctamente");
}

/* =====================================================
    14. DELETE QUESTION
===================================================== */
if ($method === "POST" && $action === "delete_question") {

    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0) response(false, "ID inválido");

    $stmt = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    $stmt = $conn->prepare("DELETE FROM preguntas WHERE id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();

    response(true, "Pregunta eliminada");
}

response(false, "Acción no válida.");
?>