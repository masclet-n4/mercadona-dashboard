<template>
    <div v-if="productsStats.length" class="w-full">
        <div class="relative overflow-hidden rounded-2xl">
            <div class="flex gap-4" :class="expanded ? 'flex-wrap' : 'flex-nowrap overflow-x-hidden'">
                <div v-for="productStats in productsStats" :key="productStats.id" class="shrink-0 w-55 sm:w-60 md:w-65">
                    <StatCard :selectedPeriod="selectedPeriod" :statsType="statsType" :stats="productStats" />
                </div>
            </div>

            <!-- Fade-out when collapsed -->
            <div
                v-if="!expanded && showFade"
                class="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 bg-linear-to-l from-surface-container-lowest via-surface-container-lowest/80 to-transparent"
            />
        </div>

        <div class="mt-4 flex justify-end">
            <button
                type="button"
                @click="expanded = !expanded"
                class="inline-flex items-center gap-2 rounded-full border border-outline-variant/35 bg-surface-container-low px-4 py-2 text-sm font-medium text-on-surface hover:bg-surface-container-high transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
                {{ expanded ? "Mostrar menos" : "Ver lista completa" }}
            </button>
        </div>
    </div>

    <div
        v-else
        class="w-full rounded-2xl border border-outline-variant/20 bg-surface-container-lowest p-6 text-sm text-on-surface-variant"
    >
        No hay estadísticas disponibles todavía.
    </div>
</template>

<script setup>
import { computed, ref } from "vue";
import StatCard from "./StatCard.vue";

const { statsType, selectedPeriod, productsStats } = defineProps({
    statsType: {
        type: String,
        required: true,
    },
    productsStats: {
        type: Array,
        required: true,
    },
    selectedPeriod: {
        type: String,
        required: true,
    },
});

const expanded = ref(false);

/**
 * Show fade only when there are enough cards to overflow likely viewport widths.
 * Tweak threshold if your card widths/gaps change.
 */
const showFade = computed(() => productsStats.length > 4);
</script>
