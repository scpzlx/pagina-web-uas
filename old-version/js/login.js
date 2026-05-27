const API = "api/auth.php";

/* ---- Si ya hay sesion activa, redirigir al dashboard ---- */
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(API + "?action=check_session", { credentials: "same-origin" });
        const data = await response.json();
        if (data.success) {
            window.location.href = "dashboard.html";
        }
    } catch (error) {
        console.error("Error al verificar sesion:", error);
    }
});

/* ---- Alternar visibilidad de contrasena ---- */
function togglePassword() {
    const input = document.getElementById('password');
    const icon  = document.getElementById('passwordToggleIcon');
    if (!input || !icon) return;

    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

/* ---- Mostrar alerta ---- */
function showAlert(message, type) {
    const alert = document.getElementById('alert');
    if (!alert) return;

    alert.textContent = message;
    alert.className = 'login-alert is-visible login-alert--' + (type === 'success' ? 'success' : 'error');

    if (type === 'success') {
        setTimeout(() => { alert.classList.remove('is-visible'); }, 2000);
    }
}

function hideAlert() {
    const alert = document.getElementById('alert');
    if (alert) alert.classList.remove('is-visible');
}

/* ---- Submit del formulario: valida credenciales contra el API ---- */
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const btn = document.querySelector('.btn-login');

    if (!usuario || !password) {
        showAlert('Por favor completa todos los campos');
        return;
    }

    hideAlert();
    btn.classList.add('is-loading');
    btn.disabled = true;

    try {
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('usuario', usuario);
        formData.append('password', password);

        const response = await fetch(API, { method: 'POST', body: formData });
        const data = await response.json();

        if (data.success) {
            showAlert('Acceso correcto. Redirigiendo al panel...', 'success');
            setTimeout(() => { window.location.href = 'dashboard.html'; }, 700);
        } else {
            showAlert(data.message || 'Usuario o contrasena incorrectos');
            btn.classList.remove('is-loading');
            btn.disabled = false;
        }
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexion. Intenta de nuevo.');
        btn.classList.remove('is-loading');
        btn.disabled = false;
    }
});

/* ---- Enter en usuario pasa al campo de contrasena ---- */
document.getElementById('usuario').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});
