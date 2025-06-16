import prisma from "../config/database.js";
import * as models from "../models/index.js";

export const ReviewDao = {
    create: async (reviewData: models.CreateReviewRequest) => {
        const review = await prisma.review.create({
            data: reviewData,
        });
        return review;
    },

    getById: async (id: string) => {
        const review = await prisma.review.findUnique({
            where: { id },
        });
        return review;
    },

    update: async (id: string, reviewData: models.UpdateReviewRequest) => {
        const review = await prisma.review.update({
            where: { id },
            data: reviewData,
        });
        return review;
    },

    delete: async (id: string) => {
        const review = await prisma.review.delete({
            where: { id },
        });
        return review;
    },

    getByProductId: async (productId: string) => {
        const reviews = await prisma.review.findMany({
            where: { productId },
        });
        return reviews;
    },

    getByUserId: async (userId: string) => {
        const reviews = await prisma.review.findMany({
            where: { userId },
        });
        return reviews;
    },
};
