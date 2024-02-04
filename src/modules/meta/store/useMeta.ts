import { defineStore } from "pinia";
import { CURRENCY } from "../types";

export const useMeta = defineStore("meta", {
    state: () => ({
        currency: CURRENCY.RUB as CURRENCY,
    }),
    actions: {
        setCurrency(val: CURRENCY) {
            this.currency = val;
        },
    },
});
