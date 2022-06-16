import { Context, helpers, Injectable, Status } from "../../deps.ts";
import ReviewService from "./review.service.ts";
import { BodyReviewUpdate, Review } from "./review.types.ts";
import { extractBodyRequest, validateParamId } from "../../utils/helpers.ts";
import {
  validateReviewSchema,
  validateUpdateReviewSchema,
} from "./review.validators.ts";
import { formatError } from "../../middlewares/error.ts";

@Injectable()
export default class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  async createReviewHandler(ctx: Context) {
    try {
      const { request } = ctx;
      if (!request.hasBody) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const body = request.body();
      const productBody = await extractBodyRequest<Review>(body);
      if (productBody) {
        const validatedReviewBody = validateReviewSchema(productBody);
        const review = await this.reviewService.createReview(
          validatedReviewBody,
        );
        ctx.response.status = Status.OK;
        ctx.response.body = review;
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid body request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }

  async updateReviewHandler(ctx: Context) {
    try {
      const { productId, userId } = helpers.getQuery(ctx, {
        mergeParams: true,
      });
      const params: Record<string, string> = { productId, userId };
      const validatedIds = Object.keys(params).map((key) => {
        const value = Number(params[key]);
        return validateParamId(value, key);
      });
      const { request } = ctx;
      const body = request.body();
      if (!request.hasBody || !body) {
        ctx.throw(Status.BadRequest, "Body request is required");
      }
      const reviewToUpdate = await extractBodyRequest<BodyReviewUpdate>(body);
      if (validatedIds.length && reviewToUpdate) {
        const validatedUpdateBody = validateUpdateReviewSchema(
          reviewToUpdate,
        );
        const updatedReview = await this.reviewService.updateReview({
          userId: Number(userId),
          productId: Number(productId),
          ...validatedUpdateBody,
        });
        ctx.response.status = Status.OK;
        ctx.response.body = updatedReview;
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

  async fetchReviewsHandler(ctx: Context) {
    try {
      const { productId } = helpers.getQuery(ctx, {
        mergeParams: true,
      });
      const params: Record<string, string> = { productId };
      const validatedIds = Object.keys(params).map((key) => {
        const value = Number(params[key]);
        return validateParamId(value, key);
      });
      if (validatedIds.length) {
        const fetchedReviews = await this.reviewService.getReviews(
          validatedIds[0],
        );
        ctx.response.status = Status.OK;
        ctx.response.body = fetchedReviews;
        ctx.response.type = "json";
        return;
      }
      ctx.throw(Status.BadRequest, "Invalid query params request value");
    } catch (error) {
      const { status, message } = formatError(error);
      ctx.throw(status, message);
    }
  }
}
