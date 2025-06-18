import { NextFunction, Request, Response } from "express";
import * as Dao from "../daos/index.js";

export const ReviewController = {
    getReviewsByProductId: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const reviews = await Dao.ReviewDao.getByProductId(req.params.productId);
            res.status(200).json(reviews);
        } catch (error) {
            next(error);
        }
    },

    postReview: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { productId } = req.params;
            const { rating, comment, imageUrl } = req.body;
            const userId = (req as any).user.id;

            const product = await Dao.ProductDao.getById(productId);
            if (!product) {
                res.status(404).json({ message: "Product not found" });
                return;
            }

            const review = await Dao.ReviewDao.create({
                rating,
                comment,
                imageUrl,
                productId,
                userId,
            });
            res.status(201).json(review);
        } catch (error) {
            next(error);
        }
    },
};