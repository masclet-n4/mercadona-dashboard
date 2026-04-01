<template>
    <div id="app" class="min-h-screen bg-surface">
        <NavBar />
        <main class="max-w-7xl mx-auto px-6 py-8">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
