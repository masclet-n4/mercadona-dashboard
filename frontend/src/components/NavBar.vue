<template>
    <nav class="glass sticky top-0 z-50 border-b border-outline-variant/20 backdrop-blur-md">
        <div class="mx-auto max-w-7xl px-4 sm:px-6 py-3 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <!-- Marca -->
            <router-link
                to="/"
                class="justify-self-start font-display text-lg sm:text-2xl font-bold text-on-surface hover:opacity-90 transition-opacity"
            >
                Mercadona Dashboard
            </router-link>

            <!-- Navegación principal (centrada) -->
            <div
                aria-label="Navegación principal"
                class="justify-self-center flex items-center gap-1 rounded-full bg-surface-container-low p-1 border border-outline-variant/35 shadow-sm"
            >
                <router-link
                    to="/"
                    exact-active-class="bg-surface-container-high text-on-surface ring-1 ring-primary/25"
                    class="px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                    Inicio
                </router-link>

                <router-link
                    to="/search"
                    exact-active-class="bg-surface-container-high text-on-surface ring-1 ring-primary/25"
                    class="px-4 py-2 rounded-full text-sm font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                >
                    Buscar
                </router-link>
            </div>

            <!-- Acciones -->
            <div class="justify-self-end">
                <ThemeToggle />
            </div>
        </div>
    </nav>
</template>

<script setup>
import ThemeToggle from "./ThemeToggle.vue";
</script>
