import { Product } from "../types";
import axios from "axios";
import { setAsyncTimeout } from "@/utils/libs/async";

const MAX_PRODUCTS_IN_API = 20;

export class ProductModel {
    static async getProducts(
        limit?: number,
        offset?: number
    ): Promise<{ productList: Product[]; hasNextPage: boolean }> {
        await setAsyncTimeout(1000); //api очень быстро отвечает и не получится нормальнос постореть loading, поэтому кастомная задержка
        const productList = (
            await axios.get<Product[]>("https://fakestoreapi.com/products", {
                params: { offset: offset, limit: limit },
            })
        ).data;
        //Так как api не возвращает остаток товаров, то хардкодим 20
        const hasNextPage = productList.length < MAX_PRODUCTS_IN_API;
        return { productList, hasNextPage };
    }
}
