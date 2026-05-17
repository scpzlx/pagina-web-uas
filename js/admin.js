const API = "api/backend.php";

/* ===============================
   SISTEMA DE TOASTS
================================*/
function showToast(msg, type) {
    var container = document.getElementById("toastContainer");
    var toast = document.createElement("div");
    toast.className = "toast" + (type === "error" ? " error" : "");
    toast.innerHTML =
        '<span class="toast-icon">' + (type === "error" ? '<i class="fas fa-times-circle"></i>' : '<i class="fas fa-check-circle"></i>') + '</span>' +
        '<span class="toast-msg">' + msg + '</span>';
    container.appendChild(toast);
    setTimeout(function () {
        toast.style.animation = "toastOut 0.3s ease forwards";
        setTimeout(function () { toast.remove(); }, 300);
    }, 3500);
}

/* ===============================
   NAVEGACIÓN POR TABS
================================*/
function switchTab(tab) {
    // Desactivar todos los botones y paneles
    document.querySelectorAll(".tab-btn").forEach(function (btn) {
        btn.classList.remove("active");
        btn.setAttribute("aria-selected", "false");
    });
    document.querySelectorAll(".tab-panel").forEach(function (panel) {
        panel.classList.remove("active");
    });

    // Activar el tab seleccionado
    var activeBtn = document.getElementById("tabBtn-" + tab);
    var activePanel = document.getElementById("tab-" + tab);
    if (activeBtn) {
        activeBtn.classList.add("active");
        activeBtn.setAttribute("aria-selected", "true");
    }
    if (activePanel) activePanel.classList.add("active");

    // Recargar datos al entrar en cada tab para tenerlos frescos
    if (tab === "categorias")    loadAllCategories();
    if (tab === "subcategorias") loadAllSubcategories();
    if (tab === "preguntas")     { loadAllCategories(); loadQuestions(); }
    if (tab === "respuestas")    { loadQuestionDropdown(); loadAnswers(); }
}

/* ===============================
   ABRIR / CERRAR MODAL
================================*/
function openModal(title, html) {
    document.getElementById("modalTitle").innerHTML = title;
    document.getElementById("modalContent").innerHTML = html;
    document.getElementById("modalBg").style.display = "flex";
}

function closeModal() {
    document.getElementById("modalBg").style.display = "none";
}

