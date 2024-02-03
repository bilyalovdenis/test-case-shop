<template>
    <the-header />
    <the-main />
</template>

<script setup lang="ts">
import theHeader from "./components/the-header.vue";
import theMain from "./components/the-main.vue";
</script>

<style>
@import "./fonts/stylesheet.css";
@import "./styles";
#app {
    font-family: "Helvetica Now Display";
}
body {
    display: grid;
    height: 100vh;
    grid-template-areas:
        "header"
        "main";
    grid-template-rows: 120px 1fr;
}
</style>
