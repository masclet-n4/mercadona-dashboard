import { ref } from 'vue'
import { getProducts } from '@/api/products.js'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)

  const loadProducts = async (params) => {
    loading.value = true
    error.value = null

    console.log({params})
    try {
      const response = await getProducts(params)
      products.value = response.data.data
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    loading,
    error,
    loadProducts,
  }
}
