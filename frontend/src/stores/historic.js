import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHistoricStore = defineStore('historic', () => {
  const historic = ref({})

  const getHistoric = () => {
    return historic.value
  }

  const setHistoric = (hist) => {
    historic.value = hist
  }

  return {
    historic,
    getHistoric,
    setHistoric,
  }
})
