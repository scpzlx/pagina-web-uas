// ============================================================================
// Generador de la base de conocimiento del asistente.
//
// Recorre las vistas informativas del sitio (src/views) y extrae el texto
// legible —tanto del <template> como de los datos del <script>— para volcarlo
// en api/chat/knowledge_base.json. El asistente solo puede responder con lo que
// haya en ese archivo, así que esta es la "memoria" de la página.
//
// Uso:   node scripts/build-kb.mjs
// Vuelve a ejecutarlo cada vez que cambies el contenido de las páginas.
// ============================================================================

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve, relative, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const VIEWS_DIR = resolve(__dirname, '../src/views')
const OUT_FILE = resolve(__dirname, '../../api/chat/knowledge_base.json')

// Páginas dinámicas (su contenido vive en la base de datos, no en el .vue)
const SKIP_FILES = new Set(['NotFoundView.vue', 'DirectorioView.vue'])
const SKIP_DIRS = new Set(['difusion'])

// ─── Utilidades ─────────────────────────────────────────────────────────────
function walk(dir) {
    const out = []
    for (const name of readdirSync(dir)) {
        const full = join(dir, name)
        const st = statSync(full)
        if (st.isDirectory()) {
            if (SKIP_DIRS.has(name)) continue
            out.push(...walk(full))
        } else if (name.endsWith('.vue') && !SKIP_FILES.has(name)) {
            out.push(full)
        }
    }
    return out
}

function decodeEntities(s) {
    return s
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&aacute;/g, 'á').replace(/&eacute;/g, 'é').replace(/&iacute;/g, 'í')
        .replace(/&oacute;/g, 'ó').replace(/&uacute;/g, 'ú').replace(/&ntilde;/g, 'ñ')
}

function clean(s) {
    return decodeEntities(s).replace(/\s+/g, ' ').trim()
}

// Saca el primer bloque <tag>...</tag>
function blockOf(src, tag) {
    const m = src.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, 'i'))
    return m ? m[1] : ''
}

// Texto legible del <template>: quita comentarios, interpolaciones y etiquetas
function templateText(tpl) {
    return clean(
        tpl
            .replace(/<!--[\s\S]*?-->/g, ' ')
            .replace(/<(script|style)[\s\S]*?<\/\1>/gi, ' ')
            .replace(/\{\{[\s\S]*?\}\}/g, ' ') // {{ interpolaciones }}
            .replace(/<[^>]+>/g, ' '),         // etiquetas
    )
}

// ¿Una cadena del <script> parece texto de contenido (y no un id/clase/ruta)?
function looksLikeContent(v) {
    const s = v.trim()
    if (s.length < 2 || s.length > 400) return false
    if (!/[a-záéíóúñü]/i.test(s)) return false                 // sin letras → fuera
    if (/[{};]|=>|\$\{|<\/|import|require/.test(s)) return false // código
    if (/^(https?:|mailto:|tel:|data:|#|\/|\.\/)/i.test(s)) return false
    if (/\.(png|jpe?g|svg|webp|gif|mp4|webm|ts|js|vue|css|json)\b/i.test(s)) return false
    const tieneEspacio = /\s/.test(s)
    if (!tieneEspacio) {
        // Cadena de una sola palabra: solo se acepta si parece nombre propio
        // (todo letras y con alguna mayúscula). Así descartamos ids, iconos y clases.
        if (!/^[\p{L}]+$/u.test(s)) return false
        if (!/[A-ZÁÉÍÓÚÑ]/.test(s)) return false
    }
    return true
}

// Texto de contenido del <script>: literales de cadena que parecen frases
function scriptText(script) {
    const found = []
    const seen = new Set()
    const re = /'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"|`((?:[^`\\]|\\.)*)`/g
    let m
    while ((m = re.exec(script)) !== null) {
        const raw = (m[1] ?? m[2] ?? m[3] ?? '').replace(/\\(['"`])/g, '$1')
        const v = clean(raw)
        if (looksLikeContent(v) && !seen.has(v)) {
            seen.add(v)
            found.push(v)
        }
    }
    return found.join('. ')
}

function tituloDe(tpl, file) {
    const h1 = tpl.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)
    if (h1) {
        const t = templateText(h1[1])
        if (t && t.length <= 120) return t
    }
    // Fallback: nombre de archivo → "MusicaPopularView" → "Musica Popular"
    return basename(file, '.vue')
        .replace(/View$/, '')
        .replace(/([a-z])([A-Z])/g, '$1 $2')
        .trim()
}

// ─── Generación ─────────────────────────────────────────────────────────────
const secciones = []

// Secciones fijas (identidad y contacto institucional)
secciones.push({
    id: 'identidad',
    titulo: 'Escuela de Diseño y Artes Visuales (EDAV) — UAS',
    texto: 'La Escuela de Diseño y Artes Visuales (EDAV) forma parte de la Universidad Autónoma de Sinaloa (UAS). Es una institución pública de educación superior enfocada en el arte, el diseño y las artes visuales.',
})
secciones.push({
    id: 'contacto',
    titulo: 'Contacto de la escuela',
    texto: 'Teléfono de contacto: +52 667 758 1400. Correo electrónico: sau.uas@uas.edu.mx. Universidad Autónoma de Sinaloa. Domicilio: Blvd. Francisco Labastida Ochoa, Tres Ríos, Culiacán, Sinaloa, C.P. 80020.',
})

const carrerasTitulos = []
const posgradoTitulos = []

for (const file of walk(VIEWS_DIR)) {
    const src = readFileSync(file, 'utf8')
    const tpl = blockOf(src, 'template')
    const scr = blockOf(src, 'script')

    const partes = [templateText(tpl), scriptText(scr)].filter(Boolean)
    let texto = clean(partes.join('. '))
    if (texto.length < 25) continue // página sin contenido textual útil
    if (texto.length > 6000) texto = texto.slice(0, 6000)

    const id = relative(VIEWS_DIR, file).replace(/\\/g, '/').replace(/\.vue$/, '')
    const titulo = tituloDe(tpl, file)

    if (id.startsWith('carreras/')) carrerasTitulos.push(titulo)
    if (id.startsWith('posgrado/')) posgradoTitulos.push(titulo)

    secciones.push({ id, titulo, texto })
}

// Sección sintética con la oferta completa (para preguntas generales tipo
// "¿qué carreras ofrecen?", que de otro modo solo verían algunas secciones)
if (carrerasTitulos.length || posgradoTitulos.length) {
    let texto = 'Oferta académica de la Escuela de Diseño y Artes Visuales (EDAV) de la UAS.'
    if (carrerasTitulos.length)
        texto += ' Carreras de licenciatura que ofrece la escuela: ' + carrerasTitulos.join('; ') + '.'
    if (posgradoTitulos.length)
        texto += ' Estudios de posgrado: ' + posgradoTitulos.join('; ') + '.'
    secciones.push({
        id: 'oferta-academica',
        titulo: 'Oferta académica: carreras y posgrados que ofrece la escuela',
        texto,
    })
}

mkdirSync(dirname(OUT_FILE), { recursive: true })
writeFileSync(OUT_FILE, JSON.stringify(secciones, null, 2), 'utf8')

console.log(`Base de conocimiento generada: ${secciones.length} secciones`)
console.log(`Archivo: ${OUT_FILE}`)
