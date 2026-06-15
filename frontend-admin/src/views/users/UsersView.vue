<template>
    <AdminLayout title="Usuarios" eyebrow="Administración">

        <div class="content-header">
            <div>
                <h1 class="content-title">Gestión de Usuarios</h1>
                <p class="content-desc">Crea y administra los administradores del panel. Solo el superadministrador
                    puede acceder a esta sección.</p>
            </div>
            <button class="btn-primary" @click="abrirModalCrear">
                <i class="ti ti-plus"></i> Nuevo usuario
            </button>
        </div>

        <!-- ESTADOS -->
        <div v-if="loading" class="estado-msg">
            <i class="ti ti-loader-2 spin"></i> Cargando usuarios...
        </div>
        <div v-else-if="error" class="estado-msg error">
            <i class="ti ti-alert-circle"></i> No se pudieron cargar los usuarios.
        </div>

        <!-- LISTA -->
        <div v-else class="items-list">
            <div v-for="user in usuarios" :key="user.id" class="list-item">
                <div class="user-avatar-big">{{ user.usuario.charAt(0).toUpperCase() }}</div>
                <div class="item-info">
                    <div class="user-name-row">
                        <h3>{{ user.usuario }}</h3>
                        <span class="rol-badge" :class="user.rol">{{ user.rol }}</span>
                        <span v-if="user.locked_until && isLocked(user.locked_until)" class="locked-badge">
                            <i class="ti ti-lock"></i> Bloqueado
                        </span>
                    </div>
                    <div class="item-meta">
                        <span v-if="user.last_login">
                            <i class="ti ti-clock"></i> Último acceso: {{ formatDate(user.last_login) }}
                        </span>
                        <span v-if="user.last_ip">
                            <i class="ti ti-map-pin"></i> IP: {{ user.last_ip }}
                        </span>
                        <span v-if="user.failed_attempts > 0" class="attempts-warn">
                            <i class="ti ti-alert-triangle"></i> {{ user.failed_attempts }} intentos fallidos
                        </span>
                    </div>
                </div>
                <div class="item-actions" v-if="user.rol !== 'superadmin'">
                    <button class="btn-icon btn-edit" @click="abrirModalEditar(user)" title="Editar">
                        <i class="ti ti-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" @click="confirmarEliminar(user)" title="Eliminar">
                        <i class="ti ti-trash"></i>
                    </button>
                </div>
                <div class="item-actions" v-else>
                    <span class="superadmin-note">No editable</span>
                </div>
            </div>
        </div>

        <!-- MODAL CREAR / EDITAR -->
        <div v-if="modalForm" class="modal-overlay" @click.self="cerrarModal">
            <div class="modal-box">
                <div class="modal-header">
                    <h3>{{ modoEdicion ? 'Editar usuario' : 'Nuevo usuario' }}</h3>
                    <button class="modal-close" @click="cerrarModal"><i class="ti ti-x"></i></button>
                </div>
                <div class="modal-body">
                    <div class="field">
                        <label class="label">Usuario <span class="req">*</span></label>
                        <input v-model="form.usuario" type="text" class="input" placeholder="Nombre de usuario" />
                    </div>
                    <div class="field">
                        <label class="label">
                            Contraseña {{ modoEdicion ? '(dejar vacío para no cambiar)' : '' }}
                            <span class="req" v-if="!modoEdicion">*</span>
                        </label>
                        <div class="password-field-wrap">
                            <input v-model="form.password" :type="showPass ? 'text' : 'password'" class="input" :class="{
                                'input-error': mostrarChecks && !passwordValida,
                                'input-ok': mostrarChecks && passwordValida
                            }" :placeholder="modoEdicion ? 'Nueva contraseña (opcional)' : 'Mínimo 8 caracteres'" />
                            <button type="button" class="pass-toggle" @click="showPass = !showPass">
                                <i :class="showPass ? 'ti ti-eye-off' : 'ti ti-eye'"></i>
                            </button>
                        </div>

                        <!-- Indicadores en tiempo real -->
                        <div v-if="mostrarChecks" class="password-checks">
                            <div class="check-item"
                                :class="{ ok: passwordChecks.length, fail: !passwordChecks.length }">
                                <i :class="passwordChecks.length ? 'ti ti-check' : 'ti ti-x'"></i>
                                Mínimo 8 caracteres
                            </div>
                            <div class="check-item"
                                :class="{ ok: passwordChecks.letter, fail: !passwordChecks.letter }">
                                <i :class="passwordChecks.letter ? 'ti ti-check' : 'ti ti-x'"></i>
                                Al menos una letra
                            </div>
                            <div class="check-item"
                                :class="{ ok: passwordChecks.number, fail: !passwordChecks.number }">
                                <i :class="passwordChecks.number ? 'ti ti-check' : 'ti ti-x'"></i>
                                Al menos un número
                            </div>
                            <div class="check-item"
                                :class="{ ok: passwordChecks.special, fail: !passwordChecks.special }">
                                <i :class="passwordChecks.special ? 'ti ti-check' : 'ti ti-x'"></i>
                                Un símbolo (recomendado)
                            </div>
                        </div>
                    </div>
                    <div class="field">
                        <label class="label">Rol</label>
                        <select v-model="form.rol" class="select">
                            <option value="admin">Administrador</option>
                        </select>
                        <small>Solo se puede crear administradores. El superadmin es único.</small>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" @click="cerrarModal">Cancelar</button>
                    <button class="btn-primary" @click="guardarUsuario" :disabled="guardando">
                        <i class="ti ti-loader-2 spin" v-if="guardando"></i>
                        <i class="ti ti-device-floppy" v-else></i>
                        {{ guardando ? 'Guardando...' : (modoEdicion ? 'Actualizar' : 'Crear usuario') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- MODAL ELIMINAR -->
        <div v-if="modalEliminar" class="modal-overlay" @click.self="modalEliminar = false">
            <div class="modal-box">
                <div class="modal-warning-icon"><i class="ti ti-alert-triangle"></i></div>
                <h3>¿Eliminar usuario?</h3>
                <p>Estás a punto de eliminar al usuario <strong>{{ usuarioAEliminar?.usuario }}</strong>. Esta acción no
                    se puede deshacer.</p>
                <div class="modal-actions">
                    <button class="btn-secondary" @click="modalEliminar = false">Cancelar</button>
                    <button class="btn-danger" @click="eliminarUsuario" :disabled="eliminando">
                        <i class="ti ti-loader-2 spin" v-if="eliminando"></i>
                        <i class="ti ti-trash" v-else></i>
                        {{ eliminando ? 'Eliminando...' : 'Eliminar' }}
                    </button>
                </div>
            </div>
        </div>

        <!-- TOAST -->
        <div v-if="toast.show" class="toast" :class="toast.type">
            <i :class="toast.type === 'success' ? 'ti ti-check' : 'ti ti-alert-circle'"></i>
            {{ toast.msg }}
        </div>

    </AdminLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import AdminLayout from '@/components/AdminLayout.vue'
import api from '@/services/api'

const usuarios = ref<any[]>([])
const loading = ref(true)
const error = ref(false)
const guardando = ref(false)
const eliminando = ref(false)
const modalForm = ref(false)
const modalEliminar = ref(false)
const modoEdicion = ref(false)
const usuarioAEliminar = ref<any>(null)
const editandoId = ref<number | null>(null)
const toast = ref({ show: false, msg: '', type: 'success' })
const showPass = ref(false) 

const form = ref({ usuario: '', password: '', rol: 'admin' })

const passwordChecks = computed(() => {
    const p = form.value.password;
    return {
        length: p.length >= 8,
        letter: /[A-Za-z]/.test(p),
        number: /[0-9]/.test(p),
        special: /[^A-Za-z0-9]/.test(p),
    }
});

const passwordValida = computed(() => {
    const c = passwordChecks.value;
    return c.length && c.letter && c.number
});

const mostrarChecks = computed(() => {
    return form.value.password.length > 0
});

const mesesLargo = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

function formatDate(d: string) {
    if (!d) return '—'
    const fecha = new Date(d)
    return `${mesesLargo[fecha.getMonth()]} ${String(fecha.getDate()).padStart(2, '0')}, ${fecha.getFullYear()} ${String(fecha.getHours()).padStart(2, '0')}:${String(fecha.getMinutes()).padStart(2, '0')}`
}

function isLocked(lockedUntil: string) {
    return new Date(lockedUntil) > new Date()
}

function showToast(msg: string, type = 'success') {
    toast.value = { show: true, msg, type }
    setTimeout(() => { toast.value.show = false }, 3500)
}

function abrirModalCrear() {
    modoEdicion.value = false
    editandoId.value = null
    form.value = { usuario: '', password: '', rol: 'admin' }
    modalForm.value = true
}

function abrirModalEditar(user: any) {
    modoEdicion.value = true
    editandoId.value = user.id
    form.value = { usuario: user.usuario, password: '', rol: user.rol }
    modalForm.value = true
}

function cerrarModal() {
    modalForm.value = false
}

function confirmarEliminar(user: any) {
    usuarioAEliminar.value = user
    modalEliminar.value = true
}

async function cargarUsuarios() {
    loading.value = true
    error.value = false
    try {
        const res = await api.get('/users/get-all-users.php')
        if (res.data.success) usuarios.value = res.data.data
        else error.value = true
    } catch { error.value = true }
    finally { loading.value = false }
}

async function guardarUsuario() {
    if (!form.value.usuario.trim()) { showToast('El usuario es requerido', 'error'); return }
    if (!modoEdicion.value && !form.value.password) { showToast('La contraseña es requerida', 'error'); return }
    if (form.value.password && !passwordValida.value) { showToast('La contraseña no cumple los requisitos mínimos', 'error'); return }

    guardando.value = true
    try {
        const payload: any = { usuario: form.value.usuario, rol: form.value.rol }
        if (form.value.password) payload.password = form.value.password
        if (modoEdicion.value) payload.id = editandoId.value

        const endpoint = modoEdicion.value ? '/users/update-user.php' : '/users/create-user.php'
        const res = await api.post(endpoint, payload)

        if (res.data.success) {
            showToast(modoEdicion.value ? 'Usuario actualizado' : 'Usuario creado')
            cerrarModal()
            await cargarUsuarios()
        } else {
            showToast(res.data.message || 'Error al guardar', 'error')
        }
    } catch { showToast('Error de conexión', 'error') }
    finally { guardando.value = false }
}

async function eliminarUsuario() {
    if (!usuarioAEliminar.value) return
    eliminando.value = true
    try {
        const res = await api.post('/users/delete-user.php', { id: usuarioAEliminar.value.id })
        if (res.data.success) {
            usuarios.value = usuarios.value.filter(u => u.id !== usuarioAEliminar.value.id)
            showToast('Usuario eliminado')
        } else {
            showToast(res.data.message || 'Error al eliminar', 'error')
        }
    } catch { showToast('Error de conexión', 'error') }
    finally {
        eliminando.value = false
        modalEliminar.value = false
        usuarioAEliminar.value = null
    }
}

onMounted(cargarUsuarios)
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
@import url('https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@latest/tabler-icons.min.css');

.content-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.content-title {
    font-size: 24px;
    font-weight: 800;
    color: #1a1a2e;
    margin-bottom: 4px;
    font-family: 'Outfit', sans-serif;
}

.content-desc {
    font-size: 14px;
    color: #64748b;
    font-family: 'Outfit', sans-serif;
}

.btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ffd500;
    color: #0f1a8c;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 700;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
}

.btn-primary:hover:not(:disabled) {
    background: #ffe033;
}

.btn-primary:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.estado-msg {
    text-align: center;
    padding: 60px 24px;
    font-size: 15px;
    color: #94a3b8;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    font-family: 'Outfit', sans-serif;
}

.estado-msg i {
    font-size: 40px;
    opacity: 0.4;
}

.estado-msg.error {
    color: #b91c1c;
}

.items-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.list-item {
    display: flex;
    align-items: center;
    gap: 16px;
    background: white;
    border: 1px solid #e2e8f0;
    border-radius: 14px;
    padding: 16px 20px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.list-item:hover {
    border-color: #a8b3e0;
    box-shadow: 0 4px 16px rgba(15, 26, 140, 0.08);
}

.user-avatar-big {
    width: 48px;
    height: 48px;
    background: #0f1a8c;
    color: #ffd500;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 800;
    flex-shrink: 0;
    font-family: 'Outfit', sans-serif;
}

.item-info {
    flex: 1;
}

.user-name-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 6px;
    flex-wrap: wrap;
}

.user-name-row h3 {
    font-size: 15px;
    font-weight: 700;
    color: #1a1a2e;
}

.rol-badge {
    font-size: 11px;
    font-weight: 700;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.rol-badge.superadmin {
    background: #ffd500;
    color: #0f1a8c;
}

.rol-badge.admin {
    background: #eef2ff;
    color: #0f1a8c;
    border: 1px solid #c7d2fe;
}

.locked-badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 600;
    background: #fef2f2;
    color: #b91c1c;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid #fecaca;
}

.item-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    font-size: 12px;
    color: #94a3b8;
    font-family: 'Outfit', sans-serif;
}

