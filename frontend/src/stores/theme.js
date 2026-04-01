import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(false)

  const init = () => {
    const stored = localStorage.getItem('theme')
    if (stored) {
      isDark.value = stored === 'dark'
    } else {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    applyTheme()
  }

  const applyTheme = () => {
    document.documentElement.classList.toggle('dark', isDark.value)
    document.documentElement.classList.toggle('light', !isDark.value)
  }

  const toggle = () => {
    isDark.value = !isDark.value
    localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
    applyTheme()
  }

  const setLight = () => {
    isDark.value = false
    localStorage.setItem('theme', 'light')
    applyTheme()
  }

  const setDark = () => {
    isDark.value = true
    localStorage.setItem('theme', 'dark')
    applyTheme()
  }

  watch(isDark, applyTheme)

  return {
    isDark,
    init,
    toggle,
    setLight,
    setDark
  }
})
