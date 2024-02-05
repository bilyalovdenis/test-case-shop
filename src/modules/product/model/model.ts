import { Product } from "../types";
import axios from "axios";
import { setAsyncTimeout } from "@/utils/libs/async";
export class ProductModel {
    static async getProducts(
        limit?: number,
        offset?: number
    ): Promise<Product[]> {
        await setAsyncTimeout(2000); //api очень быстро отвечает и не получится нормальнос постореть loading, поэтому кастомная задержка
        const result = await axios.get<Product[]>(
            "https://fakestoreapi.com/products",
            {
                params: { offset: offset, limit: limit },
            }
        );
        return result.data;
    }
}
