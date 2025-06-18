import { NextFunction, Request, Response } from "express";
import * as Dao from "../daos/index.js";

export const ProductController = {
    getProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).user.id;
            
            const products = await Dao.ProductDao.getAllWithUserReviews(userId);
            
            const productsWithReviewStatus = products.map(product => ({
                id: product.id,
                name: product.name,
                description: product.description,
                imageUrl: product.imageUrl,
                price: product.price,
                averageRating: product.averageRating,
                numReviews: product.numReviews,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
                hasUserReview: product.reviews.length > 0
            }));
            
            res.status(200).json(productsWithReviewStatus);
        } catch (error) {
            next(error);
        }
    },

    getProduct: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const product = await Dao.ProductDao.getById(id);
            
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }
            
            res.status(200).json(product);
        } catch (error) {
            next(error);
        }
    },
}; 