import { NextFunction, Request, Response } from "express";
import { UserDao } from "../daos/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const userDao = new UserDao();

export const AuthController = {
    register: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { name, email, password } = req.body;
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await userDao.create({ name, email, password: hashedPassword });   
            res.status(201).json({ message: "User created successfully" });
        } catch (error) {
            next(error);
        }
    },

    login: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { email, password } = req.body;
            const user = await userDao.getByEmail(email);
            if (!user) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) {
                res.status(401).json({ message: "Invalid credentials" });
                return;
            }
            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, { expiresIn: "1h" });
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
};