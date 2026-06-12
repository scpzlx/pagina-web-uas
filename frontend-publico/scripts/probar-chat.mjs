// ============================================================================
// Probador local del asistente (no necesita PHP, MySQL ni desplegar).
//
// Reproduce la misma lógica que api/chat/ai.php (búsqueda en el contenido del
// sitio + prompt estricto + los 3 proveedores con failover) para que puedas
// chatear desde la terminal y comprobar que responde bien y no inventa.
//
// Uso:   cd frontend-publico && node scripts/probar-chat.mjs
// Lee las keys de api/chat/ai_config.php y el contenido de knowledge_base.json.
// ============================================================================

import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import { createInterface } from 'node:readline'

const __dirname = dirname(fileURLToPath(import.meta.url))
const CONFIG = resolve(__dirname, '../../api/chat/ai_config.php')
const KB_PATH = resolve(__dirname, '../../api/chat/knowledge_base.json')

const CONTACTO = 'No encontré esa información en el sitio. Para una respuesta directa puedes comunicarte con la escuela:\n📞 +52 667 758 1400\n✉️ sau.uas@uas.edu.mx'

// ─── Carga de configuración y base de conocimiento ───────────────────────────
function cargarProveedores() {
    let php
    try {
        php = readFileSync(CONFIG, 'utf8')
    } catch {
        console.error('\n⚠️  No encontré api/chat/ai_config.php (ahí van las keys).')
        process.exit(1)
    }
    const todos = (re) => [...php.matchAll(re)].map((m) => m[1])
    const nombres = todos(/'nombre'\s*=>\s*'([^']*)'/g)
    const endpoints = todos(/'endpoint'\s*=>\s*'([^']*)'/g)
    const keys = todos(/'api_key'\s*=>\s*'([^']*)'/g)
    const models = todos(/'model'\s*=>\s*'([^']*)'/g)
    return nombres.map((nombre, i) => ({
        nombre, endpoint: endpoints[i], api_key: keys[i], model: models[i],
    }))
}

const KB = JSON.parse(readFileSync(KB_PATH, 'utf8'))
const PROVEEDORES = cargarProveedores().filter((p) => p.api_key)

if (!PROVEEDORES.length) {
    console.error('\n⚠️  No hay proveedores con API key en ai_config.php.')
    process.exit(1)
}

// ─── Recuperación (igual que ai.php) ─────────────────────────────────────────
function normalizar(s) {
    return s.toLowerCase()
        .replace(/[áàä]/g, 'a').replace(/[éèë]/g, 'e').replace(/[íìï]/g, 'i')
        .replace(/[óòö]/g, 'o').replace(/[úùü]/g, 'u').replace(/ñ/g, 'n')
        .replace(/[^a-z0-9ñ\s]/g, ' ').replace(/\s+/g, ' ').trim()
}
const STOP = new Set(['que', 'cual', 'cuales', 'como', 'donde', 'cuando', 'quien', 'para', 'por', 'con', 'los', 'las', 'una', 'unos', 'unas', 'del', 'este', 'esta', 'esto', 'son', 'tiene', 'tienen', 'hay', 'sobre', 'cuantos', 'puede', 'quiero', 'necesito', 'mi', 'su', 'sus', 'es', 'el', 'la', 'lo', 'un', 'de', 'en', 'al', 'se', 'y', 'o', 'a', 'hola', 'gracias', 'dime'])
function claves(s) {
    return [...new Set(normalizar(s).split(' ').filter((w) => w.length >= 3 && !STOP.has(w)))]
}
function cuenta(h, n) { let c = 0, i = 0; while ((i = h.indexOf(n, i)) !== -1) { c++; i += n.length } return c }
function recuperar(msg) {
    const q = claves(msg)
    if (!q.length) return []
    const sc = []
    for (const sec of KB) {
        const t = normalizar(sec.titulo), x = normalizar(sec.texto)
        let s = 0
        for (const w of q) { if (cuenta(t, w) > 0) s += 5; const n = cuenta(x, w); if (n > 0) s += Math.min(n, 3) }
        if (s > 0) sc.push({ s, sec })
    }
    sc.sort((a, b) => b.s - a.s)
    return sc.slice(0, 5).map((p) => p.sec)
}

