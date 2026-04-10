import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useProductsStore = defineStore('products', () => {
  const products = ref({})

  const getProduct = (slug) => {
    console.log(products[slug])
    return products[slug] || null
  }

  const setProducts = (items) => {
    items?.forEach((product) => {
      if (product.slug) {
        products[product.slug] = product
      }
    })
  }

  const setProduct = (product) => {
    if (product?.slug) {
      products.value[product.slug] = product
    }
  }

  return {
    products,
    getProduct,
    setProducts,
    setProduct,
  }
})
