export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  averageRating: number;
  numReviews: number;
  createdAt: Date;
  updatedAt: Date;
}