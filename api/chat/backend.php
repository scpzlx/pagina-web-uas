<?php
require_once __DIR__ . "/../config.php";
$conn = getConnection();

function response($success, $message, $data = null)
{
    echo json_encode([
        "success" => $success,
        "message" => $message,
        "data" => $data
    ], JSON_UNESCAPED_UNICODE);
    exit();
}

$method = $_SERVER['REQUEST_METHOD'];
$action = $_GET['action'] ?? $_POST['action'] ?? '';

/* ===================== 1. GET CATEGORIES ===================== */
if ($method === "GET" && $action === "get_categories") {
    $sql = "SELECT id, nombre, descripcion FROM categorias ORDER BY nombre";
    $result = $conn->query($sql);
    if ($result === false)
        response(false, "Error: " . $conn->error);

    $data = [];
    while ($row = $result->fetch_assoc())
        $data[] = $row;
    response(true, "Categorías obtenidas", $data);
}

/* ===================== 2. GET ALL SUBCATEGORIES ===================== */
if ($method === "GET" && $action === "get_all_subcategories") {
    $sql = "SELECT id, categoria_id, nombre, descripcion FROM subcategorias ORDER BY nombre";
    $result = $conn->query($sql);
    if ($result === false)
        response(false, "Error: " . $conn->error);

    $data = [];
    while ($row = $result->fetch_assoc())
        $data[] = $row;
    response(true, "Subcategorías obtenidas", $data);
}

/* ===================== 3. GET QUESTIONS ===================== */
if ($method === "GET" && $action === "get_questions") {
    $sql = "
        SELECT 
            p.id,
            p.pregunta,
            sc.id AS subcategoria_id,
            sc.nombre AS subcategoria,
            c.id AS categoria_id,
            c.nombre AS categoria,
            r.id AS respuesta_id,
            r.respuesta
        FROM preguntas p
        LEFT JOIN subcategorias sc ON sc.id = p.subcategoria_id
        LEFT JOIN categorias c ON c.id = sc.categoria_id
        LEFT JOIN respuestas r ON r.pregunta_id = p.id
        ORDER BY p.id DESC
    ";
    $result = $conn->query($sql);
    if ($result === false)
        response(false, "Error: " . $conn->error);

    $data = [];
    while ($row = $result->fetch_assoc())
        $data[] = $row;
    response(true, "Preguntas obtenidas", $data);
}

/* ===================== 3b. GET ANSWERS ===================== */
if ($method === "GET" && $action === "get_answers") {
    $sql = "
        SELECT r.id, r.pregunta_id, r.respuesta, p.pregunta
        FROM respuestas r
        INNER JOIN preguntas p ON p.id = r.pregunta_id
        ORDER BY r.id DESC
    ";
    $result = $conn->query($sql);
    if ($result === false)
        response(false, "Error: " . $conn->error);

    $data = [];
    while ($row = $result->fetch_assoc())
        $data[] = $row;
    response(true, "Respuestas obtenidas", $data);
}

/* ===================== 4. SAVE CATEGORY ===================== */
if ($method === "POST" && $action === "save_category") {
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");
    if ($nombre === "")
        response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)");
    $stmt->bind_param("ss", $nombre, $descripcion);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Categoría guardada correctamente");
}

