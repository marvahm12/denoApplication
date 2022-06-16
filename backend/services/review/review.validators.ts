import { number, Schema, string } from "../../deps.ts";
import { BodyReviewUpdate, Review } from "./review.types.ts";
import { validate } from "../../utils/helpers.ts";

const ReviewSchema = Schema({
  score: number.gte(0).lte(5),
  message: string.trim().normalize().between(
    10,
    40,
    "should contain at least 10 characters.",
  ),
  productId: number,
  userId: number,
}, { strict: true });

const ReviewUpdateSchema = Schema({
  score: number.gte(0).lte(5).optional(),
  message: string.trim().normalize().between(
    10,
    40,
    "should contain at least 10 characters.",
  ).optional(),
}, { strict: true });

export const validateReviewSchema = (input: Review) =>
  validate(ReviewSchema.destruct(), input);

export const validateUpdateReviewSchema = (input: BodyReviewUpdate) =>
  validate(ReviewUpdateSchema.destruct(), input);
