<template>
    <section class="product-gallery" :class="{ 'is-init': isInitialLoading }">
        <span v-if="isError" class="text-error">{{ error }}</span>
        <progress-spinner v-if="isInitialLoading" />
        <template v-else>
            <TransitionGroup
                name="expand-fade"
                class="product-gallery__container"
                tag="ul"
                appear
                @after-enter="showNext"
            >
                <product-card
                    v-for="product in productsToShow"
                    tag="li"
                    v-bind="product"
                    :key="product.id"
                />
            </TransitionGroup>
            <fetching-marker
                v-if="showFetchingMarker"
                style="margin-top: 20px"
                @on-visible="fetchMore"
            />
        </template>
    </section>
</template>

<script setup lang="ts">
import useAsyncState from "@/utils/composables/useAsyncState";
import productCard from "./product-card";
import fetchingMarker from "@/components/ui/fetching-marker";
import { Product, ProductModel } from "../model";
import { computed, ref } from "vue";
import progressSpinner from "@/components/ui/progress-spinner";
//DATA AND FETCHING//
const offset = ref(0);
const PAGE_SIZE = 5;
const {
    data: products,
    error,
    isError,
    executeRequest,
} = useAsyncState(ProductModel.getProducts, {
    immediate: true,
    initialArgs: [offset.value + PAGE_SIZE],
    onSuccess: () => {
        offset.value += PAGE_SIZE;
        animationStart();
    },
});
const fetchMore = () => {
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

//STATE MANAGMENT//
const isInitialLoading = computed(() => products.value === undefined);

const showFetchingMarker = computed<boolean>(() => {
    //не показываем маркер, пока не прошла инициализация первыми данными
    if (products.value === undefined) return false;
    return productsToShow.value.length >= products.value.length;
});
</script>

<style scoped>
.product-gallery.is-init {
    display: flex;
    justify-content: center;
}
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
