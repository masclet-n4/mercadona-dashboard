<template>
    <div v-if="product" class="w-full max-w-5xl mx-auto pb-16 space-y-5">
        <!-- Hero: imagen + info principal -->
        <div class="flex flex-col md:flex-row gap-8 mt-2">
            <!-- Imagen -->
            <div class="md:w-5/12 shrink-0">
                <ProductDetailsImages :product="product" />
            </div>

            <!-- Info -->
            <div class="flex-1 flex flex-col justify-start space-y-4 py-2">
                <!-- Marca + categoría -->
                <div class="flex items-center gap-2 flex-wrap">
                    <span
                        class="text-xs font-bold text-primary uppercase tracking-widest bg-primary/8 px-3 py-1 rounded-full"
                    >
                        {{ product.marca }}
                    </span>
                    <span class="text-on-surface-variant/40 text-xs">·</span>
                    <span class="text-xs text-on-surface-variant">{{ product.categoria_raiz }}</span>
                </div>

                <!-- Título -->
                <h1 class="font-display text-2xl md:text-3xl font-bold text-on-surface leading-tight">
                    {{ product.details?.details?.legal_name || product.nombre }}
                </h1>

                <!-- Descripción -->
                <div
                    v-if="product.details?.details?.description"
                    class="p-4 bg-surface-container-low rounded-2xl border border-outline-variant/20"
                >
                    <p class="text-sm text-on-surface leading-relaxed">
                        {{ product.details.details.description }}
                    </p>
                </div>

                <!-- Precio si disponible -->
                <div v-if="product.precio" class="flex items-baseline gap-1 pt-1">
                    <span class="font-display text-3xl font-bold text-primary">
                        {{ product.precio }}
                    </span>
                    <span class="text-sm text-on-surface-variant">€</span>
                </div>
            </div>
        </div>

        <!-- Grid de detalles -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Uso y conservación -->
            <div class="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-4">
                <h2 class="font-display text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Uso y Conservación
                </h2>

                <div
                    v-if="
                        product.details?.details?.usage_instructions || product.details?.details?.storage_instructions
                    "
                    class="space-y-4 text-sm"
                >
                    <div v-if="product.details?.details?.usage_instructions">
                        <span class="font-semibold text-on-surface-variant block mb-1">Instrucciones</span>
                        <p class="text-on-surface leading-relaxed">
                            {{ product.details.details.usage_instructions }}
                        </p>
                    </div>

                    <div
                        v-if="product.details?.details?.storage_instructions"
                        class="pt-4 border-t border-outline-variant/20"
                    >
                        <span class="font-semibold text-on-surface-variant block mb-1">Conservación</span>
                        <p class="text-on-surface leading-relaxed">
                            {{ product.details.details.storage_instructions }}
                        </p>
                    </div>
                </div>

                <p v-else class="text-sm text-on-surface-variant/50 italic">Sin información disponible.</p>
            </div>

            <!-- Especificaciones -->
            <div class="p-5 bg-surface-container-low rounded-2xl border border-outline-variant/20 space-y-4">
                <h2 class="font-display text-xs font-bold uppercase tracking-widest text-on-surface-variant">
                    Especificaciones
                </h2>

                <div class="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
                    <div>
                        <span class="text-xs text-on-surface-variant block mb-0.5">Formato</span>
                        <p class="font-medium text-on-surface">{{ product.details?.packaging || "—" }}</p>
                    </div>
                    <div>
                        <span class="text-xs text-on-surface-variant block mb-0.5">Origen</span>
                        <p class="font-medium text-on-surface">{{ product.details?.origin || "—" }}</p>
                    </div>
                    <div class="col-span-2 pt-3 border-t border-outline-variant/20">
                        <span class="text-xs text-on-surface-variant block mb-1.5">Identificadores</span>
                        <p class="text-xs font-mono text-on-surface">EAN: {{ product.ean || "—" }}</p>
                        <p class="text-xs font-mono text-on-surface mt-0.5">
                            Mercadona ID: {{ product.id_mercadona || "—" }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Composición -->
        <div
            v-if="
                product.details?.nutrition_information?.ingredients || product.details?.nutrition_information?.allergens
            "
            class="p-5 bg-surface-container-low rounded-2xl border-l-4 border-primary space-y-4"
        >
            <h2 class="font-display text-base font-bold text-on-surface">Composición</h2>

            <div v-if="product.details?.nutrition_information?.ingredients" class="space-y-1.5">
                <h3 class="text-xs font-bold text-on-surface-variant uppercase tracking-widest">Ingredientes</h3>
                <p
                    class="text-sm text-on-surface leading-relaxed"
                    v-html="product.details.nutrition_information.ingredients"
                />
            </div>

            <div
                v-if="product.details?.nutrition_information?.allergens"
                class="pt-4 border-t border-outline-variant/20 space-y-1.5"
            >
                <h3
                    class="text-xs font-bold text-red-500 dark:text-red-400 uppercase tracking-widest flex items-center gap-1.5"
                >
                    <AlertTriangle class="w-3.5 h-3.5" />
                    Alérgenos críticos
                </h3>
                <p
                    class="text-sm text-on-surface leading-relaxed"
                    v-html="product.details.nutrition_information.allergens"
                />
            </div>
        </div>

        <!-- Histórico de precios -->
        <PriceHistory :productId="product.id" />
    </div>

    <!-- ── Estado de carga ─────────────────────────────── -->
    <div v-else-if="loading" class="w-full max-w-5xl mx-auto pb-16 space-y-5 mt-2">
        <div class="flex flex-col md:flex-row gap-8">
            <div class="md:w-5/12 shrink-0">
                <div class="aspect-square rounded-3xl bg-surface-container-low animate-pulse" />
            </div>
            <div class="flex-1 py-2 space-y-4">
                <div class="h-5 w-28 bg-surface-container-low rounded-full animate-pulse" />
                <div class="h-9 w-3/4 bg-surface-container-low rounded-xl animate-pulse" />
                <div class="h-5 w-1/2 bg-surface-container-low rounded-xl animate-pulse" />
                <div class="h-24 w-full bg-surface-container-low rounded-2xl animate-pulse" />
            </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div class="h-44 bg-surface-container-low rounded-2xl animate-pulse" />
            <div class="h-44 bg-surface-container-low rounded-2xl animate-pulse" />
        </div>
        <div class="h-44 w-full bg-surface-container-low rounded-2xl animate-pulse" />
    </div>

    <!-- ── Estado de error ────────────────────────────── -->
    <div v-else class="flex flex-col items-center justify-center py-32 gap-3 text-on-surface-variant">
        <div class="text-5xl mb-2">📦</div>
        <p class="font-display text-xl font-semibold text-on-surface">Producto no encontrado</p>
        <p class="text-sm text-on-surface-variant/60 text-center max-w-xs">
            Puede que haya sido eliminado o no esté disponible en este momento.
        </p>
        <button
            @click="$router.back()"
            class="mt-3 flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary/75 transition-colors"
        >
            <ArrowLeft class="w-4 h-4" />
            Volver atrás
        </button>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductsStore } from "@/stores/products";
import { AlertTriangle, ArrowLeft } from "lucide-vue-next";

import ProductDetailsImages from "@/components/ProductDetailsImages.vue";
import PriceHistory from "@/components/PriceHistory.vue";

const route = useRoute();
const { getProduct } = useProductsStore();

const product = ref(null);
const loading = ref(true);

onMounted(async () => {
    product.value = await getProduct(route.params.id);
    loading.value = false;
});
</script>
