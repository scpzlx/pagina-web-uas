// src/composables/useTheme.ts
import { ref, watch, onMounted } from 'vue'

const STORAGE_KEY = 'edav-admin-theme'
const isDark = ref(false)

function applyTheme(dark: boolean) {
  if (dark) {
    document.documentElement.setAttribute('data-theme', 'dark')
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export function useTheme() {
  function init() {
    const stored = localStorage.getItem(STORAGE_KEY)
    isDark.value = stored === 'dark'
    applyTheme(isDark.value)
  }

  function toggle() {
    isDark.value = !isDark.value
    localStorage.setItem(STORAGE_KEY, isDark.value ? 'dark' : 'light')
    applyTheme(isDark.value)
  }

  watch(isDark, (val) => applyTheme(val))

  onMounted(() => init())

  return { isDark, toggle, init }
}