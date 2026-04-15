<template>
    <div
        class="group bg-surface-container-lowest rounded-2xl border border-outline-variant/20 overflow-hidden hover:border-primary/25 transition-all duration-300 cursor-pointer flex flex-col"
        @click="push(`/product/${stats.product_id}`)"
    >
        <!-- Imagen -->
        <div
            class="m-3 rounded-xl overflow-hidden bg-surface-container-low aspect-square flex items-center justify-center"
        >
            <img
                v-if="stats.expand?.product_id?.imagen"
                :src="stats.expand.product_id.imagen"
                :alt="name"
                class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
            />
            <div v-else class="text-on-surface-variant/40 text-xs text-center p-6">Sin imagen</div>
        </div>

        <!-- Contenido -->
        <div class="px-4 pb-4 flex flex-col flex-1">
            <h3 class="text-sm font-semibold text-on-surface line-clamp-2 min-h-10">
                {{ name }}
            </h3>

            <div class="mt-2">
                <p class="text-xs uppercase tracking-wide text-on-surface-variant">{{ STAT_TYPES[statsType].label }}</p>
                <p class="text-lg font-bold text-primary leading-tight">
                    {{ formattedStatValue }}
                </p>
            </div>

            <div class="mt-3 pt-3 border-t border-outline-variant/20 flex items-center justify-between">
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
import { computed } from "vue";
import { useRouter } from "vue-router";
import { ArrowRight } from "lucide-vue-next";
import { STAT_TYPES } from "@/assets/enums";

const { stats, statsType, selectedPeriod } = defineProps({
    stats: { type: Object, required: true },
    statsType: { type: String, required: true },
    selectedPeriod: { type: String, required: true },
});

console.log(stats, statsType, selectedPeriod);
console.log(STAT_TYPES[statsType].label);

const { push } = useRouter();

const name = computed(() => stats?.expand?.product_id?.nombre || "Producto sin nombre");

const rawStatValue = computed(() => {
    return stats?.[statsType]?.[selectedPeriod] ?? null;
});

const isPercentageStat = computed(() => {
    return STAT_TYPES[statsType]?.isPercentage ?? false;
});

const formattedStatValue = computed(() => {
    const value = rawStatValue.value;

    if (value === null || value === undefined || value === "") return "—";

    const numericValue = Number(value);
    if (Number.isNaN(numericValue)) return String(value);

    if (isPercentageStat.value) {
        return `${numericValue.toFixed(2)}%`;
    }

    return Number.isInteger(numericValue)
        ? new Intl.NumberFormat("es-ES").format(numericValue)
        : new Intl.NumberFormat("es-ES", { maximumFractionDigits: 2 }).format(numericValue);
});
</script>