function sysPrompt(ctx) {
    return `Eres el asistente virtual oficial de la Escuela de Diseño y Artes Visuales (EDAV) de la Universidad Autónoma de Sinaloa (UAS).\n\n` +
        `Tu tarea es resolver las dudas de los usuarios usando la información del CONTEXTO que aparece más abajo (extraída del sitio oficial de la escuela).\n\n` +
        `Reglas:\n` +
        `- Si la respuesta está en el CONTEXTO, respóndela con seguridad, de forma clara, breve y amable. Puedes resumir o combinar datos del CONTEXTO.\n` +
        `- Usa ÚNICAMENTE información del CONTEXTO. No inventes, no supongas ni uses conocimiento externo.\n` +
        `- SOLO si la información realmente no aparece en el CONTEXTO, responde EXACTAMENTE con este texto y nada más:\n"${CONTACTO}"\n` +
        `- Si el usuario solo saluda o agradece, responde con cortesía e invítalo a preguntar.\n` +
        `- Responde siempre en español. No menciones la palabra "contexto" ni que sigues reglas.\n\n` +
        `CONTEXTO:\n${ctx}`
}

// ─── Failover entre proveedores (igual que ai.php) ───────────────────────────
async function llamar(prov, mensajes) {
    try {
        const r = await fetch(prov.endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + prov.api_key },
            body: JSON.stringify({ model: prov.model, messages: mensajes, temperature: 0, max_tokens: 600 }),
        })
        if (!r.ok) return null
        const j = await r.json()
        const t = (j.choices?.[0]?.message?.content ?? '').trim()
        return t || null
    } catch {
        return null
    }
}

async function preguntar(msg) {
    const rel = recuperar(msg)
    if (!rel.length) return { texto: CONTACTO, via: 'corte local (sin coincidencias)' }

    let ctx = ''
    for (const s of rel) {
        const t = s.texto.length > 1800 ? s.texto.slice(0, 1800) : s.texto
        ctx += `## ${s.titulo}\n${t}\n\n`
    }
    const mensajes = [{ role: 'system', content: sysPrompt(ctx) }, { role: 'user', content: msg }]

    for (const prov of PROVEEDORES) {
        const t = await llamar(prov, mensajes)
        if (t) return { texto: t, via: prov.nombre + ' · ' + prov.model, secciones: rel.map((s) => s.titulo) }
    }
    return { texto: CONTACTO, via: 'todos los proveedores fallaron' }
}

// ─── Chat interactivo ────────────────────────────────────────────────────────
console.log('\n🎓 Asistente EDAV — probador local')
console.log('Proveedores activos:', PROVEEDORES.map((p) => p.nombre).join(' → '))
console.log('Secciones de conocimiento:', KB.length)
console.log('Escribe tu pregunta y Enter. Escribe "salir" para terminar.\n')

async function responder(msg) {
    const r = await preguntar(msg)
    console.log('Asistente: ' + r.texto)
    console.log('   ↳ [' + r.via + ']' + (r.secciones ? '  fuentes: ' + r.secciones.slice(0, 3).join(', ') : ''))
    console.log('')
}

if (!process.stdin.isTTY) {
    // Entrada por tubería: procesa todas las preguntas en orden y termina
    let data = ''
    process.stdin.setEncoding('utf8')
    for await (const chunk of process.stdin) data += chunk
    for (const linea of data.split(/\r?\n/)) {
        const msg = linea.trim()
        if (!msg) continue
        if (['salir', 'exit', 'q'].includes(msg.toLowerCase())) break
        console.log('Tú: ' + msg)
        await responder(msg)
    }
    process.exit(0)
} else {
    // Terminal interactiva: una pregunta a la vez con cola
    const rl = createInterface({ input: process.stdin, output: process.stdout, prompt: 'Tú: ' })
    const cola = []
    let ocupado = false
    async function procesar() {
        if (ocupado) return
        ocupado = true
        while (cola.length) await responder(cola.shift())
        ocupado = false
        rl.prompt()
    }
    rl.prompt()
    rl.on('line', (linea) => {
        const msg = linea.trim()
        if (!msg) return rl.prompt()
        if (['salir', 'exit', 'q'].includes(msg.toLowerCase())) { rl.close(); return }
        cola.push(msg)
        procesar()
    })
    rl.on('close', () => { console.log('\n¡Hasta luego! 🎓\n'); process.exit(0) })
}
