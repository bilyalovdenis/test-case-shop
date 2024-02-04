import { CURRENCY } from "./types";
type Marks = "$" | "₽";
export const currencyToMark: { [key in CURRENCY]: Marks } = {
    [CURRENCY.RUB]: "₽",
    [CURRENCY.USD]: "$",
};
