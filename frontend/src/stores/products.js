import { getProductById } from '@/api/products'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref({})

  const getProduct = async (id) => {
    if (products[id]) return products[id]

    const res = await getProductById(id)
    products[id] = res.data.data

    return products[id];
  }

  const setProducts = (items) => {
    items?.forEach((product) => {
      if (product.id) {
        products[product.id] = product
      }
    })
  }

  const setProduct = (product) => {
    if (product?.id) {
      products.value[product.id] = product
    }
  }

  return {
    products,
    getProduct,
    setProducts,
    setProduct,
  }
})
