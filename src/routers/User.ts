import { Router } from "express";
import * as Controller from "../controllers/index.js";
import * as Middleware from "../middleware/index.js";

const router = Router();

router.get("/", Middleware.authMiddleware, Controller.UserController.getUser);
router.put("/", Middleware.authMiddleware, Controller.UserController.updateUser);

export { router as UserRouter };