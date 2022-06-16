import ReviewModel from "../services/review/review.model.ts";
import { printSuccessMessage } from "../utils/helpers.ts";

export const createReviews = async () => {
  await ReviewModel.create([{
    message: "nice product",
    score: 5,
    userId: 1,
    productId: 1,
  }]);
  return printSuccessMessage("Review list created successfully.");
};
