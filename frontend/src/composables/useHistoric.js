import { ref } from 'vue'
import { getHistoric } from '@/api/historic.js'
import { useHistoricStore } from '@/stores/historic.js'

export function useHistoric() {
  const historic = ref([])
  const loading = ref(false)
  const error = ref(null)
  const historicStore = useHistoricStore()

  const loadHistoric = async (id,start,end) => {
    loading.value = true
    error.value = null
    try {
      const response = await getHistoric({id, start, end})
      historic.value = response.data.data
      historicStore.setHistoric(response.data.data)
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  return {
    historic,
    loading,
    error,
    loadHistoric,
  }
}
