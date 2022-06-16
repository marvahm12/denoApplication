import { Bootstrapped, Context, Router } from "../../deps.ts";
import ReviewController from "./review.controller.ts";

@Bootstrapped()
export default class ReviewRouter {
  constructor(private readonly ReviewController: ReviewController) {}

  getRouter() {
    const ReviewRouter = new Router();
    ReviewRouter.post(
      "/add",
      (ctx: Context) => this.ReviewController.createReviewHandler(ctx),
    );
    ReviewRouter.patch(
      "/update/:productId/user/:userId",
      (ctx: Context) => this.ReviewController.updateReviewHandler(ctx),
    );

    ReviewRouter.get(
      "/:productId",
      (ctx: Context) => this.ReviewController.fetchReviewsHandler(ctx),
    );

    return ReviewRouter;
  }
}
