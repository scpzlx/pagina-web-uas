<template>
    <div>
        <!-- BOTÓN FLOTANTE -->
        <button class="chat-fab" @click="toggleChat" aria-label="Abrir chat de asistencia">
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
            </svg>
            <span class="chat-fab-badge" aria-hidden="true">?</span>
        </button>

        <!-- VENTANA DEL CHAT -->
        <div class="chat-widget-window" :class="{ open: chatOpen }" v-show="chatOpen || closing">
            <div class="chat-widget-header">
                <div class="chat-header-left">
                    <div class="chat-header-avatar">🎓</div>
                    <div class="chat-header-info">
                        <h4>Asistente EDAV</h4>
                        <p><span class="chat-online-dot"></span>En línea</p>
                    </div>
                </div>
                <button class="chat-close-btn" @click="closeChat">&times;</button>
            </div>

            <div class="chat-widget-body" ref="bodyRef">
                <div v-for="(msg, i) in mensajes" :key="i" :class="['chat-msg', msg.tipo]" v-html="msg.html"></div>

                <div v-if="typing" class="chat-typing-indicator">
                    <span></span><span></span><span></span>
                </div>

                <div v-if="opciones.length" class="chat-opts-box">
                    <button v-for="(opt, i) in opciones" :key="i" type="button" class="chat-opt"
                        :class="{ 'back-opt': opt.back }" v-html="opt.label" @click="opt.action"></button>
                </div>
            </div>

            <div class="chat-widget-footer">
                <input type="text" v-model="inputText"
                    :placeholder="modoIA ? 'Escribe tu pregunta...' : 'Escribe \'hola\' para comenzar...'"
                    @keydown.enter="sendMessage" />
                <button type="button" @click="sendMessage" aria-label="Enviar">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import api from '@/services/api'

const chatOpen = ref(false)
const closing = ref(false)
const chatInit = ref(false)
const dataLoaded = ref(false)
const typing = ref(false)
const inputText = ref('')
const bodyRef = ref<HTMLElement | null>(null)
const selectedCatId = ref<number | null>(null)

// Modo del asistente: true = responde con IA (texto libre); false = menú de selección
const modoIA = ref(false)

const mensajes = ref<{ tipo: 'bot' | 'user'; html: string }[]>([])
const opciones = ref<{ label: string; action: () => void; back?: boolean }[]>([])

// Historial breve para dar contexto a la IA en preguntas de seguimiento
const histIA = ref<{ tipo: 'user' | 'bot'; texto: string }[]>([])

let categorias: any[] = []
let subcategorias: any[] = []
let preguntas: any[] = []

const CONTACTO = 'No encontré esa información en el sitio. Para una respuesta directa puedes comunicarte con la escuela:\n📞 +52 667 758 1400\n✉️ sau.uas@uas.edu.mx'

function toggleChat() {
    if (chatOpen.value) {
        closeChat()
    } else {
        chatOpen.value = true
        closing.value = false
        if (!chatInit.value) {
            chatInit.value = true
            iniciar()
        }
    }
}

function closeChat() {
    chatOpen.value = false
    closing.value = true
    setTimeout(() => { closing.value = false }, 280)
}

async function iniciar() {
    await loadConfig()
    await loadData()
    initChat()
}

async function loadConfig() {
    try {
        const res = await api.get('/chat/backend.php?action=get_chatbot_config')
        if (res.data.success && res.data.data) {
            // Solo modo IA si está activado Y hay proveedor configurado en el servidor
            modoIA.value = !!res.data.data.modo_ia && !!res.data.data.ia_disponible
        }
    } catch {
        modoIA.value = false // ante cualquier duda, modo selección (nunca se rompe)
    }
}

async function loadData() {
    try {
        const [r1, r2, r3] = await Promise.all([
            api.get('/chat/backend.php?action=get_categories'),
            api.get('/chat/backend.php?action=get_all_subcategories'),
            api.get('/chat/backend.php?action=get_questions'),
        ])
        if (r1.data.success) categorias = r1.data.data || []
        if (r2.data.success) subcategorias = r2.data.data || []
        if (r3.data.success) preguntas = r3.data.data || []
        dataLoaded.value = true
    } catch {
        dataLoaded.value = true
    }
}

