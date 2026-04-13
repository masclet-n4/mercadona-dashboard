<template>
    <div class="flex flex-col items-center gap-10">
        <!-- Buscador -->
        <div class="w-full max-w-xl mt-8">
            <div class="relative">
                <Search
                    class="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant/50 pointer-events-none"
                />
                <input
                    type="text"
                    placeholder="Busca el nombre del producto..."
                    v-model="searchQuery"
                    @input="handleSearch()"
                    class="w-full pl-14 pr-6 py-4 rounded-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/50 border border-transparent focus:border-primary/30 focus:bg-surface-container-lowest focus:outline-none focus:ring-4 focus:ring-primary/10 transition-all duration-200 shadow-sm text-base"
                />
            </div>
        </div>

        <!-- Estado: cargando (primera carga, sin productos aún) -->
        <div v-if="loading && !products?.items?.length" class="w-full max-w-7xl">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                <div
                    v-for="n in 8"
                    :key="n"
                    class="bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden animate-pulse"
                >
                    <div class="aspect-square bg-surface-container-low"></div>
                    <div class="p-4 space-y-2">
                        <div class="h-3 w-16 bg-surface-container-high rounded-full"></div>
                        <div class="h-4 w-full bg-surface-container-high rounded-md"></div>
                        <div class="h-4 w-3/4 bg-surface-container-high rounded-md"></div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Estado: resultados -->
        <div v-else-if="products?.items?.length" class="w-full">
            <div class="flex justify-end items-center gap-4 pb-4 max-w-7xl mx-auto">
                <button
                    @click="goToPage(page - 1)"
                    :disabled="page <= 1 || loading"
                    class="px-4 py-2 rounded-full bg-surface-container-low text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors"
                >
                    Anterior
                </button>
                <span class="text-on-surface-variant flex items-center gap-2">
                    <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                    Página {{ page }} de {{ totalPages }}
                </span>
                <button
                    @click="goToPage(page + 1)"
                    :disabled="page >= totalPages || loading"
                    class="px-4 py-2 rounded-full bg-surface-container-low text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors"
                >
                    Siguiente
                </button>
            </div>

            <ProductsList :products="products.items" />

            <div class="flex justify-end items-center gap-4 pt-4 max-w-7xl mx-auto">
                <button
                    @click="goToPage(page - 1)"
                    :disabled="page <= 1 || loading"
                    class="px-4 py-2 rounded-full bg-surface-container-low text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors"
                >
                    Anterior
                </button>
                <span class="text-on-surface-variant flex items-center gap-2">
                    <Loader2 v-if="loading" class="w-4 h-4 animate-spin" />
                    Página {{ page }} de {{ totalPages }}
                </span>
                <button
                    @click="goToPage(page + 1)"
                    :disabled="page >= totalPages || loading"
                    class="px-4 py-2 rounded-full bg-surface-container-low text-on-surface disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-container-high transition-colors"
                >
                    Siguiente
                </button>
            </div>
        </div>

        <!-- Estado: sin resultados -->
        <div
            v-else-if="searchQuery && !loading"
            class="flex flex-col items-center justify-center py-20 gap-3 text-on-surface-variant"
        >
            <SearchX class="w-12 h-12 opacity-30" />
            <p class="text-lg font-display font-semibold">Sin resultados para "{{ searchQuery }}"</p>
            <p class="text-sm opacity-60">Prueba con otro término de búsqueda.</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useDebounceFn } from "@vueuse/core";
import { useProducts } from "@/composables/useProducts";
import { Search, SearchX, Loader2 } from "lucide-vue-next";
import ProductsList from "@/components/ProductsList.vue";

const searchQuery = ref("");
const { products, page, totalPages, loading, loadProducts } = useProducts();

const buildParams = (newPage = 1) => {
    const params = { page: newPage };
    if (searchQuery.value.length > 3) {
        params.filter = searchQuery.value;
    }
    return params;
};

onMounted(() => {
    loadProducts();
});

const handleSearch = useDebounceFn(() => {
    loadProducts(buildParams(1));
}, 500);

const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages.value && !loading.value) {
        loadProducts(buildParams(newPage));
    }
};
</script>
