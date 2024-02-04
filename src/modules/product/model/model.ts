import { Product } from "../types";
import axios from "axios";

export class ProductModel {
    static async getProducts(
        limit?: number,
        offset?: number
    ): Promise<Product[]> {
        const result = await axios.get<Product[]>(
            "https://fakestoreapi.com/products",
            {
                params: { offset: offset, limit: limit },
            }
        );
        return result.data;
    }
}
