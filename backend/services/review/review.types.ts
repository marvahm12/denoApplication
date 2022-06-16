export interface BaseReview {
  message: string;
  score: number;
  productId: number;
  userId: number;
}
export interface Review extends BaseReview {
  [key: string]: string | number;
}

export interface BodyReviewUpdate {
  message?: string;
  score?: number;
  [key: string]: string | number | undefined;
}

export interface ReviewUpdate {
  productId: number;
  userId: number;
  message?: string;
  score?: number;
}

export interface BaseCreatedReview {
  id: number;
  message: string;
  score: number;
  user: string;
  productId: number;
}

export interface ReviewCreated extends BaseCreatedReview {
  createdAt: string;
  updatedAt: string;
}
