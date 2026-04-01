<template>
    <div class="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <ProductCard 
            v-for="product in products" 
            :key="product.id" 
            :product="product" 
        />
    </div>
</template>

<script setup>
import ProductCard from "./ProductCard.vue";

defineProps({
    products: {
        type: Array,
        required: true,
    },
});
</script>
