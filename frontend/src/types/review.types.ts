export interface ReviewParams {
  productId: number
}

export interface ReviewResponse {
  id: number
  score: number
  message: string
  user: string
  productId: number
  createdAt: string
  updatedAt: string
}

export interface Review {
  productId: number
  userId: number
  message: string
  score: number
}

export interface ReviewUpdate {
  productId: number
  userId: number
  message?: string
  score?: number
}

export interface ProductReviews {
  [key: number]: ReviewResponse[]
}

export interface DeleteResponse {
  deletedUser: number
}
