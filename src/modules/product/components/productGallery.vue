<template>
    <section class="product-gallery">
        <div v-if="isInitialLoading">initial render</div>
        <TransitionGroup
            v-else
            name="expand-fade"
            class="product-gallery__container"
            tag="ul"
            @after-enter="showNext"
            @after-leave="hidePrev"
        >
            <product-card
                v-for="product in productsToShow"
                tag="li"
                v-bind="product"
                :key="product.id"
            />
        </TransitionGroup>
        <button v-if="showFetchingMarker" @click="showMore">еще</button>
    </section>
</template>

<script setup lang="ts">
import useAsyncState from "@/utils/composables/useAsyncState";
import productCard from "./productCard.vue";
import { Product, ProductModel } from "../model";
import { computed, ref } from "vue";

//DATA AND FETCHING//
const offset = ref(0);
const PAGE_SIZE = 5;
const {
    data: products,
    isLoading,
    error,
    isError,
    executeRequest,
} = useAsyncState(ProductModel.getProducts, {
    immediate: true,
    initialArgs: [offset.value + PAGE_SIZE],
    onSuccess: (value) => {
        offset.value += PAGE_SIZE;
        animationStart();
        console.log(value);
    },
});
const isInitialLoading = computed(() => products === undefined);
const showMore = () => {
    executeRequest(offset.value + PAGE_SIZE);
};
//ANIMATIONS//
const numShow = ref(0);

const animationStart = () => {
    numShow.value += 1;
};
const productsToShow = computed<Product[]>(() => {
    return products.value?.slice(0, numShow.value) ?? [];
});
const showNext = (el: any) => {
    numShow.value = Math.min((products.value ?? []).length, numShow.value + 1);
};
const hidePrev = () => {
    numShow.value = Math.max(0, numShow.value - 1);
};

//STATE MANAGMENT//
const showFetchingMarker = computed<boolean>(() => {
    return productsToShow.value.length >= (products.value?.length ?? -1);
});
</script>

<style scoped>
.product-gallery__container {
    display: grid;
    grid-template-columns: repeat(4, minmax(300px, 400px));
    gap: 40px;
    justify-content: center;
}
@media screen and (max-width: 1450px) {
    .product-gallery__container {
        grid-template-columns: repeat(3, minmax(334px, 400px));
    }
}
@media screen and (max-width: 1200px) {
    .product-gallery__container {
        grid-template-columns: repeat(2, minmax(334px, 400px));
    }
}
@media screen and (max-width: 800px) {
    .product-gallery__container {
        grid-template-columns: minmax(334px, 400px);
    }
}
</style>
