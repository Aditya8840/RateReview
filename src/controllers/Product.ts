import { NextFunction, Request, Response } from "express";
import * as Dao from "../daos/index.js";

export const ProductController = {
    getProducts: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await Dao.ProductDao.getAll();
            res.status(200).json(products);
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