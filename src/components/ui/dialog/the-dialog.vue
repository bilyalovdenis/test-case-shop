<template>
    <Teleport to="body">
        <Transition name="fade">
            <aside
                v-if="modelValue"
                class="overlay"
                @click.stop="$emit('update:modelValue', false)"
            >
                <div
                    class="overlay__content"
                    :style="{ width: width }"
                    @click.stop
                >
                    <slot name="default"></slot>
                </div>
            </aside>
        </Transition>
    </Teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            required: true,
        },
        width: {
            type: String,
            default: "200px",
        },
    },
    emits: {
        "update:modelValue": (val: boolean) => true,
    },
    watch: {
        modelValue(val) {
            if (val) {
                document.body.classList.add("show-dialog");
            } else {
                document.body.classList.remove("show-dialog");
            }
        },
    },
});
</script>

<style scoped>
.overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.35);
    z-index: 2000;
}
.overlay__content {
    margin: 24px;
    overflow: auto;
}
</style>
