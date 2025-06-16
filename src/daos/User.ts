import prisma from "../config/database.js";
import * as models from "../models/index.js";

export const UserDao = {
    create: async (userData: models.CreateUserRequest) => {
        const user = await prisma.user.create({
            data: userData,
        });
        return user;
    },

    getById: async (id: string) => {
        const user = await prisma.user.findUnique({
            where: { id },
        });
        return user;
    },

    update: async (id: string, userData: models.UpdateUserRequest) => {
        const user = await prisma.user.update({
            where: { id },
            data: userData,
        });
        return user;
    },

    delete: async (id: string) => {
        const user = await prisma.user.delete({
            where: { id },
        });
        return user;
    },

    getAll: async () => {
        const users = await prisma.user.findMany();
        return users;
    },

    getByEmail: async (email: string) => {
        const user = await prisma.user.findUnique({
            where: { email },
        });
        return user;
    },
};
