<template>
    <the-header />
    <the-main />
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import theHeader from "./components/the-header.vue";
import theMain from "./components/the-main.vue";
import { SCROLL_VALUE_FOR_HEADER_DECRAESE } from "./config";
import { customThrottle } from "@/utils/debounce";

////SCROLL HANDLE////
onMounted(() => {
    window.addEventListener("scroll", scrollHandle);
});
// AN вся логика со скроллом layout и изменением высоты шапки часто используется, поэтому я бы мог использовать готовое решение или сделать свое и вынести в отдельный компонент
// Cделал по стандарту, возможно стоило добавить  mark в main и повесить Intersection Observer, но задание тестовое и много времени нет возможности уделить.
// Использую throttle с таймеров выше, чем таймер анимации, чтобы максимально исключить дрибезжание на этапе перехода состояния шапки(можно еще оптимизировать)
const pageIsScrolled = ref(false);
const scrollHandle = (ev: Event) => {
    const yOffset = window.pageYOffset;
    //change status
    if (yOffset > SCROLL_VALUE_FOR_HEADER_DECRAESE && !pageIsScrolled.value) {
        changeStatusToScrolled(ev);
    } else if (
        yOffset < SCROLL_VALUE_FOR_HEADER_DECRAESE &&
        pageIsScrolled.value
    ) {
        changeStatusToUnscrolled(ev);
    }
};

const [changeStatusToScrolled] = customThrottle((ev: Event) => {
    pageIsScrolled.value = true;
    document.body.classList.add("is-scrolled");
}, 1000);

const [changeStatusToUnscrolled] = customThrottle((ev: Event) => {
    pageIsScrolled.value = false;
    document.body.classList.remove("is-scrolled");
}, 1000);
</script>

<style>
@import "./fonts/stylesheet.css";
@import "./styles";
#app {
    font-family: "Helvetica Now Display";
}
body {
    /* AN стандартная верстка layout через гриды по высоте header в задании слишком большой, из-за чего визуал пострадал */
    display: grid;
    min-height: 100vh;
    grid-template-areas:
        "header"
        "main";
    grid-template-rows: var(--header-height) 1fr;
    overflow: scroll;
    transition: grid-template-rows 0.5s ease;
}
body.is-scrolled {
    grid-template-rows: var(--scrolled-header-height) 1fr;
}
</style>
