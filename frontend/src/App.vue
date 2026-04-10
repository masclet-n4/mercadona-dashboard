<template>
    <div id="app" class="min-h-screen bg-surface">
        <NavBar />
        <main class="mx-auto px-6 py-8">
            <router-view />
        </main>
    </div>
</template>

<script setup>
import NavBar from "./components/NavBar.vue";
</script>
