import { Model } from "../../deps.ts";
import ProductModel from "./product.model.ts";

export interface Product {
  brand: string;
  quantity: number;
  provider: string;
  name: string;
  price: number;
  imageUrl: string;
  [key: string]: string | number;
}

export interface ProductUpdate {
  brand?: string;
  quantity?: number;
  provider?: string;
  name?: string;
  price?: number;
  imageUrl?: string;
  [key: string]: string | number | undefined;
}

export interface SearchParams {
  name?: string;
  limit?: number;
  offset?: number;
}

export interface SearchProductsResponse {
  products: ProductModel[];
  total: number;
  offset: number;
  limit: number;
}

export interface FetchProduct {
  id?: number;
  name?: string;
  provider?: string;
  [key: string]: string | number | undefined;
}

export interface ProductReviewsResponse {
  productReviews: Model[];
  total: number;
}
