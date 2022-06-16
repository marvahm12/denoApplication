import { Bootstrapped, Context, Router } from "../../deps.ts";
import ProductController from "./product.controller.ts";

@Bootstrapped()
export default class ProductRouter {
  constructor(private readonly productController: ProductController) {}

  getRouter() {
    const productRouter = new Router();
    productRouter.post(
      "/add",
      (ctx: Context) => this.productController.createProductHandler(ctx),
    );
    productRouter.delete(
      "/:productId",
      (ctx: Context) => this.productController.deleteProductHandler(ctx),
    );
    productRouter.patch(
      "/:productId",
      (ctx: Context) => this.productController.updateProductHandler(ctx),
    );
    productRouter.get(
      "/search",
      (ctx: Context) => this.productController.searchProductHandler(ctx),
    );
    productRouter.get(
      "/:productId/reviews",
      (ctx: Context) => this.productController.getProductReviewsHandler(ctx),
    );

    return productRouter;
  }
}
