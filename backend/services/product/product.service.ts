import { Injectable, Status, Values } from "../../deps.ts";
import ProductModel from "./product.model.ts";
import { CustomErrorHandler } from "../../middlewares/error.ts";
import {
  FetchProduct,
  Product,
  ProductReviewsResponse,
  ProductUpdate,
  SearchParams,
  SearchProductsResponse,
} from "./product.types.ts";
import { formatError } from "../../middlewares/error.ts";
import { formatProductList } from "../../utils/helpers.ts";

@Injectable()
export default class ProductService {
  async createProduct(product: Product): Promise<ProductModel> {
    try {
      // check the product existence
      const existentProduct = await ProductModel.where({ name: product.name })
        .first();

      if (existentProduct) {
        throw new CustomErrorHandler(
          Status.BadRequest,
          "Product already exists",
        );
      }
      const createdProduct = <ProductModel> await ProductModel.create(product);
      return createdProduct;
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  async deleteProduct(productId: number) {
    try {
      // check the product existence
      await this.getProduct({ id: productId });

      const deletedProduct = await ProductModel.deleteById(`${productId}`);

      if (deletedProduct) {
        return { deletedElements: 1, productId };
      }

      throw new CustomErrorHandler(
        Status.BadRequest,
        "Error while deleting product",
      );
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  async updateProduct(
    id: number,
    productToUpdate: ProductUpdate,
  ): Promise<ProductModel> {
    try {
      // check the product existence
      await this.getProduct({ id });

      await ProductModel.where({ id }).update(
        <Values> productToUpdate,
      );

      const product = <ProductModel> await ProductModel.where({ id }).first();

      return product;
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  async searchProducts(params: SearchParams): Promise<SearchProductsResponse> {
    const { name, offset, limit } = params;
    const queryOffset = offset ? offset : 0;
    const queryLimit = limit ? limit : 10;
    const result = { offset: queryOffset, limit: queryLimit };
    const qBuilder = ProductModel;
    let productList: ProductModel[] = [];
    let total = 0;
    if (name) {
      total = <number> await qBuilder.where("name", "like", `${name}%`).count();

      productList = <ProductModel[]> await qBuilder.where(
        "name",
        "like",
        `${name}%`,
      )
        .offset(
          queryOffset,
        ).limit(queryLimit).get();
    } else {
      productList = <ProductModel[]> await qBuilder
        .offset(
          queryOffset,
        ).limit(queryLimit).get();
      total = <number> await qBuilder.count();
    }

    if (productList.constructor === Array && productList.length) {
      return {
        ...result,
        products: formatProductList(productList),
        total,
      };
    } else if (
      productList.constructor === Object && !Array.isArray(productList) &&
      Object.keys(productList).length
    ) {
      return {
        ...result,
        products: formatProductList([productList]),
        total: 1,
      };
    }
    return { ...result, products: [], total: 0 };
  }

  async getProduct(
    product: FetchProduct,
  ): Promise<ProductModel> {
    const fetchedProduct = <ProductModel> await ProductModel.where(
      <Values> product,
    ).first();

    if (!fetchedProduct) {
      throw new CustomErrorHandler(Status.NotFound, "Product does not exist");
    }
    return fetchedProduct;
  }

  async getProductReviews(productId: number): Promise<ProductReviewsResponse> {
    try {
      await this.getProduct({ id: productId });

      const fetchedProductReviews = await ProductModel.where({ id: productId })
        .reviews();

      if (
        fetchedProductReviews.constructor === Array &&
        fetchedProductReviews.length
      ) {
        return {
          productReviews: fetchedProductReviews,
          total: fetchedProductReviews.length,
        };
      } else if (
        fetchedProductReviews.constructor === Object &&
        !Array.isArray(fetchedProductReviews) &&
        Object.keys(fetchedProductReviews).length
      ) {
        return { productReviews: [fetchedProductReviews], total: 1 };
      }
      return { productReviews: [], total: 0 };
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }
}
