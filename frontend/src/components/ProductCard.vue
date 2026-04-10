<template>
    <div class="p-6 bg-surface-container-lowest rounded-xl flex flex-col">
        <div class="bg-surface-container-low flex items-center justify-center aspect-square rounded-xl overflow-hidden">
            <img
                v-if="product.imagen"
                :src="product.imagen"
                :alt="product.nombre"
                class="w-full h-full object-contain rounded-xl"
            />
        </div>

        <div class="flex-1 mt-2">
            <h3 class="font-display text-lg font-semibold text-on-surface">
                {{ product.details?.details?.legal_name }}
            </h3>
        </div>

        <div class="flex justify-between items-center mt-2">
            <p class="text-sm text-on-surface-variant">
                {{ product.marca }}
            </p>
            <button
                class="text-sm font-medium text-primary rounded-lg px-3 py-1 hover:bg-primary/10 transition-colors"
                @click="push(`/product/${product.slug}`)"
            >
                Details
            </button>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const { product } = defineProps({
    product: { type: Object, required: true },
});
const { push } = useRouter();
</script>
