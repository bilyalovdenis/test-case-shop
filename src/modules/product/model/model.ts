import { Product } from "./types";
import axios from "axios";

export class ProductModel {
    static async getProducts(
        offset?: number,
        limit?: number
    ): Promise<Product[]> {
        return axios.get("https://fakestoreapi.com/products", {
            params: { offset: offset, limit: limit },
        });
    }
}
