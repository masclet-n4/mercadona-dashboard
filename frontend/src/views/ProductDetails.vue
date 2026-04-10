<template>
    <div v-if="product" class="w-full max-w-8/12 mx-auto pb-10">
        <div class="flex w-full gap-4">
            <div class="w-3/4">
                <ProductDetailsImages :product="product" />
            </div>
            <div class="w-3/4">
                <div class="mt-6">
                    <div class="flex items-center gap-3 mt-2 text-on-surface-variant">
                        <span class="font-medium px-2 py-0.5 bg-surface-container rounded-md">{{ product.marca }}</span>
                        <span class="text-outline-variant">|</span>
                        <span>{{ product.categoria_raiz }}</span>
                    </div>
                    <h1 class="text-2xl md:text-3xl font-bold text-on-surface leading-tight">
                        {{ product.details?.details?.legal_name || product.nombre }}
                    </h1>
                    <div
                        v-if="product.details?.details?.description"
                        class="mt-6 p-4 bg-surface-container-low rounded-xl"
                    >
                        <p class="text-on-surface leading-relaxed">
                            {{ product.details?.details?.description }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div class="p-4 bg-surface-container-low rounded-xl">
                <h2 class="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                    Uso y Conservación
                </h2>
                <div class="space-y-3 text-sm">
                    <div v-if="product.details?.details?.usage_instructions">
                        <span class="text-on-surface-variant font-medium block mb-1">Instrucciones:</span>
                        <p class="text-on-surface">{{ product.details.details.usage_instructions }}</p>
                    </div>
                    <div v-if="product.details?.details?.storage_instructions">
                        <span class="text-on-surface-variant font-medium block mb-1">Conservación:</span>
                        <p class="text-on-surface">{{ product.details.details.storage_instructions }}</p>
                    </div>
                </div>
            </div>

            <div class="p-4 bg-surface-container-low rounded-xl">
                <h2 class="text-sm font-bold uppercase tracking-wider text-on-surface-variant mb-3">
                    Especificaciones
                </h2>
                <div class="grid grid-cols-2 gap-4 text-sm">
                    <div>
                        <span class="text-on-surface-variant block">Formato:</span>
                        <p class="text-on-surface font-medium">{{ product.details?.packaging || "-" }}</p>
                    </div>
                    <div>
                        <span class="text-on-surface-variant block">Origen:</span>
                        <p class="text-on-surface font-medium">{{ product.details?.origin || "-" }}</p>
                    </div>
                    <div class="col-span-2">
                        <span class="text-on-surface-variant block border-t border-outline-variant mt-1 pt-1"
                            >Identificadores:</span
                        >
                        <p class="text-on-surface text-xs mt-1">
                            EAN: <span class="font-mono">{{ product.ean }}</span>
                        </p>
                        <p class="text-on-surface text-xs">Mercadona ID: {{ product.id_mercadona }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-4 p-4 bg-surface-container-low rounded-xl border-l-4 border-primary">
            <h2 class="text-lg font-semibold text-on-surface mb-2">Composición</h2>
            <div class="space-y-4">
                <div v-if="product.details?.nutrition_information?.ingredients">
                    <h3 class="text-xs font-bold text-on-surface-variant uppercase">Ingredientes</h3>
                    <p
                        class="text-sm text-on-surface leading-snug"
                        v-html="product.details?.nutrition_information?.ingredients"
                    ></p>
                </div>
                <div v-if="product.details?.nutrition_information?.allergens">
                    <h3 class="text-xs font-bold text-error uppercase">Alérgenos críticos</h3>
                    <p
                        class="text-sm text-on-surface leading-snug"
                        v-html="product.details?.nutrition_information?.allergens"
                    ></p>
                </div>
            </div>
        </div>
    </div>

    <div v-else-if="loading" class="flex flex-col items-center justify-center py-24 gap-4">
        <div class="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
        <p class="text-on-surface-variant animate-pulse">Cargando producto...</p>
    </div>

    <div v-else class="flex flex-col items-center justify-center py-24 text-on-surface-variant">
        <span class="material-symbols-outlined text-6xl mb-4 text-outline">inventory_2</span>
        <p class="text-xl font-medium">No pudimos encontrar este producto</p>
        <button @click="$router.back()" class="mt-4 text-primary font-medium">Volver atrás</button>
    </div>
</template>

<style scoped>
/* Para ocultar la barra de scroll pero mantener la funcionalidad */
.scrollbar-hide::-webkit-scrollbar {
    display: none;
}
.scrollbar-hide {
    -ms-overflow-style: none;
    scrollbar-width: none;
}
</style>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { Pagination, Navigation } from "swiper/modules";
import { useProductsStore } from "@/stores/products";

import ProductDetailsImages from "@/components/ProductDetailsImages.vue";

const route = useRoute();
const productsStore = useProductsStore();
const swiperContainer = ref(null);
const loading = ref(true);

const product = productsStore.getProduct(route.params.slug);

const getPhotos = () => {
    console.log(product.details.photos, !product.details?.photos?.length);
    if (!product.details?.photos?.length) {
        return [{ regular: product.imagen || "" }];
    }
    return product.details.photos;
};
console.log(getPhotos());
</script>
