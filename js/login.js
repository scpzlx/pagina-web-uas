const API = "api/auth.php";

// Verificar si ya hay sesión activa
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch(API + "?action=check_session");
        const data = await response.json();
        
        if (data.success && data.logged_in) {
            window.location.href = "admin.html";
        }
    } catch (error) {
        console.error("Error al verificar sesión:", error);
    }
});

// Alternar visibilidad de contraseña
function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-icon');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleIcon.textContent = '👁️';
    }
}

// Mostrar alerta
function showAlert(message, type = 'error') {
    const alert = document.getElementById('alert');
    alert.textContent = message;
    alert.className = 'alert alert-' + type;
    alert.style.display = 'block';
    
    if (type === 'success') {
        setTimeout(() => {
            alert.style.display = 'none';
        }, 2000);
    }
}

// Manejo del formulario
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const usuario = document.getElementById('usuario').value.trim();
    const password = document.getElementById('password').value;
    const btnLogin = document.querySelector('.btn-login');
    const alert = document.getElementById('alert');
    
    // Validaciones básicas
    if (!usuario || !password) {
        showAlert('Por favor completa todos los campos');
        return;
    }
    
    // Ocultar alerta
    alert.style.display = 'none';
    
    // Mostrar loader
    btnLogin.classList.add('loading');
    btnLogin.disabled = true;
    
    try {
        const formData = new FormData();
        formData.append('action', 'login');
        formData.append('usuario', usuario);
        formData.append('password', password);
        
        const response = await fetch(API, {
            method: 'POST',
            body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
            showAlert('¡Inicio de sesión exitoso! Redirigiendo...', 'success');
            setTimeout(() => {
                window.location.href = 'admin.html';
            }, 1000);
        } else {
            showAlert(data.message || 'Usuario o contraseña incorrectos');
            btnLogin.classList.remove('loading');
            btnLogin.disabled = false;
        }
        
    } catch (error) {
        console.error('Error:', error);
        showAlert('Error de conexión. Por favor intenta de nuevo.');
        btnLogin.classList.remove('loading');
        btnLogin.disabled = false;
    }
});

// Enter en el campo de usuario pasa al campo de contraseña
document.getElementById('usuario').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        document.getElementById('password').focus();
    }
});