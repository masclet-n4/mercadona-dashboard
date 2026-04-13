import { ref, computed } from 'vue'
import { getProducts, getProductById } from '@/api/products.js'
import { useProductsStore } from '@/stores/products.js'

export function useProducts() {
  const products = ref({ items: [] })
  const page = ref(1)
  const totalPages = ref(1)
  const loading = ref(false)
  const error = ref(null)
  const productsStore = useProductsStore()

  const loadProducts = async (params) => {
    loading.value = true
    error.value = null

    try {
      const response = await getProducts(params)
      products.value = response.data.data
      productsStore.setProducts(response.data.data.items || [])
      page.value = response.data.data.page || 1
      totalPages.value = response.data.data.totalPages || 1
    } catch (err) {
      error.value = err.message || 'Error al cargar productos'
    } finally {
      loading.value = false
    }
  }

  const loadProduct = async (id) => {
    loading.value = true
    error.value = null

    try {
      const response = await getProductById(id)
      products.value = response.data.data
      console.log(response.data.data)
      productsStore.setProduct(response.data.data)
    } catch (err) {
      error.value = err.message || 'Error al cargar producto'
    } finally {
      loading.value = false
    }
  }

  return {
    products,
    page,
    totalPages,
    loading,
    error,
    loadProducts,
    loadProduct,
  }
}
