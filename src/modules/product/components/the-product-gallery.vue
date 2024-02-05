<template>
    <section
        class="product-gallery"
        :class="{ 'is-empty': firstProductPageNotFetchYet }"
    >
        <span v-if="productsFetchIsError" class="text-error">
            {{ productsFetchErrorMessage }}
        </span>
        <progress-spinner v-if="firstProductPageNotFetchYet" />
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
                v-if="fetchingMarkerIsShown"
                style="margin-top: 20px"
                @on-visible="fetchNextPage"
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
//Переменные для хранения информации о текущей пагинации и размера пагинации
const currentFetchingOffset = ref(0);
const FETCHING_PAGE_SIZE = 10;

const {
    data: productList, //список загруженных,  товаров; undefined, если первичный запрос еще не выполнен
    error: productsFetchErrorMessage,
    isError: productsFetchIsError,
    executeRequest: repeatFetchProducts, // функция для повторного запроса
} = useAsyncState(ProductModel.getProducts, {
    immediate: true,
    initialArgs: [currentFetchingOffset.value + FETCHING_PAGE_SIZE],
    onSuccess: () => {
        currentFetchingOffset.value += FETCHING_PAGE_SIZE;
        animationStart();
    },
});

const fetchNextPage = () => {
    repeatFetchProducts(currentFetchingOffset.value + FETCHING_PAGE_SIZE);
};

//ANIMATIONS//
const numShow = ref(0);
const animationStart = () => {
    numShow.value += 1;
};
const productsToShow = computed<Product[]>(() => {
    return productList.value?.slice(0, numShow.value) ?? [];
});

const showNext = (el: any) => {
    numShow.value = Math.min(
        (productList.value ?? []).length,
        numShow.value + 1
    );
};

//INTERNAL STATE MANAGMENT//
const firstProductPageNotFetchYet = computed(
    () => productList.value === undefined
);

const fetchingMarkerIsShown = computed<boolean>(() => {
    //не показываем маркер, пока не прошла инициализация первыми данными
    if (productList.value === undefined) return false;
    // показываем только если отображены все загруженные продукты
    return productsToShow.value.length >= productList.value.length;
});
</script>

<style scoped>
.product-gallery.is-empty {
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