.item-meta span {
    display: flex;
    align-items: center;
    gap: 4px;
}

.attempts-warn {
    color: #d97706;
}

.item-actions {
    display: flex;
    gap: 8px;
    flex-shrink: 0;
}

.superadmin-note {
    font-size: 12px;
    color: #94a3b8;
    font-style: italic;
    font-family: 'Outfit', sans-serif;
}

.btn-icon {
    width: 36px;
    height: 36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    background: white;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.15s;
    color: #64748b;
}

.btn-edit:hover {
    background: #eef2ff;
    color: #0f1a8c;
    border-color: #a8b3e0;
}

.btn-delete:hover {
    background: #fef2f2;
    color: #b91c1c;
    border-color: #fecaca;
}

/* MODALES */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15, 26, 140, 0.4);
    backdrop-filter: blur(3px);
    z-index: 300;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
}

.modal-box {
    background: white;
    border-radius: 16px;
    padding: 28px;
    max-width: 440px;
    width: 100%;
    box-shadow: 0 24px 60px rgba(15, 26, 140, 0.25);
}

.modal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
}

.modal-header h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    font-family: 'Outfit', sans-serif;
}

.modal-close {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 20px;
    color: #94a3b8;
    padding: 4px;
    border-radius: 6px;
    display: flex;
    align-items: center;
}

