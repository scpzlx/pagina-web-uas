/* =====================================================
   CHAT WIDGET FLOTANTE - EDAV
   Auto-inyecta el HTML del widget en el body, conecta
   con el backend y maneja la conversación.
   Solo es necesario incluir:
     <link rel="stylesheet" href="css/chat-widget.css">
     <script src="js/chat-widget.js"></script>
   ===================================================== */
(function () {
    'use strict';

    if (window.__edavChatWidgetLoaded) return;
    window.__edavChatWidgetLoaded = true;

    const API = 'api/backend.php';
    let categorias = [], subcategorias = [], preguntas = [];
    let selectedCatId = null, chatInit = false, dataLoaded = false;

    /* -------- HTML del widget (se inyecta al cargar) -------- */
    const WIDGET_HTML = `
<button class="chat-fab" id="chatToggleBtn" type="button" title="Asistente virtual - Haz clic para abrir el chat" aria-label="Abrir chat de asistencia">
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
    </svg>
    <span class="chat-fab-badge" aria-hidden="true">?</span>
</button>

<div class="chat-widget-window" id="chatWindow" role="dialog" aria-label="Chat de asistencia EDAV" aria-modal="false">
    <div class="chat-widget-header">
        <div class="chat-header-left">
            <div class="chat-header-avatar" aria-hidden="true">&#127891;</div>
            <div class="chat-header-info">
                <h4>Asistente EDAV</h4>
                <p><span class="chat-online-dot" aria-hidden="true"></span>En linea</p>
            </div>
        </div>
        <button class="chat-close-btn" id="chatCloseBtn" type="button" title="Cerrar chat" aria-label="Cerrar chat">&times;</button>
    </div>
    <div class="chat-widget-body" id="chatBody" aria-live="polite" aria-atomic="false"></div>
    <div class="chat-widget-footer">
        <input type="text" id="chatInput" placeholder="Escribe 'hola' para comenzar..." aria-label="Escribe tu mensaje" autocomplete="off" />
        <button id="chatSendBtn" type="button" title="Enviar mensaje" aria-label="Enviar">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
        </button>
    </div>
</div>`;

    /* -------- Punto de arranque -------- */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    function init() {
        injectWidget();
        bindListeners();
        loadData();
    }

    function injectWidget() {
        // Si ya existe (alguien lo puso a mano en el HTML) no duplicamos
        if (document.getElementById('chatToggleBtn') && document.getElementById('chatWindow')) return;

        const wrap = document.createElement('div');
        wrap.id = 'edavChatWidgetRoot';
        wrap.innerHTML = WIDGET_HTML;
        document.body.appendChild(wrap);
    }

    function bindListeners() {
        const toggle = document.getElementById('chatToggleBtn');
        const close  = document.getElementById('chatCloseBtn');
        const send   = document.getElementById('chatSendBtn');
        const input  = document.getElementById('chatInput');

        if (!toggle || !close || !send || !input) {
            console.warn('Chat widget: faltan elementos del DOM, no se inicializa.');
            return;
        }

        toggle.addEventListener('click', toggleChat);
        close.addEventListener('click', closeChat);
        send.addEventListener('click', sendMessage);
        input.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') sendMessage();
        });
    }

    /* -------- Cargar datos de la API -------- */
    async function loadData() {
        try {
            const [r1, r2, r3] = await Promise.all([
                fetch(API + '?action=get_categories'),
                fetch(API + '?action=get_all_subcategories'),
                fetch(API + '?action=get_questions')
            ]);
            const [d1, d2, d3] = await Promise.all([r1.json(), r2.json(), r3.json()]);
            if (d1.success) categorias    = d1.data || [];
            if (d2.success) subcategorias = d2.data || [];
            if (d3.success) preguntas     = d3.data || [];
            dataLoaded = true;
        } catch (err) {
            console.warn('Chat: no se pudieron cargar datos', err);
        }
    }

    /* -------- Mostrar / Cerrar chat -------- */
    function toggleChat() {
        const win = document.getElementById('chatWindow');
        if (!win) return;
        if (win.classList.contains('open')) {
            closeChat();
        } else {
            win.style.display = 'flex';
            requestAnimationFrame(function () { win.classList.add('open'); });
            if (!chatInit) {
                chatInit = true;
                initChat();
            }
        }
    }

    function closeChat() {
        const win = document.getElementById('chatWindow');
        if (!win) return;
        win.classList.remove('open');
        setTimeout(function () { win.style.display = 'none'; }, 280);
    }

    function initChat() {
        botMsg('¡Hola! Soy el asistente virtual de la <strong>Escuela de Diseño y Artes Visuales</strong>. Estoy aquí para ayudarte.');
        setTimeout(showCategorias, 700);
    }

    /* -------- Enviar mensaje de texto -------- */
    function sendMessage() {
        const input = document.getElementById('chatInput');
        if (!input) return;
        const text  = input.value.trim();
        if (!text) return;
        input.value = '';
        userMsg(text);

        const t = text.toLowerCase();
        const menuTriggers = ['hola', 'ayuda', 'inicio', 'empezar', 'comenzar', 'menu', 'menú', 'volver', 'regresar', 'buenos dias', 'buenas tardes', 'buenas noches'];
        if (menuTriggers.includes(t)) {
            setTimeout(showCategorias, 500);
        } else {
            setTimeout(function () {
                botMsg('No entendí tu mensaje. Escribe <strong>hola</strong> o <strong>ayuda</strong> para ver las opciones disponibles.');
            }, 500);
        }
    }

    /* -------- Helpers de mensajes -------- */
    function userMsg(text) {
        const el = document.createElement('div');
        el.className = 'chat-msg user';
        el.textContent = text;
        const body = chatBody();
        if (body) body.appendChild(el);
        scrollDown();
    }

    function botMsg(html) {
        const el = document.createElement('div');
        el.className = 'chat-msg bot';
        el.innerHTML = html;
        const body = chatBody();
        if (body) body.appendChild(el);
        scrollDown();
    }

    function showTyping() {
        const el = document.createElement('div');
        el.className = 'chat-typing-indicator';
        el.id = 'chatTyping';
        el.innerHTML = '<span></span><span></span><span></span>';
        const body = chatBody();
        if (body) body.appendChild(el);
        scrollDown();
    }

    function removeTyping() {
        const t = document.getElementById('chatTyping');
        if (t) t.remove();
    }

    function addOptsBox(buildFn) {
        const box = document.createElement('div');
        box.className = 'chat-opts-box';
        buildFn(box);
        const body = chatBody();
        if (body) body.appendChild(box);
        scrollDown();
    }

    function makeOptBtn(label, onClick, isBack) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chat-opt' + (isBack ? ' back-opt' : '');
        btn.innerHTML = label;
        btn.onclick = onClick;
        return btn;
    }

    function chatBody() { return document.getElementById('chatBody'); }
    function scrollDown() {
        const b = chatBody();
        if (b) b.scrollTop = b.scrollHeight;
    }

    /* -------- Flujo del chat -------- */
    function showCategorias() {
        selectedCatId = null;
        showTyping();
        setTimeout(function () {
            removeTyping();
            botMsg('¿Sobre qué tema tienes una pregunta?');
            addOptsBox(function (box) {
                if (!categorias.length) {
                    box.innerHTML = '<p style="color:#666;font-size:13px;text-align:center;padding:6px;margin:0">' +
                        (dataLoaded
                            ? 'Sin categorías disponibles en este momento.'
                            : 'Cargando información, intenta de nuevo en unos segundos...') +
                        '</p>';
                    return;
                }
                categorias.forEach(function (c) {
                    box.appendChild(makeOptBtn(c.nombre, function () { selCat(c.id, c.nombre); }));
                });
            });
        }, 700);
    }

    function selCat(catId, catNombre) {
        selectedCatId = catId;
        userMsg(catNombre);
        showTyping();
        setTimeout(function () {
            removeTyping();
            const subs = subcategorias.filter(function (s) { return s.categoria_id == catId; });
            if (!subs.length) {
                botMsg('No hay subcategorías disponibles en esta categoría. Escribe <strong>menú</strong> para volver.');
                return;
            }
            botMsg('Elige un subtema:');
            addOptsBox(function (box) {
                subs.forEach(function (s) {
                    box.appendChild(makeOptBtn(s.nombre, function () { selSub(s.id, s.nombre); }));
                });
                box.appendChild(makeOptBtn('<i class="fas fa-arrow-left"></i> Volver a categorías', showCategorias, true));
            });
        }, 700);
    }

    function selSub(subId, subNombre) {
        userMsg(subNombre);
        showTyping();
        setTimeout(function () {
            removeTyping();
            const pregs = preguntas.filter(function (p) { return p.subcategoria_id == subId; });
            if (!pregs.length) {
                botMsg('No hay preguntas disponibles en esta sección. Escribe <strong>menú</strong> para volver.');
                return;
            }
            botMsg('Selecciona tu pregunta:');
            addOptsBox(function (box) {
                pregs.forEach(function (p) {
                    box.appendChild(makeOptBtn(p.pregunta, function () { showResp(p.pregunta, p.respuesta); }));
                });
                box.appendChild(makeOptBtn('<i class="fas fa-arrow-left"></i> Volver a subtemas', function () {
                    userMsg('Volver');
                    selCat(selectedCatId, '');
                }, true));
            });
        }, 700);
    }

    function showResp(pregunta, respuesta) {
        userMsg(pregunta);
        showTyping();
        setTimeout(function () {
            removeTyping();
            if (!respuesta || !respuesta.trim()) {
                botMsg('Aún no tengo respuesta para esta pregunta. Te recomiendo contactar directamente a la escuela.');
            } else {
                botMsg(respuesta);
            }
            setTimeout(function () {
                botMsg('¿Necesitas algo más?');
                addOptsBox(function (box) {
                    box.appendChild(makeOptBtn('Hacer otra pregunta', function () {
                        userMsg('Otra pregunta');
                        selCat(selectedCatId, '');
                    }));
                    box.appendChild(makeOptBtn('<i class="fas fa-home"></i> Volver al menú principal', function () {
                        userMsg('Menú principal');
                        showCategorias();
                    }));
                });
            }, 800);
        }, 800);
    }

})();
