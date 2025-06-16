export interface Review {
  id: string;
  rating: number;
  comment: string;
  imageUrl: string;
  productId: string;
  userId: string;
}

export interface CreateReviewRequest {
  rating: number;
  comment?: string;
  imageUrl?: string;
  productId: string;
  userId: string;
}

export interface UpdateReviewRequest {
  rating?: number;
  comment?: string;
  imageUrl?: string;
}
