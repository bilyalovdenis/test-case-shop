<template>
    <header id="header" class="header bg-primary">
        <img class="header__logo" src="@/assets/logo.svg" />
    </header>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({});
</script>

<style scoped>
.header {
    grid-area: header;
    position: sticky;
    border-bottom: var(--border-primary);
    display: flex;
    align-items: center;
    padding: 0 24px;
    top: 0;
    z-index: 1000;
}

.header__logo {
    height: 50%;
}
</style>
