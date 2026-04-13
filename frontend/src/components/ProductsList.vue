<template>
    <div class="w-full max-w-7xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <ProductCard v-for="product in products" :key="product.id" :product="product" />
        </div>
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
