import { ref } from 'vue'
import { getStats } from '@/api/stats'


export function useStats() {
  const productsStats = ref({
    byPercentageChange: [],
    byPriceChange: [],
    byVariation: [],
  })
  const loading = ref(false)
  const error = ref(null)

  const loadInitialStats = async (period = 'd30') => {
    loading.value = true
    error.value = null

    try {
      const resPercentageChange = await getStats({sort: "-price_change_percentage." + period})
      productsStats.value.byPercentageChange = resPercentageChange.data.data.items

      const resPriceChange = await getStats({sort: "-count_price_changes." + period})
      productsStats.value.byPriceChange = resPriceChange.data.data.items

      const resVariation = await getStats({sort: "-variation." + period})
      productsStats.value.byVariation = resVariation.data.data.items
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  const loadStats = async (params) => {
    loading.value = true
    error.value = null

    try {
      const resPercentage = await getStats(params)
      productsStats.value = response.data.data.items
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }


  return {
    productsStats,
    loadInitialStats,
    loading,
    error,
    loadStats,
  }
}