function scrollDown() {
    nextTick(() => {
        if (bodyRef.value) bodyRef.value.scrollTop = bodyRef.value.scrollHeight
    })
}

function escapar(s: string) {
    return s
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Convierte el texto de la IA en HTML seguro (escapa, enlaza correo/teléfono y saltos de línea)
function formatoIA(texto: string) {
    let h = escapar(texto)
    h = h.replace(/([\w.+-]+@[\w-]+\.[\w.]+)/g, '<a href="mailto:$1">$1</a>')
    h = h.replace(/(\+?\d[\d ]{7,}\d)/g, (m) => `<a href="tel:${m.replace(/\s/g, '')}">${m.trim()}</a>`)
    return h.replace(/\n/g, '<br>')
}

function botMsg(html: string) {
    mensajes.value.push({ tipo: 'bot', html })
    scrollDown()
}

function userMsg(text: string) {
    mensajes.value.push({ tipo: 'user', html: escapar(text) })
    scrollDown()
}

function showTypingThen(fn: () => void, delay = 700) {
    typing.value = true
    opciones.value = []
    scrollDown()
    setTimeout(() => {
        typing.value = false
        fn()
    }, delay)
}

function initChat() {
    if (modoIA.value) {
        botMsg('¡Hola! Soy el asistente virtual de la <strong>Escuela de Diseño y Artes Visuales</strong>. Pregúntame lo que necesites sobre la escuela: carreras, trámites, departamentos, la maestría y más.')
        opciones.value = [
            { label: '📋 Ver temas frecuentes', action: () => { userMsg('Ver temas'); showCategorias() } },
        ]
        scrollDown()
    } else {
        botMsg('¡Hola! Soy el asistente virtual de la <strong>Escuela de Diseño y Artes Visuales</strong>. Estoy aquí para ayudarte.')
        setTimeout(showCategorias, 700)
    }
}

function sendMessage() {
    const text = inputText.value.trim()
    if (!text) return
    inputText.value = ''
    userMsg(text)

    if (modoIA.value) {
        preguntarIA(text)
        return
    }

    const t = text.toLowerCase()
    const triggers = ['hola', 'ayuda', 'inicio', 'empezar', 'comenzar', 'menu', 'menú', 'volver', 'regresar', 'buenos dias', 'buenas tardes', 'buenas noches']
    if (triggers.includes(t)) {
        setTimeout(showCategorias, 500)
    } else {
        setTimeout(() => {
            botMsg('No entendí tu mensaje. Escribe <strong>hola</strong> o <strong>ayuda</strong> para ver las opciones disponibles.')
        }, 500)
    }
}

async function preguntarIA(text: string) {
    histIA.value.push({ tipo: 'user', texto: text })
    typing.value = true
    opciones.value = []
    scrollDown()
    try {
        const res = await api.post('/chat/ai.php', {
            mensaje: text,
            historial: histIA.value.slice(-6),
        })
        typing.value = false
        const respuesta = res.data?.respuesta || CONTACTO
        botMsg(formatoIA(respuesta))
        histIA.value.push({ tipo: 'bot', texto: respuesta })
    } catch {
        typing.value = false
        botMsg(formatoIA(CONTACTO)) // si algo falla, nunca se rompe: damos el contacto
    }
}

function showCategorias() {
    selectedCatId.value = null
    showTypingThen(() => {
        botMsg('¿Sobre qué tema tienes una pregunta?')
        if (!categorias.length) {
            opciones.value = []
            botMsg(dataLoaded.value
                ? 'Sin categorías disponibles en este momento.'
                : 'Cargando información, intenta de nuevo en unos segundos...')
            return
        }
        opciones.value = categorias.map((c) => ({
            label: c.nombre,
            action: () => selCat(c.id, c.nombre),
        }))
        scrollDown()
    })
}

function selCat(catId: number, catNombre: string) {
    selectedCatId.value = catId
    userMsg(catNombre)
    showTypingThen(() => {
        const subs = subcategorias.filter((s) => s.categoria_id == catId)
        if (!subs.length) {
            opciones.value = []
            botMsg('No hay subcategorías disponibles en esta categoría. Escribe <strong>menú</strong> para volver.')
            return
        }
        botMsg('Elige un subtema:')
        opciones.value = [
            ...subs.map((s) => ({ label: s.nombre, action: () => selSub(s.id, s.nombre) })),
            { label: '← Volver a categorías', action: showCategorias, back: true },
        ]
        scrollDown()
    })
}

function selSub(subId: number, subNombre: string) {
    userMsg(subNombre)
    showTypingThen(() => {
        const pregs = preguntas.filter((p) => p.subcategoria_id == subId)
        if (!pregs.length) {
            opciones.value = []
            botMsg('No hay preguntas disponibles en esta sección. Escribe <strong>menú</strong> para volver.')
            return
        }
        botMsg('Selecciona tu pregunta:')
        opciones.value = [
            ...pregs.map((p) => ({ label: p.pregunta, action: () => showResp(p.pregunta, p.respuesta) })),
            { label: '← Volver a subtemas', action: () => { userMsg('Volver'); selCat(selectedCatId.value!, '') }, back: true },
        ]
        scrollDown()
    })
}

function showResp(pregunta: string, respuesta: string) {
    userMsg(pregunta)
    showTypingThen(() => {
        botMsg(respuesta && respuesta.trim()
            ? respuesta
            : 'Aún no tengo respuesta para esta pregunta. Te recomiendo contactar directamente a la escuela.')

        setTimeout(() => {
            botMsg('¿Necesitas algo más?')
            opciones.value = [
                { label: 'Hacer otra pregunta', action: () => { userMsg('Otra pregunta'); selCat(selectedCatId.value!, '') } },
                { label: '🏠 Volver al menú principal', action: () => { userMsg('Menú principal'); showCategorias() } },
            ]
            scrollDown()
        }, 800)
    }, 800)
}
</script>

<style scoped>
/* --- Botón flotante (FAB) --- */
.chat-fab {
    position: fixed;
    bottom: 28px;
    right: 28px;
    width: 58px;
    height: 58px;
    background: linear-gradient(135deg, #1f29b7 0%, #0d1480 100%);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 18px rgba(31, 41, 183, 0.5);
    transition: transform 0.2s, box-shadow 0.2s;
    z-index: 9000;
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    animation: chatFabPulse 3s infinite;
}

.chat-fab:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 24px rgba(31, 41, 183, 0.65);
    animation: none;
}

.chat-fab svg {
    width: 28px;
    height: 28px;
    fill: white;
}

.chat-fab-badge {
    position: absolute;
    top: -4px;
    right: -4px;
    width: 20px;
    height: 20px;
    background: #fed501;
    border-radius: 50%;
    border: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 11px;
    font-weight: 700;
    color: #1f29b7;
    line-height: 1;
}

@keyframes chatFabPulse {

    0%,
    100% {
        box-shadow: 0 4px 18px rgba(31, 41, 183, 0.5);
    }

    50% {
        box-shadow: 0 4px 28px rgba(31, 41, 183, 0.65), 0 0 0 10px rgba(31, 41, 183, 0.08);
    }
}

/* --- Ventana del chat --- */
.chat-widget-window {
    position: fixed;
    bottom: 100px;
    right: 28px;
    width: 370px;
    height: 540px;
    background: white;
    border-radius: 18px;
    box-shadow: 0 10px 45px rgba(0, 0, 0, 0.22);
    display: none;
    flex-direction: column;
    overflow: hidden;
    z-index: 9000;
}

.chat-widget-window.open {
    display: flex;
    animation: chatWindowOpen 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes chatWindowOpen {
    from {
        opacity: 0;
        transform: translateY(20px) scale(0.92);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* --- Header --- */
.chat-widget-header {
    background: linear-gradient(135deg, #1f29b7 0%, #0d1480 100%);
    padding: 14px 16px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 3px solid #fed501;
    flex-shrink: 0;
}

.chat-header-left {
    display: flex;
    align-items: center;
    gap: 10px;
}

.chat-header-avatar {
    width: 40px;
    height: 40px;
    background: #fed501;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    flex-shrink: 0;
}

.chat-header-info h4 {
    font-size: 14px;
    font-weight: 700;
    margin: 0 0 2px;
}

.chat-header-info p {
    font-size: 11px;
    opacity: 0.8;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 5px;
}

.chat-online-dot {
    width: 7px;
    height: 7px;
    background: #4cff91;
    border-radius: 50%;
    display: inline-block;
    flex-shrink: 0;
}

.chat-close-btn {
    background: none;
    border: none;
    color: white;
    font-size: 22px;
    cursor: pointer;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
    line-height: 1;
}

.chat-close-btn:hover {
    background: rgba(255, 255, 255, 0.2);
}

/* --- Body --- */
.chat-widget-body {
    flex: 1;
    overflow-y: auto;
    padding: 14px;
    background: #edf0f8;
    scroll-behavior: smooth;
}

.chat-widget-body::-webkit-scrollbar {
    width: 4px;
}

.chat-widget-body::-webkit-scrollbar-track {
    background: transparent;
}

.chat-widget-body::-webkit-scrollbar-thumb {
    background: #c5cef8;
    border-radius: 4px;
}

/* --- Mensajes --- */
.chat-msg {
    margin-bottom: 10px;
    padding: 11px 14px;
    border-radius: 12px;
    max-width: 84%;
    font-size: 13.5px;
    line-height: 1.55;
    animation: chatMsgIn 0.22s ease;
    word-wrap: break-word;
}

@keyframes chatMsgIn {
    from {
        opacity: 0;
        transform: translateY(7px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.chat-msg.bot {
    background: white;
    border-left: 3px solid #fed501;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
    color: #1a1a2e;
}

.chat-msg.user {
    background: #1f29b7;
    color: white;
    margin-left: auto;
    border-right: 3px solid #fed501;
}

/* --- Opciones --- */
.chat-opts-box {
    background: white;
    border-radius: 12px;
    padding: 10px;
    margin-bottom: 10px;
    animation: chatMsgIn 0.22s ease;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
    border: 1.5px solid #e0e6f8;
}

.chat-opt {
    display: block;
    width: 100%;
    padding: 9px 13px;
    margin: 4px 0;
    background: #f4f6ff;
    color: #1f29b7;
    border: 1.5px solid #d0d8f8;
    border-radius: 8px;
    cursor: pointer;
    font-size: 13px;
    transition: all 0.18s;
    text-align: left;
    font-weight: 500;
    font-family: inherit;
}

.chat-opt:hover {
    background: #1f29b7;
    color: white;
    border-color: #1f29b7;
    transform: translateX(4px);
}

.chat-opt.back-opt {
    background: #f5f5f5;
    color: #666;
    border-color: #ddd;
    margin-top: 8px;
    font-size: 12.5px;
}

.chat-opt.back-opt:hover {
    background: #555;
    color: white;
    border-color: #555;
    transform: none;
}

/* --- Typing --- */
.chat-typing-indicator {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    padding: 10px 14px;
    background: white;
    border-left: 3px solid #fed501;
    border-radius: 12px;
    margin-bottom: 10px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.07);
}

.chat-typing-indicator span {
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: #1f29b7;
    display: block;
    animation: chatDot 1.2s infinite;
}

.chat-typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
}

.chat-typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
}

@keyframes chatDot {

    0%,
    60%,
    100% {
        transform: translateY(0);
        opacity: 1;
    }

    30% {
        transform: translateY(-7px);
        opacity: 0.5;
    }
}

/* --- Footer --- */
.chat-widget-footer {
    padding: 10px 12px;
    background: #f8f9fe;
    border-top: 1.5px solid #e0e6f8;
    display: flex;
    gap: 8px;
    align-items: center;
    flex-shrink: 0;
}

.chat-widget-footer input {
    flex: 1;
    padding: 9px 13px;
    border: 1.5px solid #d0d8f0;
    border-radius: 10px;
    font-size: 13.5px;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
    background: white;
    font-family: inherit;
}

.chat-widget-footer input:focus {
    border-color: #1f29b7;
    box-shadow: 0 0 0 3px rgba(31, 41, 183, 0.09);
}

.chat-widget-footer button {
    background: #1f29b7;
    border: none;
    color: white;
    width: 38px;
    height: 38px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
    flex-shrink: 0;
}

.chat-widget-footer button:hover {
    background: #fed501;
    color: #1f29b7;
}

.chat-widget-footer button svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
}

/* --- Responsive --- */
@media (max-width: 440px) {
    .chat-widget-window {
        width: calc(100vw - 20px);
        right: 10px;
        bottom: 90px;
        height: 68vh;
        max-height: 520px;
    }

    .chat-fab {
        bottom: 20px;
        right: 20px;
        width: 52px;
        height: 52px;
    }
}
</style>