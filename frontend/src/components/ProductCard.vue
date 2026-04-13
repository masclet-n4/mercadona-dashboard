<template>
    <div
        class="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden hover:border-primary/25 transition-all duration-300 cursor-pointer flex flex-col"
        @click="push(`/product/${product.id}`)"
    >
        <!-- Imagen -->
        <div
            class="m-3 rounded-xl overflow-hidden bg-surface-container-low aspect-square flex items-center justify-center"
        >
            <img
                v-if="product.imagen"
                :src="product.imagen"
                :alt="product.nombre"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div v-else class="text-on-surface-variant/40 text-xs text-center p-6">Sin imagen</div>
        </div>

        <!-- Contenido -->
        <div class="p-4 flex flex-col flex-1">
            <!-- Marca como acento de color -->
            <span class="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
                {{ product.marca }}
            </span>

            <!-- Nombre del producto -->
            <h3 class="font-display text-sm font-semibold text-on-surface leading-snug line-clamp-2 flex-1">
                {{ product.details?.details?.legal_name || product.nombre }}
            </h3>

            <!-- Footer con categoría y arrow -->
            <div class="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
                <span class="text-xs text-on-surface-variant truncate pr-2">
                    {{ product.categoria_raiz }}
                </span>
                <span
                    class="shrink-0 flex items-center gap-0.5 text-xs font-semibold text-primary transition-all duration-200 group-hover:gap-1.5"
                >
                    Ver
                    <ArrowRight class="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
                </span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ArrowRight } from "lucide-vue-next";

const { product } = defineProps({
    product: { type: Object, required: true },
});

const { push } = useRouter();
</script>
