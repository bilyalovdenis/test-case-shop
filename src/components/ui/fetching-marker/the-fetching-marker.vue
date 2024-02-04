<template>
    <div ref="loader" class="fetching-marker"></div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    emits: {
        onVisible: () => true,
    },
    data() {
        return {
            //observe
            initializationCallGuard: true,
            observer: null as IntersectionObserver | null,
            observerOptions: {
                rootMargin: "0px",
                threshold: 0.5,
            },

            //state
            onceCalledGuard: false,
        };
    },
    mounted() {
        const el = this.$el as HTMLElement;
        const parent = el.parentElement;
        if (!el || !parent) return;
        this.observer = new IntersectionObserver(() => {
            //если вызов при инициализации
            if (this.initializationCallGuard) {
                this.initializationCallGuard = false;
                return;
            }
            //если уже выдавали emit
            if (this.onceCalledGuard) {
                return;
            }
            this.onceCalledGuard = true;
            this.$emit("onVisible");
        }, this.observerOptions);
        this.observer.observe(el);
    },
    unmounted() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
});
</script>

<style scoped>
@keyframes shine {
    to {
        background-position-x: -200%;
    }
}
.fetching-marker {
    width: 100%;
    height: 30px;
    background: #d8d8d8;
    background: linear-gradient(110deg, #d8d8d8 8%, #f5f5f5 18%, #d8d8d8 33%);
    border-radius: 5px;
    background-size: 200% 100%;
    animation: 1.5s shine linear infinite;
}
</style>
