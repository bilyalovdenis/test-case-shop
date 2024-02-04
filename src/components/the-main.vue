<template>
    <main class="bg-background main">
        <product-card />
    </main>
</template>

<script setup lang="ts">
import productCard from "@/modules/product/components/productCard.vue";
</script>

<style scoped>
.main {
    grid-area: main;
    height: 5000px;
    padding: 80px;
}
</style>
