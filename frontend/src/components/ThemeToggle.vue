<template>
    <button
        @click="themeStore.toggle"
        class="relative w-14 h-8 rounded-full transition-all duration-300 group"
        :class="themeStore.isDark ? 'bg-primary/20' : 'bg-surface-container-high hover:bg-surface-container-highest'"
        :aria-label="themeStore.isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
    >
        <div
            class="absolute top-1 w-6 h-6 rounded-full transition-all duration-300 flex items-center justify-center shadow-sm"
            :class="themeStore.isDark ? 'left-7 bg-primary' : 'left-1 bg-surface-container-lowest'"
        >
            <Sun v-if="!themeStore.isDark" class="w-3.5 h-3.5 text-primary" />
            <Moon v-else class="w-3.5 h-3.5 text-on-primary" />
        </div>
    </button>
</template>

<script setup>
import { Sun, Moon } from "lucide-vue-next";
import { useThemeStore } from "@/stores/theme";

const themeStore = useThemeStore();
</script>
