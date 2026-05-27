<template>
    <div class="layout">
        <TheHeader />
        <main class="main-content">
            <router-view />
        </main>
        <TheFooter />
    </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import TheHeader from './TheHeader.vue';
import TheFooter from './TheFooter.vue';
</script>

<style scoped>
.layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.main-content {
    flex: 1;
}
</style>