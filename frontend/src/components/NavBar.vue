<template>
    <nav class="glass sticky top-0 z-50 border-b border-(--outline-variant)/15">
        <div class="mx-auto px-6 py-4 flex items-center justify-between">
            <router-link to="/" class="font-display text-2xl font-bold text-on-surface">
                Mercadona Dashboard
            </router-link>
            <ThemeToggle />
        </div>
    </nav>
</template>

<script setup>
import ThemeToggle from "./ThemeToggle.vue";
</script>
