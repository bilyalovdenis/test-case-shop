<template>
    <TransitionGroup name="expand-fade" tag="ul" appear @after-enter="showNext">
        <template v-for="item in itemsToShow" :key="item[uniqueKey]">
            <slot name="item" :item="item"></slot>
        </template>
    </TransitionGroup>
</template>

<script setup lang="ts" generic="T">
import {
    defineProps,
    defineEmits,
    toRefs,
    defineSlots,
    ref,
    computed,
    watch,
} from "vue";
type Props = {
    // eslint-disable-next-line no-undef
    items?: T[];
    uniqueKey: string;
};
type Emits = {
    onStart: [];
    onStop: [];
};

const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const slots = defineSlots<{
    // eslint-disable-next-line no-undef
    item(props: { item: T }): any;
}>();

const { items, uniqueKey } = toRefs(props);

const numberItemsToShow = ref(0);
watch(
    items,
    () => {
        emit("onStart");
        numberItemsToShow.value += 1;
    },
    { immediate: true }
);
// eslint-disable-next-line no-undef
const itemsToShow = computed<T[]>(() => {
    return items.value?.slice(0, numberItemsToShow.value) ?? [];
});

const showNext = (el: any) => {
    if ((items.value ?? []).length > numberItemsToShow.value) {
        numberItemsToShow.value += 1;
    } else {
        emit("onStop");
    }
};
</script>

<style scoped></style>
