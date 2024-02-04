<template>
    <main class="bg-background main">
        <product-gallery />
    </main>
</template>

<script setup lang="ts">
import productGallery from "@/modules/product/components/product-gallery.vue";
</script>

<style scoped>
.main {
    grid-area: main;
    padding: 50px;
}
</style>
