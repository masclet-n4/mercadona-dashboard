import { ref } from 'vue'
import { getProducts } from '@/api/products.js'
import { useProductsStore } from '@/stores/products.js'

export function useProducts() {
  const products = ref([])
  const loading = ref(false)
  const error = ref(null)
  const productsStore = useProductsStore()

  const loadProducts = async (params) => {
    loading.value = true
    error.value = null

    try {
      const response = await getProducts(params)
      products.value = response.data.data
      productsStore.setProducts(response.data.data.items)
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
