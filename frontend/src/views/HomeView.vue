<template>
    <div class="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
        <!-- Hero -->
        <!-- <section
            class="relative overflow-hidden rounded-3xl border border-outline-variant/25 bg-surface-container-lowest shadow-ambient p-6 sm:p-8 lg:p-10"
        >
            <div class="absolute -top-24 -right-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div
                class="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none"
            />

            <div class="relative">
                <span
                    class="inline-flex items-center rounded-full border border-outline-variant/30 bg-surface-container-low px-3 py-1 text-xs sm:text-sm text-on-surface-variant"
                >
                    Resumen rápido del catálogo
                </span>
                <h1
                    class="mt-4 font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-on-surface"
                >
                    Panel de estadísticas de productos
                </h1>
                <p class="mt-3 max-w-3xl text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    Explora tendencias clave en una vista clara y visual. Cada bloque muestra una lista horizontal de
                    tarjetas; el contenido que excede el ancho queda oculto para mantener una lectura limpia.
                </p>
            </div>
        </section> -->
        <section class="space-y-4">
            <div
                class="mx-auto w-full max-w-3xl rounded-2xl border border-outline-variant/30 bg-surface-container-low p-1.5 sm:p-2 grid grid-cols-2 sm:grid-cols-5 gap-1.5 shadow-sm"
            >
                <button
                    @click="handlePeriodChange('d6')"
                    class="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="
                        selectedPeriod === 'd6'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    "
                >
                    6 días
                </button>
                <button
                    @click="handlePeriodChange('d30')"
                    class="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="
                        selectedPeriod === 'd30'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    "
                >
                    1 mes
                </button>
                <button
                    @click="handlePeriodChange('d90')"
                    class="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="
                        selectedPeriod === 'd90'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    "
                >
                    3 meses
                </button>
                <button
                    @click="handlePeriodChange('d180')"
                    class="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="
                        selectedPeriod === 'd180'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    "
                >
                    6 meses
                </button>
                <button
                    @click="handlePeriodChange('d365')"
                    class="px-3 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                    :class="
                        selectedPeriod === 'd360'
                            ? 'bg-primary text-on-primary shadow-sm'
                            : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
                    "
                >
                    1 año
                </button>
            </div>
        </section>

        <!-- Sección 1 -->
        <section class="space-y-4">
            <div class="flex items-end justify-between gap-4">
                <div>
                    <h2 class="font-display text-xl sm:text-2xl font-bold text-on-surface">Mas cambios de precio</h2>
                    <p class="text-sm text-on-surface-variant">
                        Productos con mayor actividad reciente en variación de precio.
                    </p>
                </div>
            </div>

            <StatsList
                :statsType="'count_price_changes'"
                :productsStats="productsStats.byPriceChange"
                :selectedPeriod="selectedPeriod"
            />
        </section>

        <!-- Sección 2 -->
        <section class="space-y-4">
            <div class="flex items-end justify-between gap-4">
                <div>
                    <h2 class="font-display text-xl sm:text-2xl font-bold text-on-surface">
                        Mayor variacion porcentual
                    </h2>
                    <p class="text-sm text-on-surface-variant">
                        Destaca los productos con cambios relativos más relevantes.
                    </p>
                </div>
            </div>

            <StatsList
                :statsType="'price_change_percentage'"
                :productsStats="productsStats.byPercentageChange"
                :selectedPeriod="selectedPeriod"
            />
        </section>

        <!-- Sección 3 -->
        <section class="space-y-4">
            <div class="flex items-end justify-between gap-4">
                <div>
                    <h2 class="font-display text-xl sm:text-2xl font-bold text-on-surface">Mas variancia</h2>
                    <p class="text-sm text-on-surface-variant">Mayor cambio de precio en relacion al precioa</p>
                </div>
            </div>

            <StatsList
                :statsType="'variation'"
                :productsStats="productsStats.byVariation"
                :selectedPeriod="selectedPeriod"
            />
        </section>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStats } from "@/composables/useStats";
import StatsList from "@/components/StatsList.vue";

const selectedPeriod = ref("d30");

const { productsStats, loadInitialStats } = useStats();

onMounted(() => {
    loadInitialStats();
});

const handlePeriodChange = (period) => {
    selectedPeriod.value = period;
    loadInitialStats(period);
};
</script>
