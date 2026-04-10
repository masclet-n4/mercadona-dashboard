<template>
    <div class="flex flex-col items-center gap-8">
        <div class="w-full max-w-xl mt-8">
            <input
                type="text"
                placeholder="🔍 Busca el nombre del producto..."
                v-model="searchQuery"
                @input="handleSearch"
                class="w-full px-6 py-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:border-2 focus:border-secondary"
            />
        </div>

        <div v-if="products.items">
            <ProductsList :products="products.items" />
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useProducts } from "@/composables/useProducts";
import ProductsList from "@/components/ProductsList.vue";

const searchQuery = ref("");
const { products, loading, error, loadProducts } = useProducts();

onMounted(() => {
    loadProducts();
});
console.log(products);

const handleSearch = useDebounceFn(() => {
    if (searchQuery.value && searchQuery.value.length > 3) {
        loadProducts({ filter: searchQuery.value });
    }
}, 500);
</script>
