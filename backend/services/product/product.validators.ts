import { number, Schema, string, unknown } from "../../deps.ts";
import { Product, ProductUpdate } from "./product.types.ts";
import { validate } from "../../utils/helpers.ts";

const ProductSchema = Schema({
  brand: string.trim().normalize().between(
    4,
    40,
    "should contain at least four characters.",
  ),
  name: string.trim().normalize().between(
    10,
    150,
    "should contain at least 10 characters.",
  ),
  quantity: number.integer().gt(0, "should be greater than zero."),
  price: number.float().gt(0, "should be greater than zero."),
  provider: string.trim().normalize().between(
    4,
    40,
    "should contain at least four characters.",
  ),
  imageUrl: string.trim().normalize(),
}, { strict: true });

const ProductUpdateSchema = Schema({
  brand: string.trim().optional(),
  name: string.trim().normalize().between(
    4,
    40,
    "should contain at least four characters.",
  ).optional(),
  quantity: number.integer().gt(0, "should be greater than zero.").optional(),
  price: number.float().gt(0, "should be greater than zero.").optional(),
  provider: string.trim().normalize().optional(),
  imageUrl: string.trim().normalize().optional(),
}, { strict: true });

const SearchProductSchema = Schema({
  name: string.trim().normalize().optional(),
  limit: unknown.number().optional(),
  offset: unknown.number().gte(0).optional(),
});

export const validateProductSchema = (input: Product) =>
  validate(ProductSchema.destruct(), input);
export const validateUpdateProductSchema = (input: ProductUpdate) =>
  validate(ProductUpdateSchema.destruct(), input);
export const validateSearchProductsSchema = (
  input: Record<string, string | undefined>,
) => validate(SearchProductSchema.destruct(), input);
