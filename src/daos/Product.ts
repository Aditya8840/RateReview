import prisma from "../config/database.js";

export const ProductDao = {
    getAll: async () => {
        const products = await prisma.product.findMany();
        return products;
    },

    getById: async (id: string) => {
        const product = await prisma.product.findUnique({
            where: { id },
        });
        return product;
    },
};