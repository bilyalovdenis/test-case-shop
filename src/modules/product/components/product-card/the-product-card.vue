<template>
    <component :is="tag" class="product-card" :class="variant">
        <img class="product-card__image" :src="image" alt="" />
        <div class="product-card__body">
            <div class="product-card__body__text">
                <h4 class="product-card__body__text__title text-h100">
                    {{ title }}
                </h4>
                <p class="product-card__body__text__description text-p300">
                    {{ description }}
                </p>
            </div>
            <div class="product-card__body__payment">
                <div class="product-card__body__payment__price text-l100-b">
                    <span class="product-card__body__payment__price__currency">
                        {{ currencyToMark[currency] }}
                    </span>
                    <span class="product-card__body__payment__price__value">
                        {{ price }}
                    </span>
                </div>

                <div class="product-card__body__payment__divider"></div>

                <div class="product-card__body__payment__bonuses text-c100">
                    <div class="product-card__body__payment__bonus">
                        <img src="@/assets/delivery.svg" />
                        <span>Free shipping</span>
                    </div>
                    <div class="product-card__body__payment__bonus">
                        <img src="@/assets/gift.svg" />
                        <span>Free gift</span>
                    </div>
                </div>
            </div>

            <div class="product-card__body__action">
                <the-button class="view-deal-btn" @on-click="showCard = true">
                    <span class="view-deal-btn__text"> View deal </span>
                    <img src="@/assets/vector.svg" />
                </the-button>
            </div>
        </div>
        <!-- AN  честно не знаю насчет оптимизации при такой логике работы, 
             думаю, что нужно просто выдавать emit "select", а уже у родителя вызывать dialog -->
        <the-dialog v-if="variant === 'short'" v-model="showCard" width="400px">
            <!-- AN очень похоже на анти-паттерн, но тут очень удобно применить данную "фишку" vue -->
            <product-card v-bind="$props" variant="default" tag="article" />
        </the-dialog>
    </component>
</template>

<script lang="ts">
import { currencyToMark } from "@/modules/meta/services";
import { useMeta } from "@/modules/meta/store/useMeta";
import theDialog from "@/components/ui/dialog/the-dialog.vue";
import { mapState } from "pinia";
import theButton from "@/components/ui/button";
import { PropType, defineComponent } from "vue";
export default defineComponent({
    name: "ProductCard",
    components: {
        theButton,
        theDialog,
    },
    props: {
        //options
        variant: {
            type: String as PropType<"default" | "short">,
            default: "short",
        },
        tag: {
            type: String as PropType<"li" | "article">,
            default: "article",
        },
        //data
        id: {
            type: Number,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },
    data: function () {
        return {
            //AN один из минусов Option Api - все внешние функции и enum нужно явно указывать в data, для того, чтобы использовать в шаблоне :(
            currencyToMark: currencyToMark,
            showCard: false,
        };
    },
    computed: {
        ...mapState(useMeta, ["currency"]),
    },
});
</script>

<style scoped>
.product-card {
    padding: 20px 24px;
    padding-top: 36px;
    background-color: var(--theme-primary);
    border-radius: 24px;
    display: flex;
    flex-direction: column;
    position: relative;
}
.product-card__image {
    height: 132px;
    margin: 0 auto;
}
.product-card__body {
    display: flex;
    height: 250px;
    flex-direction: column;
    justify-content: space-between;
}
.product-card__body__text__title {
    text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    margin: 0;
    margin-bottom: 12px;
    overflow: hidden;
}
.product-card__body__text__description {
    color: #828282;
    margin: 0;
    overflow: hidden;
}
.product-card__body__payment {
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.product-card__body__payment__price__currency {
    margin-right: 5px;
}
.product-card__body__payment__divider {
    width: 100%;
    height: 1px;
    background-color: #cccccc;
}
.product-card__body__payment__bonuses {
    color: #9c9c9c;
    display: flex;
    align-items: center;
    gap: 13px;
}

.product-card__body__payment__bonus {
    display: flex;
    align-items: center;
}
.product-card__body__payment__bonus img {
    margin-right: 4px;
}
.product-card__body__action {
    margin-top: 10px;
}
.view-deal-btn__text {
    margin-right: 6px;
}

@import "./short.css";
@import "./default.css";
</style>
