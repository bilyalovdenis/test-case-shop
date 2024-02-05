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
            <turning-animation-list
                unique-key="id"
                :items="productList"
                class="product-gallery__container"
                @on-start="animationInProccessing = true"
                @on-stop="animationInProccessing = false"
            >
                <template #item="{ item }">
                    <product-card tag="li" v-bind="item" />
                </template>
            </turning-animation-list>
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
import turningAnimationList from "@/components/ui/turning-animation-list";
import { Product, ProductModel } from "../model";
import { computed, ref } from "vue";
import progressSpinner from "@/components/ui/progress-spinner";
//DATA AND FETCHING//
//Переменные для хранения информации о текущей пагинации и размера пагинации
const currentFetchingOffset = ref(0);
const FETCHING_PAGE_SIZE = 5;

const {
    data: productsFetchResult, //список загруженных товаров; undefined, если первичный запрос еще не выполнен
    error: productsFetchErrorMessage,
    isError: productsFetchIsError,
    executeRequest: repeatFetchProducts, // функция для повторного запроса
} = useAsyncState(ProductModel.getProducts, {
    immediate: true,
    initialArgs: [currentFetchingOffset.value + FETCHING_PAGE_SIZE],
    onSuccess: () => {
        currentFetchingOffset.value += FETCHING_PAGE_SIZE;
    },
});

const fetchNextPage = () => {
    repeatFetchProducts(currentFetchingOffset.value + FETCHING_PAGE_SIZE);
};

//INTERNAL STATE MANAGMENT//
const animationInProccessing = ref(false);
const fetchingHasNextPage = computed<boolean>(() => {
    return productsFetchResult?.value?.hasNextPage ?? false;
});

const productList = computed<Product[] | undefined>(() => {
    return productsFetchResult?.value?.productList;
});

const firstProductPageNotFetchYet = computed(
    () => productList.value === undefined
);

const fetchingMarkerIsShown = computed<boolean>(() => {
    //не показываем маркер, пока не прошла инициализация первыми данными или продукты закончились
    if (productList.value === undefined || !fetchingHasNextPage.value)
        return false;
    // показываем только если отображены все загруженные продукты
    return !animationInProccessing.value;
});
</script>

<style scoped>
.product-gallery.is-empty {
    display: flex;
    justify-content: center;
}
:deep(.product-gallery__container) {
    display: grid;
    grid-template-columns: repeat(4, minmax(300px, 400px));
    gap: 40px;
    justify-content: center;
}
@media screen and (max-width: 1450px) {
    :deep(.product-gallery__container) {
        grid-template-columns: repeat(3, minmax(334px, 400px));
    }
}
@media screen and (max-width: 1200px) {
    :deep(.product-gallery__container) {
        grid-template-columns: repeat(2, minmax(334px, 400px));
    }
}
@media screen and (max-width: 800px) {
    :deep(.product-gallery__container) {
        grid-template-columns: minmax(334px, 400px);
    }
}
</style>