/* ===================== 5. UPDATE CATEGORY ===================== */
if ($method === "POST" && $action === "update_category") {
    $id = intval($_POST["id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");
    if ($id <= 0)
        response(false, "ID inválido");
    if ($nombre === "")
        response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?");
    $stmt->bind_param("ssi", $nombre, $descripcion, $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Categoría actualizada correctamente");
}

/* ===================== 6. DELETE CATEGORY (cascada) ===================== */
if ($method === "POST" && $action === "delete_category") {
    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0)
        response(false, "ID inválido");

    // Subcategorías de esta categoría
    $stmt = $conn->prepare("SELECT id FROM subcategorias WHERE categoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($subId);
    $subIds = [];
    while ($stmt->fetch())
        $subIds[] = $subId;
    $stmt->close();

    foreach ($subIds as $subcategoria_id) {
        // Preguntas de esta subcategoría
        $stmt2 = $conn->prepare("SELECT id FROM preguntas WHERE subcategoria_id = ?");
        $stmt2->bind_param("i", $subcategoria_id);
        $stmt2->execute();
        $stmt2->bind_result($pregId);
        $pregIds = [];
        while ($stmt2->fetch())
            $pregIds[] = $pregId;
        $stmt2->close();

        foreach ($pregIds as $pregunta_id) {
            $stmt3 = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
            $stmt3->bind_param("i", $pregunta_id);
            $stmt3->execute();
            $stmt3->close();
        }

        $stmt4 = $conn->prepare("DELETE FROM preguntas WHERE subcategoria_id = ?");
        $stmt4->bind_param("i", $subcategoria_id);
        $stmt4->execute();
        $stmt4->close();
    }

    $stmt = $conn->prepare("DELETE FROM subcategorias WHERE categoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM categorias WHERE id = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Categoría eliminada correctamente");
}

/* ===================== 7. SAVE SUBCATEGORY ===================== */
if ($method === "POST" && $action === "save_subcategory") {
    $categoria_id = intval($_POST["categoria_id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");
    if ($categoria_id <= 0)
        response(false, "Seleccione categoría");
    if ($nombre === "")
        response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("INSERT INTO subcategorias (categoria_id, nombre, descripcion) VALUES (?, ?, ?)");
    $stmt->bind_param("iss", $categoria_id, $nombre, $descripcion);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Subcategoría guardada correctamente");
}

/* ===================== 8. UPDATE SUBCATEGORY ===================== */
if ($method === "POST" && $action === "update_subcategory") {
    $id = intval($_POST["id"] ?? 0);
    $categoria_id = intval($_POST["categoria_id"] ?? 0);
    $nombre = trim($_POST["nombre"] ?? "");
    $descripcion = trim($_POST["descripcion"] ?? "");
    if ($id <= 0)
        response(false, "ID inválido");
    if ($nombre === "")
        response(false, "El nombre es obligatorio");

    $stmt = $conn->prepare("UPDATE subcategorias SET categoria_id = ?, nombre = ?, descripcion = ? WHERE id = ?");
    $stmt->bind_param("issi", $categoria_id, $nombre, $descripcion, $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Subcategoría actualizada correctamente");
}

/* ===================== 9. DELETE SUBCATEGORY (cascada) ===================== */
if ($method === "POST" && $action === "delete_subcategory") {
    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0)
        response(false, "ID inválido");

    $stmt = $conn->prepare("SELECT id FROM preguntas WHERE subcategoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->bind_result($pregId);
    $pregIds = [];
    while ($stmt->fetch())
        $pregIds[] = $pregId;
    $stmt->close();

    foreach ($pregIds as $pregunta_id) {
        $stmt2 = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
        $stmt2->bind_param("i", $pregunta_id);
        $stmt2->execute();
        $stmt2->close();
    }

    $stmt = $conn->prepare("DELETE FROM preguntas WHERE subcategoria_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM subcategorias WHERE id = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Subcategoría eliminada correctamente");
}

/* ===================== 10. SAVE QUESTION ===================== */
if ($method === "POST" && $action === "save_question") {
    $subcategoria_id = intval($_POST["subcategoria_id"] ?? 0);
    $pregunta = trim($_POST["pregunta"] ?? "");
    if ($subcategoria_id <= 0)
        response(false, "Seleccione subcategoría");
    if ($pregunta === "")
        response(false, "La pregunta es obligatoria");

    $stmt = $conn->prepare("INSERT INTO preguntas (subcategoria_id, pregunta) VALUES (?, ?)");
    $stmt->bind_param("is", $subcategoria_id, $pregunta);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Pregunta guardada correctamente");
}

/* ===================== 11. UPDATE QUESTION ===================== */
if ($method === "POST" && $action === "update_question") {
    $id = intval($_POST["id"] ?? 0);
    $subcategoria_id = intval($_POST["subcategoria_id"] ?? 0);
    $pregunta = trim($_POST["pregunta"] ?? "");
    if ($id <= 0)
        response(false, "ID inválido");
    if ($pregunta === "")
        response(false, "La pregunta no puede estar vacía");

    $stmt = $conn->prepare("UPDATE preguntas SET subcategoria_id = ?, pregunta = ? WHERE id = ?");
    $stmt->bind_param("isi", $subcategoria_id, $pregunta, $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Pregunta actualizada correctamente");
}

/* ===================== 12. DELETE QUESTION ===================== */
if ($method === "POST" && $action === "delete_question") {
    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0)
        response(false, "ID inválido");

    $stmt = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("DELETE FROM preguntas WHERE id = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Pregunta eliminada");
}

/* ===================== 13. SAVE / UPDATE ANSWER ===================== */
if ($method === "POST" && $action === "save_answer") {
    $pregunta_id = intval($_POST["pregunta_id"] ?? 0);
    $respuesta = trim($_POST["respuesta"] ?? "");
    if ($pregunta_id <= 0)
        response(false, "ID inválido");
    if ($respuesta === "")
        response(false, "La respuesta no puede estar vacía");

    $stmt = $conn->prepare("DELETE FROM respuestas WHERE pregunta_id = ?");
    $stmt->bind_param("i", $pregunta_id);
    $stmt->execute();
    $stmt->close();

    $stmt = $conn->prepare("INSERT INTO respuestas (pregunta_id, respuesta) VALUES (?, ?)");
    $stmt->bind_param("is", $pregunta_id, $respuesta);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Respuesta guardada correctamente");
}

/* ===================== 14. DELETE ANSWER ===================== */
if ($method === "POST" && $action === "delete_answer") {
    $id = intval($_POST["id"] ?? 0);
    if ($id <= 0)
        response(false, "ID inválido");

    $stmt = $conn->prepare("DELETE FROM respuestas WHERE id = ?");
    $stmt->bind_param("i", $id);
    if (!$stmt->execute())
        response(false, "Error SQL: " . $stmt->error);
    $stmt->close();

    response(true, "Respuesta eliminada correctamente");
}

response(false, "Acción no válida.");
?>