import { NextFunction, Request, Response } from "express";
import * as Dao from "../daos/index.js";

export const UserController = {
    getUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await Dao.UserDao.getById((req as any).user.id);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },

    updateUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const user = await Dao.UserDao.update((req as any).user.id, req.body);
            res.status(200).json(user);
        } catch (error) {
            next(error);
        }
    },
};