.modal-close:hover {
    color: #1a1a2e;
    background: #f1f5f9;
}

.modal-body {
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-bottom: 20px;
}

.modal-footer {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
    padding-top: 16px;
    border-top: 1px solid #e2e8f0;
}

.field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-family: 'Outfit', sans-serif;
}

.label {
    font-size: 13px;
    font-weight: 600;
    color: #374151;
}

.req {
    color: #ef4444;
}

.input,
.select {
    width: 100%;
    padding: 10px 14px;
    border: 1.5px solid #e2e8f0;
    border-radius: 8px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    color: #1a1a2e;
    background: white;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input:focus,
.select:focus {
    border-color: #0f1a8c;
    box-shadow: 0 0 0 3px rgba(15, 26, 140, 0.08);
}

small {
    font-size: 12px;
    color: #94a3b8;
}

.modal-warning-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: #fffbeb;
    border: 1px solid #fde68a;
    color: #f59e0b;
    font-size: 28px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
}

.modal-box h3 {
    font-size: 18px;
    font-weight: 700;
    color: #1a1a2e;
    margin-bottom: 10px;
    text-align: center;
    font-family: 'Outfit', sans-serif;
}

.modal-box p {
    font-size: 14px;
    color: #64748b;
    line-height: 1.6;
    margin-bottom: 24px;
    text-align: center;
    font-family: 'Outfit', sans-serif;
}

