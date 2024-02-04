<template>
    <button
        type="button"
        class="ui-button text-l100-b"
        :class="classes"
        @click="$emit('onClick')"
    >
        <slot default></slot>
    </button>
</template>

<script lang="ts">
import { PropType, defineComponent, SlotsType } from "vue";

export default defineComponent({
    props: {
        //AN Я не буду заморачиваться с типизацией всех возможных переменных темы, для этого есть специальные библиотеки с хорошими конфигурациями
        density: {
            type: String as PropType<"default">,
            default: "default",
        },
        bgColor: {
            type: String as PropType<"secondary">,
            default: "secondary",
        },
        color: {
            type: String as PropType<"primary">,
            default: "primary",
        },
    },
    emits: {
        //AN по факту бесполезное событие, добавил для демонстрации просто, так как задание почти не предпологает общение между компонентами
        onClick: () => true,
    },
    slots: Object as SlotsType<{
        default: [];
    }>,
    computed: {
        classes(): string {
            //AN тут надо подумать на тем, как это будет оптимищированно при большом количестве настрокек
            return `density-${this.density} bg-${this.bgColor} text-${this.color}`;
        },
        bg(): string {
            return `var(--theme-${this.bgColor})`;
        },
        bgHover(): string {
            return `var(--theme-${this.bgColor}-darken)`;
        },
    },
});
</script>

<style scoped>
.ui-button {
    width: 100%;
    border-radius: 38px;
    background-color: v-bind(bg);
    transition: background-color 0.2s ease-in-out;
}
.ui-button:hover {
    background-color: v-bind(bgHover);
}
/* AN понимаю, что помимо высоты от этой настройки должны зависеть размеры текста и тд, но это усложнение для тестового задания */
.ui-button.density-default {
    height: 36px;
}
</style>
