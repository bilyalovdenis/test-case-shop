<template>
    <main class="bg-background main">
        <product-gallery />
    </main>
</template>

<script setup lang="ts">
import productGallery from "@/modules/product/components/the-product-gallery.vue";
</script>

<style scoped>
.main {
    grid-area: main;
    padding: 50px;
}
@media screen and (max-width: 500px) {
    .main {
        padding: 20px;
    }
}
</style>
