import { Context, helpers, Injectable, Status } from "../../deps.ts";
import ProductService from "./product.service.ts";
import { Product, ProductUpdate } from "./product.types.ts";
import { extractBodyRequest, validateParamId } from "../../utils/helpers.ts";
import {
  validateProductSchema,
  validateSearchProductsSchema,
  validateUpdateProductSchema,
} from "./product.validators.ts";
import { formatError } from "../../middlewares/error.ts";

@Injectable()
export default class ProductController {
  constructor(private readonly productService: ProductService) {}

  async createProductHandler(ctx: Context) {
    try {
      const { request } = ctx;
      if (!request.hasBody) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const body = request.body();
      const productBody = await extractBodyRequest<Product>(body);
      if (productBody) {
        const validatedProductBody = validateProductSchema(productBody);
        const product = await this.productService.createProduct(
          validatedProductBody,
        );
        ctx.response.status = Status.OK;
        ctx.response.body = { product };
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid body request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async deleteProductHandler(ctx: Context) {
    try {
      const { productId } = helpers.getQuery(ctx, { mergeParams: true });
      const id = validateParamId(Number(productId));
      if (id) {
        const deletedProduct = await this.productService.deleteProduct(id);
        ctx.response.status = Status.OK;
        ctx.response.body = deletedProduct;
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid query params request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async updateProductHandler(ctx: Context) {
    try {
      const { productId } = helpers.getQuery(ctx, { mergeParams: true });
      const id = validateParamId(Number(productId));
      const { request } = ctx;
      const body = request.body();
      if (!request.hasBody || !body) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const productToUpdate = await extractBodyRequest<ProductUpdate>(body);
      if (id && productToUpdate) {
        const validatedUpdateBody = validateUpdateProductSchema(
          productToUpdate,
        );
        const updatedProduct = await this.productService.updateProduct(
          id,
          validatedUpdateBody,
        );
        ctx.response.status = Status.OK;
        ctx.response.body = { product: updatedProduct };
        ctx.response.type = "json";
        return;
      }
      ctx.throw(
        Status.BadRequest,
        "Invalid query params/body request request value",
      );
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async searchProductHandler(ctx: Context) {
    try {
      const { name, price, offset, limit } = helpers.getQuery(ctx, {
        mergeParams: true,
      });
      const validatedParams = validateSearchProductsSchema({
        name,
        price,
        offset,
        limit,
      });
      const { products, total, limit: resultLimit, offset: resultOffset } =
        await this.productService.searchProducts(
          validatedParams,
        );
      ctx.response.status = Status.OK;
      ctx.response.body = {
        products,
        offset: resultOffset,
        limit: resultLimit,
        total,
      };
      ctx.response.type = "json";
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async getProductReviewsHandler(ctx: Context) {
    try {
      const { productId } = helpers.getQuery(ctx, {
        mergeParams: true,
      });
      const id = validateParamId(Number(productId));

      const { productReviews, total } = await this.productService
        .getProductReviews(
          id,
        );
      ctx.response.status = Status.OK;
      ctx.response.body = {
        productReviews,
        total,
      };
      ctx.response.type = "json";
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }
}
