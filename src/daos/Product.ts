import prisma from "../config/database.js";

export const ProductDao = {
    getAll: async () => {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });
        return products;
    },

    getAllWithUserReviews: async (userId: string) => {
        const products = await prisma.product.findMany({
            orderBy: {
                createdAt: 'asc'
            }
        });

        const userReviews = await prisma.review.findMany({
            where: {
                userId: userId,
                productId: {
                    in: products.map(p => p.id)
                }
            },
            select: {
                productId: true,
                id: true,
                rating: true
            }
        });

        const reviewMap = new Map(userReviews.map(review => [review.productId, review]));

        return products.map(product => ({
            ...product,
            reviews: reviewMap.has(product.id) ? [reviewMap.get(product.id)] : []
        }));
    },

    getById: async (id: string) => {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    },
};