/* ===============================
   CARGAR CATEGORÍAS
================================*/
async function loadAllCategories() {
    const res = await fetch(API + "?action=get_categories");
    const data = await res.json();

    let selects = ["categoria", "categoriaSelect"];
    selects.forEach(id => {
        let s = document.getElementById(id);
        s.innerHTML = `<option value="">Seleccione</option>`;
        if (!data.success || !data.data) return;
        data.data.forEach(c => {
            s.innerHTML += `<option value="${c.id}">${c.nombre}</option>`;
        });
    });

    // Tabla categorías
    let table = document.getElementById("categoriesTable");
    table.innerHTML = "";
    if (!data.success || !data.data || data.data.length === 0) {
        table.innerHTML = '<tr><td colspan="3" class="empty-row">Sin categorías registradas aún.</td></tr>';
        return;
    }
    data.data.forEach(c => {
        table.innerHTML += `
            <tr>
                <td>${c.nombre}</td>
                <td>${c.descripcion || '—'}</td>
                <td>
                    <button class="edit-btn" onclick='editCategory(${JSON.stringify(c)})'>Editar</button>
                    <button class="delete-btn" onclick="deleteCategory(${c.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
loadAllCategories();

/* ===============================
   ELIMINAR CATEGORÍA
================================*/
async function deleteCategory(id) {
    if (!confirm("¿Eliminar esta categoría? Esto también eliminará sus subcategorías y preguntas asociadas.")) return;
    const fd = new FormData();
    fd.append("action", "delete_category");
    fd.append("id", id);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        loadAllCategories();
        loadAllSubcategories();
        loadQuestions();
        loadAnswers();
    }
}

/* ===============================
   CARGAR SUBCATEGORÍAS
================================*/
async function loadAllSubcategories() {
    const res = await fetch(API + "?action=get_categories");
    const catData = await res.json();

    const res2 = await fetch(API + "?action=get_all_subcategories");
    const subData = await res2.json();

    let table = document.getElementById("subcategoriesTable");
    table.innerHTML = "";

    if (!subData.success || !subData.data || subData.data.length === 0) {
        table.innerHTML = '<tr><td colspan="4" class="empty-row">Sin subcategorías registradas aún.</td></tr>';
        return;
    }

    subData.data.forEach(sc => {
        let catName = (catData.data || []).find(c => c.id == sc.categoria_id)?.nombre ?? "—";
        table.innerHTML += `
            <tr>
                <td>${catName}</td>
                <td>${sc.nombre}</td>
                <td>${sc.descripcion || '—'}</td>
                <td>
                    <button class="edit-btn" onclick='editSubcategory(${JSON.stringify(sc)})'>Editar</button>
                    <button class="delete-btn" onclick="deleteSubcategory(${sc.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
loadAllSubcategories();

/* ===============================
   ELIMINAR SUBCATEGORÍA
================================*/
async function deleteSubcategory(id) {
    if (!confirm("¿Eliminar esta subcategoría? Esto también eliminará sus preguntas asociadas.")) return;
    const fd = new FormData();
    fd.append("action", "delete_subcategory");
    fd.append("id", id);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        loadAllSubcategories();
        loadQuestions();
        loadAnswers();
    }
}

/* ===============================
   CARGAR SUBCATEGORÍAS EN SELECT
================================*/
async function loadSubcategories(categoria_id, targetSelect) {
    if (!categoria_id) {
        document.getElementById(targetSelect).innerHTML = `<option value="">Seleccione</option>`;
        return;
    }
    const res = await fetch(API + "?action=get_subcategories&categoria_id=" + categoria_id);
    const data = await res.json();

    let s = document.getElementById(targetSelect);
    s.innerHTML = `<option value="">Seleccione</option>`;
    if (!data.success || !data.data) return;
    data.data.forEach(sc => {
        s.innerHTML += `<option value="${sc.id}">${sc.nombre}</option>`;
    });
}
document.getElementById("categoria").addEventListener("change", function() {
    loadSubcategories(this.value, "subcategoria");
});

/* ===============================
   GUARDAR CATEGORÍA
================================*/
document.getElementById("categoryForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("action", "save_category");
    fd.append("nombre", document.getElementById("categoriaNombre").value);
    fd.append("descripcion", document.getElementById("categoriaDescripcion").value);
    const res = await fetch(API, { method: "POST", body: fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        document.getElementById("categoriaNombre").value = "";
        document.getElementById("categoriaDescripcion").value = "";
        loadAllCategories();
    }
});

/* ===============================
   GUARDAR SUBCATEGORÍA
================================*/
document.getElementById("subcategoryForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("action", "save_subcategory");
    fd.append("categoria_id", document.getElementById("categoriaSelect").value);
    fd.append("nombre", document.getElementById("subcategoriaNombre").value);
    fd.append("descripcion", document.getElementById("subcategoriaDescripcion").value);
    const res = await fetch(API, { method: "POST", body: fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        document.getElementById("subcategoriaNombre").value = "";
        document.getElementById("subcategoriaDescripcion").value = "";
        loadAllSubcategories();
    }
});

/* ===============================
   EDITAR / GUARDAR CATEGORÍA
================================*/
function editCategory(cat) {
    let html = `
        <label>Nombre</label>
        <input id="editCategoriaNombre" value="${cat.nombre}">
        <label>Descripción</label>
        <textarea id="editCategoriaDescripcion">${cat.descripcion || ''}</textarea>
        <button class="modal-save-btn" onclick="saveCategoryEdit(${cat.id})">Guardar Cambios</button>
    `;
    openModal("Editar Categoría", html);
}
async function saveCategoryEdit(id) {
    const nombre = document.getElementById("editCategoriaNombre").value;
    const descripcion = document.getElementById("editCategoriaDescripcion").value;
    const fd = new FormData();
    fd.append("action", "update_category");
    fd.append("id", id);
    fd.append("nombre", nombre);
    fd.append("descripcion", descripcion);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { closeModal(); loadAllCategories(); }
}

/* ===============================
   EDITAR / GUARDAR SUBCATEGORÍA
================================*/
function editSubcategory(sc) {
    let html = `
        <label>Nombre</label>
        <input id="editSubcategoriaNombre" value="${sc.nombre}">
        <label>Descripción</label>
        <textarea id="editSubcategoriaDescripcion">${sc.descripcion || ''}</textarea>
        <button class="modal-save-btn" onclick="saveSubcategoryEdit(${sc.id})">Guardar Cambios</button>
    `;
    openModal("Editar Subcategoría", html);
}
async function saveSubcategoryEdit(id) {
    const nombre = document.getElementById("editSubcategoriaNombre").value;
    const descripcion = document.getElementById("editSubcategoriaDescripcion").value;
    const fd = new FormData();
    fd.append("action", "update_subcategory");
    fd.append("id", id);
    fd.append("nombre", nombre);
    fd.append("descripcion", descripcion);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { closeModal(); loadAllSubcategories(); }
}

/* ===============================
   CARGAR PREGUNTAS
================================*/
async function loadQuestions() {
    const res = await fetch(API + "?action=get_questions");
    const data = await res.json();
    let table = document.getElementById("questionsTable");
    table.innerHTML = "";
    if (!data.success || !data.data || data.data.length === 0) {
        table.innerHTML = '<tr><td colspan="5" class="empty-row">Sin preguntas registradas aún.</td></tr>';
        return;
    }
    data.data.forEach(row => {
        const respBadge = row.respuesta && row.respuesta.trim()
            ? '<span class="badge-ok"><i class="fas fa-check"></i> Con respuesta</span>'
            : '<span class="badge-none">Sin respuesta</span>';
        table.innerHTML += `
            <tr>
                <td>${row.categoria ?? '—'}</td>
                <td>${row.subcategoria ?? '—'}</td>
                <td>${row.pregunta}</td>
                <td>${respBadge}</td>
                <td>
                    <button class="edit-btn" onclick='editQuestion(${JSON.stringify(row)})'>Editar</button>
                    <button class="delete-btn" onclick="deleteQuestion(${row.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
loadQuestions();

/* ===============================
   EDITAR / GUARDAR PREGUNTA
================================*/
function editQuestion(row) {
    let html = `
        <label>Pregunta</label>
        <input id="editPregunta" value="${row.pregunta}">
        <button class="modal-save-btn" onclick="saveQuestionEdit(${row.id})">Guardar Cambios</button>
    `;
    openModal("Editar Pregunta", html);
}
async function saveQuestionEdit(id) {
    const pregunta = document.getElementById("editPregunta").value;
    const fd = new FormData();
    fd.append("action", "update_question");
    fd.append("id", id);
    fd.append("pregunta", pregunta);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { closeModal(); loadQuestions(); loadQuestionDropdown(); }
}

/* ===============================
   ELIMINAR PREGUNTA
================================*/
async function deleteQuestion(id) {
    if (!confirm("¿Eliminar esta pregunta?")) return;
    const fd = new FormData();
    fd.append("action", "delete_question");
    fd.append("id", id);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { loadQuestions(); loadQuestionDropdown(); loadAnswers(); }
}

/* ===============================
   DROPDOWN DE PREGUNTAS
================================*/
async function loadQuestionDropdown() {
    const res = await fetch(API + "?action=get_questions");
    const data = await res.json();
    let p = document.getElementById("preguntaSelect");
    p.innerHTML = "";
    if (!data.success || !data.data) return;
    data.data.forEach(q => {
        p.innerHTML += `<option value="${q.id}">${q.pregunta}</option>`;
    });
}
loadQuestionDropdown();

/* ===============================
   GUARDAR PREGUNTA
================================*/
document.getElementById("questionForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("action", "save_question");
    fd.append("subcategoria_id", document.getElementById("subcategoria").value);
    fd.append("pregunta", document.getElementById("pregunta").value);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        document.getElementById("pregunta").value = "";
        loadQuestions();
        loadQuestionDropdown();
    }
});

/* ===============================
   CARGAR RESPUESTAS
================================*/
async function loadAnswers() {
    const res = await fetch(API + "?action=get_answers");
    const data = await res.json();
    let table = document.getElementById("answersTable");
    table.innerHTML = "";
    if (!data.success || !data.data || data.data.length === 0) {
        table.innerHTML = '<tr><td colspan="3" class="empty-row">Sin respuestas registradas aún.</td></tr>';
        return;
    }
    data.data.forEach(row => {
        // Truncar respuestas largas en la tabla para mejor lectura
        const respCorta = row.respuesta && row.respuesta.length > 120
            ? row.respuesta.substring(0, 117) + '...'
            : (row.respuesta || '—');
        table.innerHTML += `
            <tr>
                <td>${row.pregunta}</td>
                <td title="${row.respuesta}">${respCorta}</td>
                <td>
                    <button class="edit-btn" onclick='editAnswer(${JSON.stringify(row)})'>Editar</button>
                    <button class="delete-btn" onclick="deleteAnswer(${row.id})">Eliminar</button>
                </td>
            </tr>
        `;
    });
}
loadAnswers();

/* ===============================
   EDITAR / GUARDAR RESPUESTA
================================*/
function editAnswer(row) {
    let html = `
        <label>Pregunta</label>
        <input id="editAnswerPregunta" value="${row.pregunta}" disabled style="background:#f0f0f0;">
        <label>Respuesta</label>
        <textarea id="editAnswerRespuesta" rows="5">${row.respuesta}</textarea>
        <button class="modal-save-btn" onclick="saveAnswerEdit(${row.pregunta_id})">Guardar Cambios</button>
    `;
    openModal("Editar Respuesta", html);
}
async function saveAnswerEdit(pregunta_id) {
    const respuesta = document.getElementById("editAnswerRespuesta").value;
    const fd = new FormData();
    fd.append("action", "save_answer");
    fd.append("pregunta_id", pregunta_id);
    fd.append("respuesta", respuesta);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { closeModal(); loadAnswers(); loadQuestions(); }
}

/* ===============================
   ELIMINAR RESPUESTA
================================*/
async function deleteAnswer(id) {
    if (!confirm("¿Eliminar esta respuesta?")) return;
    const fd = new FormData();
    fd.append("action", "delete_answer");
    fd.append("id", id);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) { loadAnswers(); loadQuestions(); }
}

/* ===============================
   GUARDAR RESPUESTA
================================*/
document.getElementById("answerForm").addEventListener("submit", async e => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("action", "save_answer");
    fd.append("pregunta_id", document.getElementById("preguntaSelect").value);
    fd.append("respuesta", document.getElementById("respuesta").value);
    const res = await fetch(API, { method:"POST", body:fd });
    const data = await res.json();
    showToast(data.message, data.success ? "success" : "error");
    if (data.success) {
        document.getElementById("respuesta").value = "";
        loadAnswers();
        loadQuestions();
    }
});

/* ===============================
   CERRAR SESIÓN
================================*/
async function logout() {
    if (confirm("¿Estás seguro de que deseas cerrar sesión?")) {
        // Llamar al backend para cerrar sesión
        const fd = new FormData();
        fd.append("action", "logout");
        await fetch(API, { method: "POST", body: fd });
        
        // Redirigir a la página de inicio/login
        window.location.href = "login.html";
    }
}