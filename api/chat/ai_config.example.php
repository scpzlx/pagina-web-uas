<?php
/* ============================================================================
 * Configuración de los proveedores de IA del asistente.
 *
 * CÓMO USAR ESTE ARCHIVO:
 *   1. Copia este archivo en el mismo directorio con el nombre  ai_config.php
 *   2. Pega tus API keys en el campo 'api_key' de cada proveedor.
 *      Puedes dejar vacíos los que no uses; el asistente saltará automáticamente
 *      al siguiente proveedor cuando uno se quede sin tokens o falle.
 *
 * IMPORTANTE: ai_config.php NO se sube al repositorio (está en .gitignore) y el
 * servidor lo bloquea (.htaccess). Las keys solo viven en el servidor.
 *
 * DÓNDE OBTENER CADA KEY (las tres tienen capa gratuita):
 *   • Cerebras → https://cloud.cerebras.ai  (Sección "API Keys")
 *   • Groq     → https://console.groq.com/keys
 *   • Mistral  → https://console.mistral.ai/api-keys
 *
 * El ORDEN del arreglo es la prioridad de uso: se intenta el primero y, si se
 * agota o falla, se pasa al siguiente sin que el usuario lo note.
 * ==========================================================================*/

return [
    // El orden del arreglo es la prioridad de uso: se intenta el primero y, si se
    // agota o falla, se pasa al siguiente sin que el usuario lo note.
    'proveedores' => [
        [
            'nombre'   => 'groq',
            'endpoint' => 'https://api.groq.com/openai/v1/chat/completions',
            'api_key'  => '', // <-- pega aquí tu key de Groq
            'model'    => 'llama-3.3-70b-versatile',
        ],
        [
            'nombre'   => 'mistral',
            'endpoint' => 'https://api.mistral.ai/v1/chat/completions',
            'api_key'  => '', // <-- pega aquí tu key de Mistral
            'model'    => 'mistral-small-latest',
        ],
        [
            'nombre'   => 'cerebras',
            'endpoint' => 'https://api.cerebras.ai/v1/chat/completions',
            'api_key'  => '', // <-- pega aquí tu key de Cerebras
            // El modelo depende de tu cuenta. Consulta los disponibles con:
            //   curl https://api.cerebras.ai/v1/models -H "Authorization: Bearer TU_KEY"
            'model'    => 'gpt-oss-120b',
        ],
    ],

    // Límite de preguntas por IP (protege contra abuso)
    'max_por_minuto' => 15,
    'max_por_dia'    => 300,

    // Minutos que se omite un proveedor tras agotarse antes de reintentarlo
    'cooldown_minutos' => 10,
];