.modal-actions {
    display: flex;
    gap: 10px;
    justify-content: center;
}

.btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: white;
    color: #374151;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 8px;
    border: 1.5px solid #e2e8f0;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-secondary:hover {
    background: #f8fafc;
}

.btn-danger {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #ef4444;
    color: white;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
}

.btn-danger:hover:not(:disabled) {
    background: #dc2626;
}

.btn-danger:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.toast {
    position: fixed;
    bottom: 28px;
    right: 28px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 14px 20px;
    border-radius: 12px;
    font-family: 'Outfit', sans-serif;
    font-size: 14px;
    font-weight: 500;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 400;
    animation: slideIn 0.3s ease;
}

.toast.success {
    background: white;
    color: #047857;
    border-left: 4px solid #10b981;
}

.toast.error {
    background: white;
    color: #b91c1c;
    border-left: 4px solid #ef4444;
}

@keyframes slideIn {
    from {
        opacity: 0;
        transform: translateX(24px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.spin {
    animation: spin 1s linear infinite;
    display: inline-block;
}

@media (max-width: 600px) {
    .list-item {
        flex-direction: column;
        align-items: flex-start;
    }

    .item-actions {
        width: 100%;
        justify-content: flex-end;
    }
}

.password-field-wrap {
    position: relative;
}

.password-field-wrap .input {
    padding-right: 44px;
}

.pass-toggle {
    position: absolute;
    right: 6px;
    top: 50%;
    transform: translateY(-50%);
    width: 34px;
    height: 34px;
    background: none;
    border: none;
    cursor: pointer;
    color: #94a3b8;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    transition: color 0.2s, background 0.2s;
}

.pass-toggle:hover { color: #0f1a8c; background: #f1f5f9; }

.input-error { border-color: #fca5a5 !important };
.input-ok { border-color: #6ee7b7 !important };

.password-checks {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-top: 8px;
    padding: 12px 14px;
    background: #f8fafc;
    border-radius: 8px;
    border: 1px solid #e2e8f0;
}

.check-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    font-weight: 500;
    font-family: 'Outfit', sans-serif;
    transition: color 0.2s;
}

.check-item i { font-size: 14px; flex-shrink: 0; }

.check-item.ok { color: #059669; }
.check-item.ok i { color: #10b981; }

.check-item.fail { color: #94a3b8; }
.check-item.fail i { color: #d1d5db; }

</style>