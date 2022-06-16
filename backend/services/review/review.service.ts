import { Injectable, Status } from "../../deps.ts";
import ReviewModel from "./review.model.ts";
import { CustomErrorHandler } from "../../middlewares/error.ts";
import { Review, ReviewCreated, ReviewUpdate } from "./review.types.ts";
import ProductService from "../product/product.service.ts";
import UserService from "../user/user.service.ts";
import { formatError } from "../../middlewares/error.ts";

@Injectable()
export default class ReviewService {
  constructor(
    private readonly userService: UserService,
    private readonly productService: ProductService,
  ) {}
  async createReview(review: Review): Promise<ReviewCreated> {
    try {
      const { userId, productId } = review;
      // check the existence of the review
      const user = await this.userService.getUser({ id: userId });
      await this.productService.getProduct({ id: productId });

      const existentReview = await ReviewModel.where({ userId, productId })
        .first();

      if (existentReview) {
        throw new CustomErrorHandler(
          Status.BadRequest,
          "You cannot add many reviews for a single product",
        );
      }

      const createdReview = await ReviewModel.create(review);
      return {
        id: <number> createdReview.id,
        score: <number> createdReview.score,
        message: <string> createdReview.message,
        user: <string> user.username,
        productId: <number> createdReview.productId,
        createdAt: <string> createdReview.createdAt,
        updatedAt: <string> createdReview.updatedAt,
      };
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  async updateReview(review: ReviewUpdate): Promise<ReviewCreated> {
    try {
      const { userId, productId, message, score } = review;
      // check the existence of the review
      const existentReview = await this.getReview(productId, userId);

      const update = {};
      if (message) Object.assign(update, { message });
      if (score) Object.assign(update, { score });

      // update review
      await ReviewModel.where({ productId }).where({ userId, productId })
        .update(update);

      const updatedReview = await ReviewModel.where({ userId, productId })
        .first();
      return {
        id: <number> updatedReview.id,
        score: <number> updatedReview.score,
        message: <string> updatedReview.message,
        user: <string> existentReview.user,
        productId: <number> existentReview.productId,
        createdAt: <string> updatedReview.createdAt,
        updatedAt: <string> updatedReview.updatedAt,
      };
    } catch (error) {
      const { status, message } = formatError(error);
      throw new CustomErrorHandler(status, message);
    }
  }

  async getReview(productId: number, userId: number): Promise<ReviewCreated> {
    // check the validity of the userId and productId
    const user = await this.userService.getUser({ id: userId });
    await this.productService.getProduct({ id: productId });

    const existentReview = await ReviewModel.where({ userId, productId })
      .first();
    if (!existentReview) {
      throw new CustomErrorHandler(
        Status.NotFound,
        "No review found for the given product and user",
      );
    }

    return {
      id: <number> existentReview.id,
      score: <number> existentReview.score,
      message: <string> existentReview.message,
      user: <string> user.username,
      productId: <number> existentReview.productId,
      createdAt: <string> existentReview.createdAt,
      updatedAt: <string> existentReview.updatedAt,
    };
  }

  async getReviews(productId: number): Promise<ReviewCreated[]> {
    // check the validity productId
    await this.productService.getProduct({ id: productId });

    const existentReviews = await ReviewModel.where({ productId })
      .get();
    let reviews = [] as ReviewCreated[];

    if (existentReviews && existentReviews.constructor === Array) {
      const reviewOwnerPromises = existentReviews.map(async (review) => {
        const owner = await ReviewModel.where({ id: <number> review.id })
          .user();
        return {
          id: review.id,
          message: review.message,
          score: review.score,
          productId: review.productId,
          user: owner.username,
          createdAt: review.createdAt,
          updatedAt: review.updatedAt,
        };
      });
      reviews = <ReviewCreated[]> await Promise.all(reviewOwnerPromises);
    }
    return reviews;
  }
}
